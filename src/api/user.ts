/*
 * @Author: Mr.He 
 * @Date: 2019-03-07 10:15:14 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-09-08 16:01:11
 * @content what is the content of this file. */

import { Context } from "koa";
import { Restful, Router } from "common/restful";


@Restful()
export class User {
    constructor() {
    }

    @Router("/hello", "get")
    async wxlogin(ctx: Context) {

        ctx.success({
            token: "okkkk"
        });
    }



}