/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 11:19:32 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-03-12 18:57:46
 * @content what is the content of this file. */

import fs = require("fs");
// import "common/db";
// import "common/cache";
// import "model";
// import { handleUpgrade } from "./src/websocket";
// import "src/task";

process.on('unhandledRejection', (reason: any, p: PromiseLike<any>) => {
    console.error("unhandledRejection", reason);
});

process.on('uncaughtException', function (err) {
    console.error('uncaughtException==>', err.stack ? err.stack : err);
});

import app from "./common/http";
const http = require("http");

const PORT = process.env.API_PORT as string;

const server = http.createServer(app.callback());
server.on('listening', function () {
    if (!/^\d+$/.test(PORT)) {
        fs.chmodSync(PORT, '777')
    }
});

server.on('error', (err: Error) => {
    throw err;
});

server.listen(PORT, () => {
    console.log("http server running ", PORT);
});

// using for websocket
// server.on("upgrade", handleUpgrade);