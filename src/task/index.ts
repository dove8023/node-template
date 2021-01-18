/*
 * @Author: Mr.He
 * @Date: 2019-06-20 11:09:34
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-08-25 11:48:27
 * @content : 服务定时任务. */

import * as schedule from "node-schedule";

(function () {
    if (process.env.RUN_TASK != "run") {
        return;
    }

    schedule.scheduleJob("0 30 */1 * * *", () => {
        // do the task.
    });

})();