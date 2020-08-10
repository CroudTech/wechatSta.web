import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Modal, Form, Button, Input, Affix } from 'antd'
import {
    CheckOutlined, CheckCircleTwoTone, PauseOutlined, EditOutlined,
    PlusOutlined, CloseCircleTwoTone,
} from '@ant-design/icons'
import { get, put, post } from '../util/request'
import { wechat as wechatApi, wechatall, wechatstatus } from '../util/api'

const WechatCardTitle = props => {
    const { title, status } = props
    const color = status ? '#eb2f96' : '#52c41a'
    return (<div>
        <span>{title}</span>
        <span style={{ margin: 'auto 3px auto 10px' }}>
            {status ? <CloseCircleTwoTone twoToneColor={color} /> : <CheckCircleTwoTone twoToneColor={color} />}
        </span>
        <span style={{ fontSize: 12, color }}>
            {status ? '已禁用' : '已启用'}
        </span>
    </div>)
}

const WechatCard = props => {
    const { wechat, editHandler } = props
    const [status, setStatus] = useState(wechat.del_on ? 1 : 0)

    const statusSwitchHandler = () => {
        put(`${wechatstatus}/${wechat.id}`, { status: status ^ 1 })
            .then(data => { setStatus(data ? 1 : 0) })
    }

    const WechatCheck = () => {
        const cardActions = [<EditOutlined onClick={() => { editHandler(wechat) }} />]
        cardActions.push(status
            ? <CheckOutlined onClick={statusSwitchHandler} />
            : <PauseOutlined onClick={statusSwitchHandler} />)
        return cardActions
    }

    return (
        <Card hoverable style={{ margin: '10px auto', width: 500, borderRadius: 3 }}
            actions={WechatCheck()}>
            <Descriptions column={1} bordered size="small" title={<WechatCardTitle title={wechat.name} status={status} />}>
                <Descriptions.Item label="微信号">{wechat.wechatname}</Descriptions.Item>
                <Descriptions.Item label="AppID">{wechat.appid}</Descriptions.Item>
                <Descriptions.Item label="AppSecret">{wechat.appsecret}</Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default props => {
    const [loading, setLoading] = useState(0)
    const [modalVisable, setModalVisable] = useState(false)
    const [wechatList, setWechatList] = useState([])
    const [form] = Form.useForm()

    const syncWechatList = () => {
        get(wechatall).then(data => {
            setWechatList(data || [])
        })
    }

    useEffect(syncWechatList, [])

    const editWechatHandler = (wechat) => {
        form.setFieldsValue(wechat)
        setModalVisable(true)
    }

    const SubmitHandler = values => {
        const { id } = values
        setLoading(1)
        const req = id ? put(`${wechatApi}/${id}`, values) : post(wechatApi, values)
        req.then(data => {
            setLoading(0)
            if (data) {
                form.resetFields()
                setModalVisable(false)
                syncWechatList()
            }
        })
    }

    return (
        <div className="Wrap">
            {wechatList.map(w => (<WechatCard key={w.id} wechat={w} editHandler={editWechatHandler} />))}
            <Modal
                centered
                forceRender
                width={400}
                visible={modalVisable}
                closable={false}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={SubmitHandler}>
                    < Form.Item label="id" name="id" noStyle >
                        <Input style={{ display: 'none' }} />
                    </Form.Item>
                    <Form.Item name="wechatname" label="微信号" hasFeedback
                        rules={[{ required: true, message: 'Please input 微信号!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="Name" hasFeedback
                        rules={[{ required: true, message: 'Please input wechat name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="appid" label="AppID" hasFeedback
                        rules={[{ required: true, message: 'Please input AppID!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="appsecret" label="AppSecret" hasFeedback
                        rules={[{ required: true, message: 'Please input AppSecret!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} block type="primary" htmlType="submit">SAVE</Button>
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button block type="link" onClick={() => { form.resetFields(); setModalVisable(false) }} >CLOSE</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Affix style={{ position: 'absolute', bottom: 100, right: 100 }}>
                <Button size="large" type="primary" shape="circle" icon={<PlusOutlined />}
                    onClick={() => { setModalVisable(true) }}></Button>
            </Affix>
        </div >
    )
}