process.on("message", (params) => {
    const { message, cant } = params;
    let obj = {};
    if (message == "start") {
      for (let i = 0; i < cant; i++) {
        let x = Math.floor(Math.random() * 1000 + 1);
        console.log(x);
        if (obj[x.toString()]) {
          obj[x.toString()] = obj[x.toString()] + 1;
        } else {
          obj[x.toString()] = 1;
        }
      }
      process.send(obj);
    }
  });