const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8000;

const server = http.createServer(app);
// console.log('Listening on port: ', port);
server.listen(port, function(){
    console.log("App is running on port " + port)
});