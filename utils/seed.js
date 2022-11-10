const connection = require("../config/connection");

connection.on('error', err => err);

connection.once('open', async ()=>{
    process.exit(0);
});