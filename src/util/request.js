import axios from 'axios'
import { host } from './api'
import codeHandler from './code-handler'
import qs from 'qs'

const InsRequest = axios.create({
    baseURL: host,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [(data, headers) => {
        return qs.stringify(data)
    }]
})

InsRequest.interceptors.request.use(options => {
    return {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${process.env.REACT_APP_MOCK_TOKEN}`
        }
    }
}, error => {
    console.log('interceptors.request.Err: ', error);
    return Promise.reject(error);
})

InsRequest.interceptors.response.use(response => {
    if (response.status === 200) {
        const isJson = response.headers['content-type'].includes('application/json;')
        if (!isJson) return response

        const resdata = 'arraybuffer' === response.request.responseType
            ? JSON.parse(new TextDecoder('utf-8').decode(new Uint8Array(response.data))) : response.data
        const { code, msg, data } = resdata
        if (code === 200) {
            if (response.config.method === 'put' || response.config.method === 'post')
                codeHandler(code, 'success', '成功')
            return data
        }

        codeHandler(code, 'warn', msg)
    } else {
        codeHandler(response.status, 'warn')
    }
}, error => {
    console.log('interceptors.response.Err: ', error);
    if (error.response) codeHandler(error.response.status, 'warn')
    return Promise.reject(error);
})

export const get = InsRequest.get
export const post = InsRequest.post
export const put = InsRequest.put
export const del = InsRequest.delete

export default { get, post, put, del }