/*
 * @Author: Mr.He 
 * @Date: 2019-05-20 10:41:53 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2019-11-01 09:22:11
 * @content what is the content of this file. */

const path = require("path");
require('app-module-path').addPath(path.join(__dirname, "../"));
require('ts-node').register({ fast: true });

// 加载环境变量
require('dotenv').config({ path: path.join(__dirname, "../.env") });

require('./main.ts');