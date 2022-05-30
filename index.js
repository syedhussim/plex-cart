const Server = require('./core/Server');
const Application = require('./core/Application');

let apps = [
    new Application('front', 80),
    new Application('console', 9090)
];

const httpServer = new Server(__dirname);
httpServer.start(apps);
