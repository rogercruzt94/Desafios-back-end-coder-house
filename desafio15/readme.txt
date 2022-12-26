nodemon server.js --CLUSTER
Run servidor modo FORK:
nodemon server.js
nodemon server.js --FORK
Kill proceso Powershell:
kill numProceso --> kill 12188
Run/Stop servidor con forever:
forever start server.js
forever start server.js --FORK

forever start server.js -p 8081

forever stop server.js
forever stopall
Listar procesos con forever:
forever list
Run/Stop servidor pm2:
pm2 start server.js
pm2 start server.js --watch
pm2 start server.js -p 8081

pm2 stop server.js

Monitor live:
pm2 monit
Logs:
pm2 logs
Bajar todos los servicios activos:
pm2 delete all 
Lista con servicios activos:
pm2 list
Server en modo Cluster:
pm2 start server.js -i max
Server en modo cluster escucha activa:
pm2 start server.js -i max --watch
