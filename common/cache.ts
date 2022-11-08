/*
 * @Author: Heath 
 * @Date: 2022-10-05 22:01:41 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-08 09:55:26
 * @content what is the content of this file. */

import { createClient, RedisClientType } from "redis";
const HOST = process.env.REDIS_HOST || "localhost";
const PORT = Number(process.env.REDIS_PORT) || 6379;
const DB = Number(process.env.REDIS_DB) || 0;


export class Cache {
    private _client: RedisClientType;

    constructor() {
        this._client = createClient({
            url: `redis://${HOST}:${PORT}`,
            database: DB
        });
    }

    async read(id: string): Promise<any> {
        return new Promise(async (resolve) => {

            let result = await this._client.get(id) as string;
            try {
                result = JSON.parse(result);
            } catch (e) {
                // ignore
            } finally {
                resolve(result);
            }
        });
    }

    write(id: string, content: any, EX?: number) {
        if (typeof content == "object") {
            content = JSON.stringify(content);
        }

        return this._client.set(id, content, {
            EX
        });
    }

    del(id: string) {
        return this._client.del(id);
    }
}

let cache = new Cache();
export default cache;