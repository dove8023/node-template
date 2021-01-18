/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 16:46:54 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-06-04 11:59:22
 * @content what is the content of this file. */

import path = require("path");
import fs = require("fs");
import * as md5 from "md5";


export function loadFile(dir: string, callback?: Function): void {
    let files = fs.readdirSync(dir);
    for (let f of files) {
        let fullPath = path.join(dir, f);
        let stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            loadFile(fullPath, callback);
        } else {
            let p = fullPath.replace(/\.(ts|js)$/, "");
            let g = require(p);

            if (callback) {
                callback(g);
            }
        }
    }
}


export function randomCode(): number {
    let num = Math.random() * 1000000;
    return Math.floor(num);
}

export function isMobile(mobile) {
    let reg = /^1(3|4|5|7|8|9)\d{9}$/;
    return reg.test(mobile);
}

export function decimals(num, step = 2) {
    if (!num) {
        return 0;
    }
    const multiple = Math.pow(10, step);
    return Math.round(num * multiple) / multiple;
}

/* 数值转换 */
export function decimalsObj(data) {
    if (typeof data != "object") {
        return data;
    }
    for (let key in data) {
        if (typeof data[key] == "object") {
            data[key] = decimalsObj(data[key]);
            continue;
        }

        if (typeof data[key] != "number") {
            continue;
        }

        data[key] = decimals(data[key]);
    }

    return data;
}


export function choiceByKey(options: { list: any[], key: string, value: string }) {
    const { list, key, value } = options;
    let n = 0;
    for (let item of list) {
        if (item[key] == value) {
            item._index = n;
            return item;
        }
        n++;
    }
    return null;
}

export function makeInviteCode(len = 4) {
    let code = md5((Date.now() + Math.random()).toString());
    return code.substr(0, len);
}


export function checkUUID(str: string) {
    let reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    return reg.test(str);
}


export function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    })
}