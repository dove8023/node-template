/*
 * @Author: Heath 
 * @Date: 2022-10-10 17:24:21 
 * @Last Modified by: Heath
 * @Last Modified time: 2019-05-11 09:22:38
 * @content what is the content of this file. */


import * as koaRouter from 'koa-router';
import * as path from "path";


let allControlls: { [index: string]: any; } = {};


export function Restful(modelUrl?: string) {
    return function (target: any) {
        modelUrl = modelUrl || "/" + target.name.replace(/Controller/, '');
        allControlls[modelUrl] = target;
    }
}


export function Router(url: string, method: string = 'get') {
    return function (target: any, propertyKey: any, desc: any) {
        let fn = desc.value;
        fn.$url = url;
        fn.$method = method.toLowerCase();
    }
}

export function RegisterRouter(router: koaRouter) {
    for (let url in allControlls) {
        /* get a constructor */
        let controlle = allControlls[url];
        loadRouter(url, controlle, router);
    }
}

let defaultMethod = ['get', 'find', 'post', 'put', 'delete'];
function loadRouter(modelUrl: string, target: any, router: any) {
    let methods = Object.getOwnPropertyNames(target.prototype);
    console.log("==============")
    for (let item of defaultMethod) {
        if (methods.indexOf(item) < 0) {
            methods.push(item);
        }
    }
    methods.forEach((method: string) => {
        if (method == 'constructor') {
            return;
        }

        let fn = target.prototype[method];
        if (typeof fn != 'function') {
            return;
        }

        let url, httpMethod;
        switch (method) {
            case 'get':
                url = path.join(modelUrl, "/:id");
                httpMethod = 'get';
                break;
            case 'find':
                url = modelUrl;
                httpMethod = 'get';
                break;
            case 'post':
                url = modelUrl;
                httpMethod = 'post';
                break;
            case 'put':
                url = path.join(modelUrl, "/:id");
                httpMethod = 'put';
                break;
            case 'delete':
                url = path.join(modelUrl, "/:id");
                httpMethod = 'delete';
                break;
            default:
                if (fn.$url && fn.$method) {
                    // url = path.join(modelUrl, fn.$url);
                    url = fn.$url;
                    httpMethod = fn.$method;
                } else {
                    return;
                }
        }

        url = url.toLowerCase();
        console.log("add router : ", httpMethod, url);
        router[httpMethod](url, fn.bind(target));
    });
}