/*
 * @Author: Heath 
 * @Date: 2022-10-18 09:40:43 
 * @Last Modified by: Heath
 * @Last Modified time: 2019-10-30 15:59:58
 * @content what is the content of this file. */


import { Context } from 'koa';
import errorCode from "./error";

export async function response(ctx: Context, next: Function) {
    ctx.success = function (data: any) {
        ctx.body = {
            code: 0,
            msg: "ok",
            data
        }
    }

    ctx.error = function (code: number, msg?: string) {
        ctx.body = {
            code,
            msg: msg || errorCode[code],
            data: null
        }
    }

    await next();
}