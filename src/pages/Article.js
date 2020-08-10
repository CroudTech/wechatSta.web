import React from 'react'
import { article, articlexlsx } from '../util/api'
import WechatSta from '../components/WechatSta'

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width:380
    },
    {
        title: '发布日期',
        dataIndex: 'ref_date',
        key: 'ref_date',
    },
    {
        title: '图文位置',
        dataIndex: 'itemidx',
        key: 'itemidx',
    },
    {
        title: '阅读量',
        dataIndex: 'int_page_read_count',
        key: 'int_page_read_count',
    },
    {
        title: '分享次数',
        dataIndex: 'share_count',
        key: 'share_count',
    },
    {
        title: '留言数',
        dataIndex: 'comment_num',
        key: 'comment_num',
    },
    {
        title: '好看数',
        dataIndex: 'like_num',
        key: 'like_num',
    },
    {
        title: '收藏数',
        dataIndex: 'add_to_fav_count',
        key: 'add_to_fav_count',
    },
    {
        title: '全文阅读完成率',
        dataIndex: 'read_percent',
        key: 'read_percent',
    },
]


const chart = {
    type: 'interval',
    fields: {
        阅读量: 'int_page_read_count',
        分享次数: 'share_count',
        留言数: 'comment_num',
        好看数: 'like_num',
        收藏数: 'add_to_fav_count',
        全文阅读完成率: 'read_percent',
    },
    x: 'title',
}

export default props => {
    return (
        <div style={{ padding: '0 30px' }}>
            <WechatSta sta="article" chart={chart} columns={columns} dataapi={article} xlsxapi={articlexlsx} />
        </div>
    )
}