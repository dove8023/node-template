/*
 * @Author: Heath 
 * @Date: 2022-10-02 10:15:12 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-07 21:29:18
 * @content what is the content of this file. */

const fs = require("fs");
require('app-module-path').addPath(__dirname);
require('ts-node').register({ fast: true });

// load enviornment variable
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