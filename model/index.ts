/*
 * @Author: Mr.He 
 * @Date: 2018-01-22 17:40:12 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-04-16 16:34:27
 * @content what is the content of this file. */

import * as path from "path";
import { loadFile } from "common/utils";
import { Model } from "sequelize";
import memoryCache from 'common/lrucache';

// let Models: { [index: string]: Model<any, any> } = {};
let Models: any = {};

loadFile(path.join(__dirname, "./"), (model: any) => {
  if (model.default && model.default.name) {
    model.default.get = async function (id: string) {
      let res = memoryCache.get(id);
      if (res && this.name == res._name) {
        // 阻止在使用中对缓存的修改
        res.dataValues = JSON.parse(res._dataValues);
        return res;
      }
      res = await this.findByPk(id);
      if (!res) {
        return null;
      }
      res._dataValues = JSON.stringify(res.dataValues);
      res._name = this.name;
      memoryCache.set(id, res);
      return res;
    }

    Models[model.default.name] = model.default;
  }
});

console.log(Object.keys(Models))

export default Models;