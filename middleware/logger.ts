import * as Koa from "koa";
import * as log4js from "log4js";
import * as moment from "moment";

log4js.addLayout("json", () => {
	return (logEvent: any) => {
		return JSON.stringify({
			app: process.env.APP_NAME,
			time: moment(logEvent.startTime).format("YYYY-MM-DD HH:mm:ss"),
			level: logEvent.level.levelStr,
			data: logEvent.data[0]
		});
	}
});

log4js.configure({
	appenders: {
		daily: {
			type: 'dateFile',
			layout: {
				type: 'json'
			},
			filename: `${process.env.LOGPATH}/${process.env.APP_NAME}`,
			pattern: '.yyyy-MM-dd.log',
			alwaysIncludePattern: true,
			compress: true
		}
	},
	categories: {
		default: {
			appenders: ['daily'],
			level: 'info'
		}
	}
});


export const logger = log4js.getLogger("daily");
export async function loggerMiddle(ctx: Koa.Context, next: Function) {
	ctx.logger = {
		info(data: any) {
			logger.info({ ...data, traceId: ctx.state.traceId });
		},
		warn(data: any) {
			logger.warn({ data, traceId: ctx.state.traceId });
		},
		error(data: any) {
			logger.error({ data, traceId: ctx.state.traceId });
		}
	}

	ctx.logger.info({
		type: 'IN',
		method: ctx.request.method,
		url: ctx.request.url,
		traceId: ctx.state.traceId,
		header: ctx.request.header,
	});


	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	const userId = ctx.loginInfo && ctx.loginInfo.user && ctx.loginInfo.user.id || "*************************************";

	let code = 0, msg = '';
	if (ctx.status == 200) {
		code = ctx.body && ctx.body.code;
		msg = ctx.body && ctx.body.msg;
	}
	console.log(`${moment().format()} ${userId} ${ctx.method} ${ctx.status} ${ctx.header.api_version}, ${code}, ${msg} -- ${ms}ms,  ${ctx.url}`);
	ctx.logger.info({
		type: "CONSOLE",
		traceId: ctx.state.traceId,
		userId,
		method: ctx.method,
		url: ctx.url,
		query: ctx.request.query,
		body: ctx.request.body,
		ip: ctx.header["x-real_ip"],
		header: ctx.request.header
	})
	/* ctx.logger.info({
		type: 'OUT',
		status: ctx.response.status,
		message: ctx.response.message,
		traceId: ctx.state.traceId,
		body: ctx.body,
		ip: ctx.ip
	}); */
}