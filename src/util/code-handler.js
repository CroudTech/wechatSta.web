import { message } from 'antd'

message.config({
    top: 100,
    duration: 3,
})

const codeHandler = {
    500: '服务器内部错误',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    401: '登陆失效，重新登陆',
    403: '资源不可用',
    404: '请求的资源在服务器上不存在',
    6501: '无效参数.'
}

const codeCallbackHandler = {
}

export default (code, t = 'info', m = '') => {
    const msg = message[t]
    const ch = codeHandler[code] || m || 0
    const call = codeCallbackHandler[code]

    if (msg && ch) msg(ch)
    else if (msg && !call && code) msg(code)

    if (ch) console.info(code, ch)

    if (call) call()
}