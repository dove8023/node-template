/*
 * @Author: Mr.He
 * @Date: 2019-06-22 08:37:13
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-02-13 08:51:51
 * @content : 请求频率限制，依据token，限制 GET, POST, PUT, DELETE */

import { Context } from 'koa';
import cache from 'common/cache';
import { APILIMIT } from 'src/interface';
import { notify } from "other/dingding";
import md5 = require('md5');

export async function ApiLimit(ctx: Context, next: Function): Promise<any> {
    let { token } = ctx.header;
    if (!token) {
        // return next();
        token = ctx.header["x-real_ip"] || md5(JSON.stringify(ctx.header));
    }

    let id = token + "_limit";
    let limitData = await cache.read(id);
    if (!limitData || Date.now() - limitData.time > 1000 * 60) {
        limitData = {
            time: Date.now(),
            getLimit: 0,
            otherLimit: 0,
            isTip: false
        };
    }

    if (limitData.isTip) {
        return ctx.error(102);
    }

    if (limitData.getLimit > APILIMIT.getLimit || limitData.otherLimit > APILIMIT.otherLimit) {
        let userId;
        if (ctx.loginInfo && ctx.loginInfo.user) {
            userId = ctx.loginInfo.user.id;
        }
        notify(`API 频率限制被触发：userId, ${userId}`);
        limitData.isTip = true;
        await cache.write(id, limitData, 120);
        return ctx.error(102);
    }

    let method = ctx.method.toLowerCase();
    switch (method) {
        case "get":
            limitData.getLimit++;
            break;
        default:
            limitData.otherLimit++;
            break;
    }

    await cache.write(id, limitData, 120);
    return next();
}

