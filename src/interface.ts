/*
 * @Author: Heath 
 * @Date: 2022-10-06 23:23:45 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2022-11-07 21:16:04
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
