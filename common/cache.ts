/*
 * @Author: Mr.He 
 * @Date: 2018-03-05 22:01:41 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2019-03-04 15:41:08
 * @content what is the content of this file. */

import { createClient, RedisClient } from "redis";
const HOST = process.env.REDIS_HOST as string;
const PORT = Number(process.env.REDIS_PORT);
const DB = Number(process.env.REDIS_DB) || 0;


export class Cache {
    private _client: any;

    constructor() {
        this._client = createClient({
            host: HOST,
            port: PORT,
            db: DB
        }) as RedisClient;
    }

    read(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._client.get(id, (err: Error, result: any) => {
                if (err) {
                    reject(err);
                }

                try {
                    result = JSON.parse(result);
                } catch (e) {

                } finally {
                    resolve(result);
                }
            })
        });
    }

    write(id: string, content: any, ex?: number): Promise<string> {
        if (typeof content == "object") {
            content = JSON.stringify(content);
        }

        return new Promise((resolve, reject) => {
            if (ex) {
                this._client.set(id, content, 'EX', ex, (err: Error, result: any) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
            } else {
                this._client.set(id, content, (err: Error, result: any) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
            }
        })
    }

    del(id: string) {
        this._client.del(id);
    }
}

let cache = new Cache();
export default cache;