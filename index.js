const Server = require('./core/Server');
const Application = require('./core/Application');

let apps = [
    new Application('front', 9091),
    new Application('console', 9093)
];

const httpServer = new Server(__dirname);
httpServer.start(apps);
