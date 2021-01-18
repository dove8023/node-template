/*
 * @Author: Mr.He 
 * @Date: 2019-07-26 17:12:39 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2019-11-02 09:04:24
 * @content : 对同一时刻相同请求加以限制 */

import { Context } from 'koa';
import reqhash from 'middleware/reqhash';
import { HAS_HASH } from 'src/interface';


export async function SameReqLimit(ctx: Context, next: Function): Promise<any> {
    let { token } = ctx.header;
    token = token || "";
    let url = ctx.url.toLowerCase();
    let method = ctx.method.toLowerCase();

    if (url == "/open/wxlogin" && method == "post") {
        return next();
    }

    let hash = reqhash.createHash({
        token, url, method
    });
    ctx.state.hash = hash;

    if (reqhash.hasHash(hash) == HAS_HASH.NOT_HAS) {
        return next();
    }

    // 存在相同请求的时候, 拒绝访问
    ctx.logger.error(`拒绝相同请求的同时访问 ${token}, ${url}, ${method}`);
    console.log("存在相同请求，访问已被拒绝");
    // 最外层将执行dropHash操作，清除hash，避免dropHash后再次请求无法拦截
    ctx.state.hash = '';
    return ctx.error(103);
}