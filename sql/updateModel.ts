import sequelize from "sequelize";
import DB from "common/db";

/* id 为数据更新文件名 */
export default DB.define(
    'updateLogs',
    {
        id: {
            type: sequelize.STRING,
            primaryKey: true
        }
    },
    {
        timestamps: true,
        tableName: 'updatelogs',
        charset: 'utf8'
    }
);