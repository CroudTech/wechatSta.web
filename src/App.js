import React, { useState, useEffect } from 'react';
import './App.css';
import { Layout, Menu, Avatar, Popover, Divider } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Route, Switch, Link, useLocation } from 'react-router-dom'
import { root, profile, article, fans, wechat, wxonline } from './router'
import { NicknameContext } from './util/context'
import { auth } from './util/api'
import { get } from './util/request'

const { Header, Content } = Layout

const AvatarMenu = nickname => (
  <>
    <div className="AvatarNickName">Hi, {nickname}</div>
    <Divider className="AvatarDivider" />
    <Link className="AvatarMenu" to={profile.path}><UserOutlined /> My Profile</Link>
  </>
)

const App = props => {
  let path = useLocation().pathname.toLowerCase()
  const [nickname, setNickname] = useState('Login Please!')

  useEffect(() => {
    get(auth).then(data => {
      const { nickname } = data || {}
      nickname && setNickname(nickname)
    })
  }, [])

  return (
    <Layout className="Layout">
      <Header className="Header">
        <Link to="/"><div className="logo" /></Link>
        <Menu
          className="Menu"
          mode="horizontal"
          selectedKeys={[path]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key={fans.path}>
            <Link to={fans.path}>粉丝数据</Link>
          </Menu.Item>
          <Menu.Item key={article.path}>
            <Link to={article.path}>文章数据</Link>
          </Menu.Item>
          <Menu.Item key={wechat.path}>
            <Link to={wechat.path}>微信公众号</Link>
          </Menu.Item>
          <Menu.Item key={wxonline.path}>
            <Link to={wxonline.path}>公众号平台</Link>
          </Menu.Item>
        </Menu>
        <Popover content={AvatarMenu(nickname)} placement="bottomRight" trigger="hover">
          <Avatar className="Avatar" size="large">
            {(nickname[0]).toUpperCase()}
          </Avatar>
        </Popover>
      </Header>
      <NicknameContext.Provider value={{ nickname, setNickname }}>
        <Content className="Content">
          <Switch>
            {
              root.children.map((r, k) => (<Route exact key={k} path={r.path} component={r.component} />))
            }
          </Switch>
        </Content>
      </NicknameContext.Provider>
    </Layout>
  )
}

export default App
