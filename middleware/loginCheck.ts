/*
 * @Author: Heath 
 * @Date: 2022-10-02 18:03:36 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-08 08:52:02
 * @content: 
 */

import * as Koa from "koa";
import Model from "model";

const allowCrossUrls = ["/open/wxlogin", "/favicon.ico", "/he", "/receivefromwx"];

export async function LoginCheck(ctx: Koa.Context, next: Function): Promise<any> {
    // guard
    console.log('guard say: yes.')
    return next();
}
