//获取本地储存主题配色方案
const Them = 'them';

function getThem() {
	return window.localStorage.getItem(Them)
}

function setThem(token) {
	return window.localStorage.setItem(Them, token)
}

function removeThem() {
	return window.localStorage.removeItem(Them)
}

function getSession(key) {
	const result = window.sessionStorage.getItem(key)
	if (result && result=='Object') {
		return JSON.parse(result)
	}
	return result
}

function setSession(key, val) {
	if (key && key != '' && val) {
		return window.sessionStorage.setItem(key, JSON.stringify(val))
	}
}

function removeSession(key) {
	return window.sessionStorage.removeItem(key)
}

export {
	getThem,
	setThem,
	removeThem,
	getSession,
	setSession,
	removeSession
}
