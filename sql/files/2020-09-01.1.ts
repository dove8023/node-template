/*
 * @Author: Mr.He 
 * @Date: 2020-06-09 10:15:59 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-09-02 22:37:05
 * @content: 执行文件 */


export default async function fix(Models) {
    let scanCodes = await Models.scanCode.findAll({
        where: {}
    });

}