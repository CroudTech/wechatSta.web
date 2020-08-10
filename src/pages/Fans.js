import React from 'react'
import { fans, fansxlsx } from '../util/api'
import WechatSta from '../components/WechatSta'

const columns = [
    {
        title: '日期',
        dataIndex: '日期',
        key: '日期',
    },
    {
        title: '新关注人数',
        dataIndex: '新关注人数',
        key: '新关注人数',
    },
    {
        title: '搜索公众号名称',
        dataIndex: '公众号搜索',
        key: '公众号搜索',
    },
    {
        title: '扫描二维码',
        dataIndex: '扫描二维码',
        key: '扫描二维码',
    },
    {
        title: '图文页右上角菜单',
        dataIndex: '图文页右上角菜单',
        key: '图文页右上角菜单',
    },
    {
        title: '名片分享',
        dataIndex: '名片分享',
        key: '名片分享',
    },
    {
        title: '其他来源',
        dataIndex: '其他合计',
        key: '其他合计',
    },
    {
        title: '取消关注人数',
        dataIndex: '取消关注人数',
        key: '取消关注人数',
    },
    {
        title: '净增关注人数',
        dataIndex: '净增关注人数',
        key: '净增关注人数',
    },
    {
        title: '累计关注人数',
        dataIndex: '累计关注人数',
        key: '累计关注人数',
    },
]

const chart = {
    type: 'line',
    title: {
        新关注人数: '新关注人数',
        搜索公众号名称: '公众号搜索',
        扫描二维码: '扫描二维码',
        图文页右上角菜单: '图文页右上角菜单',
        名片分享: '名片分享',
        其他来源: '其他合计',
        取消关注人数: '取消关注人数',
        净增关注人数: '净增关注人数',
        累计关注人数: '累计关注人数',
    },
    filter:['累计关注人数'],
    x: '日期',
}

export default props => {
    return (
        <div style={{ padding: '0 30px' }}>
            <WechatSta sta="fans" chart={chart} columns={columns} dataapi={fans} xlsxapi={fansxlsx} />
        </div>
    )
}