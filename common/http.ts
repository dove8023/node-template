/*
 * @Author: Heath 
 * @Date: 2022-10-22 16:20:52 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-08 08:50:50
 * @content what is the content of this file. */

import * as Koa from "koa";
import koaBody = require("koa-body");
import xmlParser = require('koa-xml-body');
import { response, LoginCheck, loggerMiddle } from "../middleware";
import * as cors from "koa2-cors";
import { v1 } from "uuid";
import reqhash from "middleware/reqhash";

let app = new Koa();

app.use(async (ctx: Koa.Context, next: Function) => {
    try {
        //default type json.
        ctx.response.type = "json";
        ctx.state.traceId = v1();
        await next();
    } catch (err: any) {
        ctx.response.status = err.status || err.statusCode || 500;
        ctx.response.type = "text";
        ctx.response.body = err.message || err;
        console.log(`http请求报错，${ctx.url}`);
        console.log(err);
        ctx.logger.error(`http error catched, ${err}`);
        ctx.error(500, `http error catched, ${err}`);
    } finally {
        reqhash.dropHash(ctx.state.hash);
    }

    if (ctx.url.toLowerCase() == "/receivefromwx") {
        console.log(ctx.response.type);
        console.log(ctx.response.body);
        console.log(ctx.response.status);
    }
});

app.use(xmlParser({
    limit: 1000000,
    encoding: 'utf8', // lib will detect it from `content-type`
    xmlOptions: {
        explicitArray: false
    },
    key: 'xmlbody', // lib will check ctx.request.xmlBody & set parsed data to it.
    onerror: (err, ctx) => {
        ctx.throw(err.status, err.message);
    }
}));

// x-response-time
app.use(async (ctx: Koa.Context, next: Function) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(loggerMiddle)
    .use(response)
    .use(cors({
        origin: "*",
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token'],
    }))
    // .use(SameReqLimit)
    .use(LoginCheck)
    // .use(ApiLimit)
    .use(koaBody({
        jsonLimit: '8mb',
        multipart: true,
        formidable: {
            maxFieldsSize: 8 * 1024 * 1024,
            keepExtensions: true,
            multiples: false,
            uploadDir: "/tmp",
            onFileBegin(files, file) {
                // console.log("onFileBegin", typeof file, file)
            }
        }
    }));

import Router = require("koa-router");
import { RegisterRouter } from "common/restful";
import "src/index";

let router = new Router();
RegisterRouter(router);

app.use(router.routes());

export default app;