/*
 * @Author: Mr.He
 * @Date: 2019-07-26 17:25:57
 * @Last Modified by: Mr.He
 * @Last Modified time: 2019-07-26 18:03:31
 * @content : save request hash data. */

import md5 = require('md5');
import { HAS_HASH } from "src/interface";

interface OPTIONS {
    token: string,
    url: string,
    method: string
}

class ReqHash {
    store: { [index: string]: any }
    constructor() {
        this.store = {};
    }

    createHash(options: OPTIONS) {
        let { token, url, method } = options;
        url = url.toLowerCase();
        method = url.toLowerCase();

        return md5(`${url}${method}${token}`);
    }

    hasHash(hash: string) {
        if (this.store[hash]) {
            return HAS_HASH.ALRARDY_HAS;
        }

        this.store[hash] = true;
        return HAS_HASH.NOT_HAS;
    }

    dropHash(hash: string) {
        delete this.store[hash];
    }
}

let reqHash = new ReqHash();
export default reqHash;