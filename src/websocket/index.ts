/*
 * @Author: Mr.He 
 * @Date: 2019-05-10 16:29:04 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2020-02-22 23:01:17
 * @content what is the content of this file. */

const WS = require("ws");
const wsServer = new WS.Server({ noServer: true });
import cache from "common/cache";
import webSocketError from "./error";
import Model from 'model';

export function handleUpgrade(req, socket, head) {
	wsServer.handleUpgrade(req, socket, head, async (ws) => {
		const { token } = req.headers;
		const user = await tokenCheck(token);
		if (!user) {
			return socket.destroy();
		}

		ws.userId = user.id;
		ws.companyId = user.companyId;
		wsServer.emit("connection", ws, req);
	});
}


async function tokenCheck(token) {
	if (!token) {
		return null;
	}
	const cacheData = await cache.read(token);
	if (!cacheData) {
		return null;
	}
	let { user } = cacheData;
	user = await Model.user.get(user.id);
	return user;
}

wsServer.on("connection", (ws, req) => {
	// send connection ok msg.
	sendMsg(ws, { model: "connect" });
	ws.on("message", (data) => {
		if (data == "ping") {
			ws.send("pong");
		}
	});

	// print console
	getSocketClients();
});

export function updateWS(userId: string, companyId: string) {
	for (let client of wsServer.clients) {
		if (client.readyState !== WS.OPEN) {
			continue;
		}
		if (client.userId != userId) {
			continue;
		}

		client.companyId = companyId;
		return;
	}
}


export function boardCast(options: { model: string, companyId?: string, userId?: string, data?: any }) {
	let { model, companyId, userId, data } = options;

	for (let client of wsServer.clients) {
		if (client.readyState !== WS.OPEN) {
			continue;
		}

		if (companyId && client.companyId == companyId) {
			sendMsg(client, { model, data });
			continue;
		}

		if (userId && client.userId == userId) {
			sendMsg(client, { model, data });
			continue;
		}
	}
}

function sendMsg(ws, options) {
	let { code = 0, msg, model, data } = options;
	if (code != 0) {
		return ws.close(code, msg || webSocketError[code]);
	}

	ws.send(JSON.stringify({
		code,
		msg: msg || "ok",
		model,
		data
	}));
}

/* 检查当前链接数 */

function getSocketClients() {
	let n = 0;
	let m = 0;
	for (let client of wsServer.clients) {
		n++;
		if (client.readyState == WS.OPEN) {
			m++;
		}
	}

	if (n < 5 && m < 5) {
		return;
	}
	console.log(`${new Date()}当前clients数目: ${n}, 打开的clients数: ${m}`);
}