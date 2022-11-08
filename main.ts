/*
 * @Author: Heath 
 * @Date: 2022-10-02 11:19:32 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-08 10:02:43
 * @content what is the content of this file. */

import fs = require("fs");
import "common/db";
import "common/cache";
import "model";

process.on('unhandledRejection', (reason: any, p: PromiseLike<any>) => {
    console.error("unhandledRejection", reason);
});

process.on('uncaughtException', function (err) {
    console.error('uncaughtException==>', err.stack ? err.stack : err);
});

import app from "./common/http";
const http = require("http");

const PORT = process.env.API_PORT || "3000";

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