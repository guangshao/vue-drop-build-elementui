/**
 * vue项目配置 工具函数
 * @author szyeliming@ininin.com
 * @since 2020-05-36
 * @version 1.0.0
 * @description vue项目配置工具函数
 * @copyright ininin.com
 */

const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

// 写入系统版本号
exports.setVersion = jsonPath => {
	const filePath = path.join(__dirname, jsonPath);
	const version = this.uuid(8, 16).toLowerCase();
	const json = {
		version
	};
	fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
	// eslint-disable-next-line no-console
	console.log("write version file successful! current version: " + version);
	return version;
};

// 获取模块版本号
exports.getModulesVersion = () => {
	let mvs = {};
	let regexp = /^npm_package_.{0,3}dependencies_/gi;
	for (let m in process.env) {
		// 从node内置参数中读取，也可直接import 项目文件进来
		if (regexp.test(m)) {
			/*
			 * 匹配模块
			 * 获取到模块版本号
			 */
			mvs[m.replace(regexp, "").replace(/_/g, "-")] = process.env[m].replace(/(~|\^)/g, "");
		}
	}
	return mvs;
};
// 生成 externals 构建时不需要被处理的模块
exports.getExternalModules = (baseHttp, config) => {
	let externals = {}; // 结果
	let dependencieModules = this.getModulesVersion(); // 获取全部的模块和版本号
	config.forEach(item => {
		// 遍历配置
		if (item.customer) {
			return;
		} else if (item.name in dependencieModules) {
			let version = dependencieModules[item.name];
			// 拼接css 和 js 完整链接
			item.css = item.css && [baseHttp, item.name, version, item.css].join("/");
			item.js = item.js && [baseHttp, item.name, version, item.js].join("/");
			externals[item.name] = item.scope; // 为打包时准备
		} else {
			throw new Error("相关依赖未安装，请先执行npm install " + item.name);
		}
	});
	return externals;
};
// 生成 uuid
exports.uuid = (len, radix) => {
	let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
	let uuid = [],
		i;
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (i = 0; i < len; i++) {
			const rr = Math.random() * radix;
			uuid[i] = chars[0 | rr];
		}
	} else {
		// rfc4122, version 4 form
		let r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
		uuid[14] = "4";

		/*
		 * Fill in random data.  At i==19 set the high bits of clock sequence as
		 * per rfc4122, sec. 4.1.5
		 */
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				const rn = Math.random() * 16;
				r = 0 | rn;
				const rx3 = r & 0x3;
				uuid[i] = chars[i === 19 ? rx3 | 0x8 : r];
			}
		}
	}

	return uuid.join("");
};
/**
 * 记录每一次的打包版本及时间
 * @param {String} filePath 文件路径
 * @param {String} MODE 打包模式 pre develop test prod
 * @returns {String} 生成的版本号
 */
exports.writeVersion = (filePath, MODE) => {
	const versionFilePath = path.resolve(__dirname, filePath);
	const currentVersion = this.uuid(8, 16).toLowerCase();
	const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
	const logSuccess = () => {
		console.log("版本" + currentVersion + "已记录，记录时间" + now);
	};
	try {
		const fd = fs.openSync(versionFilePath, "a+");
		fs.closeSync(fd);
		let data = fs.readFileSync(versionFilePath).toString();
		const len = data.split("\n").length;
		let current = currentVersion + "," + now + "," + MODE;
		if (len >= 5) {
			const historyPath = path.resolve(__dirname, "./public/static/version.history.txt");
			const fd = fs.openSync(historyPath, "a+");
			fs.closeSync(fd);
			let history = fs.readFileSync(historyPath).toString();
			let historyLen = history.split("\n").length;
			let isArchive = false;
			if (historyLen >= 1000) {
				isArchive = true;
				// 归档
				const archivePath = path.resolve(
					__dirname,
					"./public/static/version.archive." + dayjs().format("YYYY-MM-DD") + ".txt"
				);
				const fd = fs.openSync(archivePath, "a+");
				fs.closeSync(fd);
				fs.writeFileSync(archivePath, history);
			}
			if (history && !isArchive) {
				data = data + "\n" + history;
			}
			fs.writeFileSync(historyPath, data);
			fs.writeFileSync(versionFilePath, current);
		} else {
			if (data) {
				current = current + "\n" + data;
			}
			fs.writeFileSync(versionFilePath, current);
		}
		logSuccess();
	} catch (err) {
		console.log(err);
	}
	return currentVersion;
};
