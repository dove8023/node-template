/*
 * @Author: Mr.He 
 * @Date: 2018-04-06 23:23:45 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-09-12 21:49:56
 * @content what is the content of this file. */


export const LIMIT = 10;

/* same request check */
export enum HAS_HASH {
    NOT_HAS = 1,
    ALRARDY_HAS = 2
}

export const LOGIN_CACHE_TIME = 60 * 60 * 24 * 7;

export const APILIMIT = {
    getLimit: 80,
    otherLimit: 35
}
