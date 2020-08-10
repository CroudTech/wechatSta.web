import React, { useEffect, useState } from 'react'
import { Table, Tabs, Button, DatePicker, Popover } from 'antd'
import { get, post } from '../util/request'
import { wechat as wechatApi, wxsta } from '../util/api'
import dayjs from 'dayjs'
import filedownload from 'js-file-download'
import LineChart from './LineChart'
import IntervalChart from './IntervalChart'
import { WarningOutlined, DownloadOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { RangePicker } = DatePicker

const charts = {
    line: (chart, dataList) => (<LineChart chart={chart} dataList={dataList} />),
    interval: (chart, dataList) => (<IntervalChart chart={chart} dataList={dataList} />)
}

const staCmds = {
    fans: (wechatid, date, succes) => {
        let begin_date = dayjs(date.begin_date) || dayjs().add(-6, 'd'),
            end_date = dayjs(date.end_date) || dayjs()
        begin_date = end_date.diff(begin_date, 'd') > 6 ? end_date.clone().add(-6, 'd') : begin_date
        post(wxsta, {
            wechatid,
            begin_date: begin_date.format('YYYY-MM-DD'),
            end_date: end_date.format('YYYY-MM-DD'),
            stas: ['usersummary', 'usercumulate']
        }).then(() => {
            succes && succes()
        })
    },
    article: (wechatid, date, succes) => {
        let end_date = dayjs(date.end_date) || dayjs()
        post(wxsta, {
            wechatid,
            begin_date: end_date.format('YYYY-MM-DD'),
            end_date: end_date.format('YYYY-MM-DD'),
            stas: ['articletotal']
        }).then(() => {
            succes && succes()
        })
    },
}

const DataTable = props => {
    const { chart, wechat, date, columns, dataapi, reload } = props
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        pageSize: 20,
        current: 1
    })

    useEffect(() => {
        setLoading(true)
        get(`${dataapi}/${wechat.id}`, {
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current - 1,
                ...date
            }
        }).then(data => {
            setLoading(false)
            if (data) {
                const { rows, rowsCount } = data
                setDataList(rows || [])
                setPagination({
                    ...pagination,
                    total: rowsCount
                })
            }
        })
    }, [wechat.id, pagination.pageSize, pagination.current, date, reload, dataapi])

    const handlerTableChange = (page) => {
        setPagination({ ...pagination, current: page.current })
    }

    return (
        <>
            {chart && dataList && dataList.length ? charts[chart.type](chart, dataList) : null}
            <Table size="small"
                style={{ fontSize: 12 }}
                rowKey="rowno"
                pagination={{ ...pagination, hideOnSinglePage: true }}
                columns={columns}
                dataSource={dataList}
                loading={loading}
                onChange={handlerTableChange}
            />
        </>
    )
}

export default props => {
    const { dataapi, xlsxapi, columns, sta, chart } = props

    const [loading, setLoading] = useState(false)
    const [wechatList, setWechatList] = useState([])
    const [activeWechatId, setActiveWechatId] = useState(0)
    const [date, setDate] = useState({
        begin_date: dayjs().add(-7, 'd').format('YYYY-MM-DD'),
        end_date: dayjs().add(-1, 'd').format('YYYY-MM-DD')
    })
    const [reload, setReload] = useState(0)

    const syncWechatList = () => {
        get(wechatApi).then(data => {
            setWechatList(data || [])
            setActiveWechatId(data && data[0] && data[0].id)
        })
    }

    useEffect(syncWechatList, [])

    const dateChangeHandler = (dates, dateStrings) => {
        const [begin_date, end_date] = dateStrings
        setDate({ begin_date, end_date })
    }

    const downloadHandler = () => {
        get(`${xlsxapi}/${activeWechatId}`, { params: date, responseType: 'arraybuffer' }).then(res => {
            if (res) {
                let blob = new Blob([res.data], { type: res.headers['content-type'] })
                filedownload(blob, `export_${sta}_${date.begin_date}_${date.end_date}.xlsx`)
            }
        })
    }

    const syncWechatHandler = () => {
        const cmd = staCmds[sta]
        setLoading(true)
        if (cmd) cmd(activeWechatId, date, () => {
            setLoading(false)
            setReload(reload + 1)
        })
    }

    return (
        <Tabs defaultActiveKey={`${activeWechatId}`}
            size="small"
            onChange={key => { setActiveWechatId(key) }}
            tabBarExtraContent={<>
                <RangePicker bordered={false} onChange={dateChangeHandler}
                    defaultValue={[dayjs().add(-7, 'd'), dayjs().add(-1, 'd')]}
                    ranges={{
                        Yesterday: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')],
                        'Last Week': [dayjs().add(-1, 'w').startOf('week'), dayjs().add(-1, 'w').endOf('week')],
                        'This Week': [dayjs().startOf('week'), dayjs().endOf('week')],
                        'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
                    }} />
                <Button type="link" onClick={downloadHandler}>Download xlsx<sup><DownloadOutlined /></sup></Button>
                <Popover content={<div style={{ padding: 10, fontSize: 12 }}>微信平台对公众号接口每日调用次数有严格限制，如非必要请谨慎使用此功能。</div>} trigger="hover">
                    <Button type="link" loading={loading} danger onClick={syncWechatHandler}><WarningOutlined />Sync Wechat</Button>
                </Popover>
            </>}>
            {
                wechatList.map(c => (
                    <TabPane tab={c.name} key={c.id}>
                        <DataTable chart={chart} dataapi={dataapi} columns={columns} date={date} wechat={c} reload={reload} />
                    </TabPane>
                ))
            }
        </Tabs>
    )
}