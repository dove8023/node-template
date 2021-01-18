/*
 * @Author: Mr.He 
 * @Date: 2019-05-20 10:43:58 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2019-05-20 15:29:58
 * @content what is the content of this file. */

import fs = require("fs");
import * as path from 'path';
import "common/db";
import UpdateModel from "./updateModel";
import Models from 'model/index';
import { choiceByKey } from "common/utils";
Models.updateLogs = UpdateModel;

let files = fs.readdirSync(path.join(__dirname, "./files"));
let targetList: any[] = [];
for (let f of files) {
    let p = path.join(__dirname, './files', f);
    targetList.push({
        fn: require(p).default,
        id: f
    })
}

const doUpdate = async () => {
    let rows = await Models.updateLogs.findAll();
    for (let item of targetList) {
        let res = choiceByKey({
            list: rows,
            key: "id",
            value: item.id
        });
        // 已执行
        if (res) {
            continue;
        }
        await item.fn(Models);
        await Models.updateLogs.create({ id: item.id });
        console.log(`${item.id} 执行结束`);
    }

    console.log("all is done.");
    process.exit();
}


setTimeout(() => {
    doUpdate();
}, 3000);