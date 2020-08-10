import App from './App'
import Welcome from './Welcome'
import NotFound from './404'
import WeChat from './pages/WeChat'
import Fans from './pages/Fans'
import Article from './pages/Article'
import Profile from './pages/Profile'
import WxOnline from './pages/WxOnline'

export const notfound = { path: '*', component: NotFound }
export const welcome = { path: '/', component: Welcome }
export const wechat = { path: '/wechat', component: WeChat }
export const fans = { path: '/fans', component: Fans }
export const article = { path: '/article', component: Article }
export const profile = { path: '/profile', component: Profile }
export const wxonline = { path: '/wxonline', component: WxOnline }

export const root = {
    path: '/',
    component: App,
    children: [welcome, wechat, fans, article, profile, wxonline, notfound]
}