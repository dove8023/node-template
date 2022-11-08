/*
 * @Author: Heath 
 * @Date: 2022-10-21 16:46:54 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-08 10:07:32
 * @content what is the content of this file. */

import path = require("path");
import fs = require("fs");


export function loadFile(dir: string, callback?: Function): void {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            loadFile(fullPath, callback);
        } else {
            const p = fullPath.replace(/\.(ts|js)$/, "");
            const g = require(p);

            if (callback) {
                callback(g);
            }
        }
    }
}

export function isMobile(mobile) {
    let reg = /^1(3|4|5|7|8|9)\d{9}$/;
    return reg.test(mobile);
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