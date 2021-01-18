/*
 * @Author: Mr.He 
 * @Date: 2020-02-04 20:21:35 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-08-30 20:54:04
 * @content what is the content of this file. */

import sequelize from "sequelize";
import DB from "common/db";

export default DB.define(
    'user',
    {
        id: {
            type: sequelize.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV1
        },
        openid: {
            type: sequelize.STRING(50),
            unique: true
        },
        nickName: sequelize.STRING,
        avatarUrl: sequelize.STRING,
        city: sequelize.STRING,
        country: sequelize.STRING,
        gender: sequelize.STRING,
        language: sequelize.STRING,
        province: sequelize.STRING,
        mobile: sequelize.CHAR(11),
        inviterId: sequelize.UUID,

    },
    {
        timestamps: true,
        paranoid: true,
        tableName: 'user',
        charset: 'utf8mb4'
    }
);