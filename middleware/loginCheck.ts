/*
 * @Author: Mr.He 
 * @Date: 2018-06-02 18:03:36 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-02-06 11:40:06
 * @content: 
 */

import * as Koa from "koa";
import cache from "common/cache";
import Model from "model";

const allowCrossUrls = ["/open/wxlogin", "/favicon.ico", "/he", "/receivefromwx"];

export async function LoginCheck(ctx: Koa.Context, next: Function): Promise<any> {
    // guard
    console.log('guard say: yes.')
    return next();
}
