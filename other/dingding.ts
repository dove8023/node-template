/*
 * @Author: Mr.He 
 * @Date: 2019-06-07 19:00:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-08-25 11:44:54
 * @content what is the content of this file. */

import * as request from "request-promise";

export const notify = async (content: string, uri = process.env.DING_DING_URI) => {
    content = '服务名称--' + content;
    // 钉消息
    const options = {
        method: 'POST',
        uri,
        body: {
            msgtype: 'text',
            text: {
                content
            },
            at: {
                // atMobiles,
                isAtAll: false,
            }
        },
        headers: { 'content-type': 'application/json' },
        json: true
    }

    return request(options)
}

export const notifySomebody = async (content: string, mobile: string) => {

    // 根据环境，确定 uri 内容
    let uri = process.env.DING_DING_URI

    // 钉消息
    const options = {
        method: 'POST',
        uri,
        body: {
            msgtype: 'text',
            text: {
                content
            },
            at: {
                atMobiles: [mobile],
                isAtAll: false,
            }
        },
        headers: { 'content-type': 'application/json' },
        json: true
    }

    // notification
    return request(options)
}
