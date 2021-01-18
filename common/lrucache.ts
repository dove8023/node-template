/*
 * @Author: Mr.He
 * @Date: 2020-04-09 18:39:39
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-04-10 10:17:24
 * @content: 缓存数据查询结果 */

import * as LRU from "lru-cache";

let memoryCache = new LRU({
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