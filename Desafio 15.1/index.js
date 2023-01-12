import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import handlebars from 'express-handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import minimist from 'minimist'
import cluster from 'cluster'
import os from 'os'

import { init } from './db/mongodb.js'
import routers from './routers/index.js'
import UserModel from './models/user.js'
import { isValidPassword, encryptPassword } from './bcrypt.js';
import { initSocket } from './socket.js'

const opts = {
    default: {
        port: 8080,
        mode: 'fork',
    },
    alias: {
        p: 'port',
        m: 'mode',
    }
}

await init()    //conecto a la base de datos

const { port: PORT, mode } = minimist(process.argv.slice(2), opts);

if (mode === 'cluster' && cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} | code ${code} | signal ${signal}`)
        console.log('Starting a new worker...')
        cluster.fork()
    })
} else {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    
    passport.use('sign-in', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        UserModel.findOne({ email })
          .then((user) => {
            if (!user) {
                console.log(`User with ${email} not found.`)
                return done(null, false)
              }
            if (!isValidPassword(password, user.password)) {
                console.log('Invalid Password')
                return done(null, false)
              }
              done(null, user)
          })
          .catch(error => {
            console.log('Error in sign-in', error.message)
            done(error)
        })
    }))
    
    passport.use('sign-up', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        const { body } = req
        UserModel.findOne({ email })
          .then((user) => {
            if (user) {
                console.log(`User ${email} already exists.`);
                return done(null, false);
            }
            const newUser = {
                ...body,
                password: encryptPassword(password),
            }
            return UserModel.create(newUser);
          })
          .then((newUser) => {
            if (newUser) {
                console.log(`User ${newUser.email} registration succesful.`);
                done(null, newUser);
            }
          })
          .catch(error => {
            console.log('Error in sign-in', error.message);
            done(error);
        })
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    
    passport.deserializeUser((_id, done) => {
    UserModel.findById(_id)
        .then(user => done(null, user))
        .catch(done)
    })
    
    app.use(session({
        // store: new MongoStore ({
        //     mongoUrl: process.env.MONGODB_URI,
        //     ttl: 600,   // Duracion de la sesion en mongo 10 minutos
        // }),
        secret: '82Xl^h2L82bH',
        resave: false,
        saveUninitialized: false,
        cookie:{_expires: (10 * 60 * 1000)}, // tiempo en ms
    }))
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.engine('handlebars', handlebars.engine());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));
    
    app.use('/api', routers);

    const server = http.createServer(app);
    initSocket(server);
    
    //middleware de manejo de errores
    app.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })
    
    server.listen(PORT, () => {
        console.log(`Server running in http://localhost:${PORT}/ from process ${process.pid}`)
    })
    
    server.on("error", error => console.log(`Server Error ${error}`));
}
