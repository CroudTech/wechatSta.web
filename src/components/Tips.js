import React from 'react'
import { Link } from 'react-router-dom'
import { wechat, fans, article, profile, wxonline } from '../router'
import { host } from '../util/api'
import { LinkOutlined, DownloadOutlined } from '@ant-design/icons'

export default props => {
    return (
        <div className="Tips">
            <p>微信公众号平台限制，每天<b>上午8点后</b>可查询公众号前一天的数据。</p>
            <ul>
                <li>本系统默认在每天<b>上午8点10分</b>从微信服务器同步公众号前一天的粉丝和图文数据。</li>
                <li>可在右上角悬浮菜单中点击<Link to={profile.path}>My Profile<sup><LinkOutlined /></sup></Link>修改 Nickname。</li>
                <li>可在<Link to={wechat.path}>微信公众号<sup><LinkOutlined /></sup></Link>管理您的公众号列表。</li>
                <li>请确保您的微信公众号已经经过认证，并具有用户/图文分析接口权限。</li>
                <li>可分别在<Link to={fans.path}>粉丝数据<sup><LinkOutlined /></sup></Link>和<Link to={article.path}>文章数据<sup><LinkOutlined /></sup></Link>查看粉丝和文章的数据，并下载xlsx文件。</li>
                <li>因为微信公众平台安全机制限制，本系统无法直接从微信接口获取文章留言数、好看数和全文阅读完成率。</li>
                <li>请使用Chrome安装<a href={`${host}/ccext.zip`}>ccext<sup><DownloadOutlined /></sup></a>插件,并在<Link to={wxonline.path}>公众号平台<sup><LinkOutlined /></sup></Link>登陆微信公众号平台，系统将自动同步最近15天发布的文章好看数和全文阅读完成率。</li>
            </ul>
        </div>
    )
}
