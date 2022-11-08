/*
 * @Author: Heath
 * @Date: 2020-04-09 18:39:39
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-07 21:30:07
 * @content: 缓存数据查询结果 */

import * as LRU from "lru-cache";

const memoryCache = new LRU({
    max: 300,
    // length: function (n, key) {
    //     // console.log('length', n, key)
    //     // return n * 2 + key.length
    //     return 1;
    // },
    // dispose: function (key, n) {
    //     // n.close() 
    //     console.log("dispose", key)
    // },
    // maxAge: 1000 * 60 * 60
});


export default memoryCache;