/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 10:15:12 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-12-20 21:41:39
 * @content what is the content of this file. */

const fs = require("fs");
require('app-module-path').addPath(__dirname);
require('ts-node').register({ fast: true });

// 加载环境变量
let envPath;
if (fs.existsSync("/.dockerenv")) {
    envPath = "/opt/config/.env";
} else {
    envPath = "./.env";
}

require("dotenv").config({
    path: envPath,
});


require('./main.ts');