import React from 'react'
import { render } from 'react-dom'
import './styles/global-style.less'
import Home from './pages/home'
import OnlineImage from './pages/online-image'
import PlayMode from './pages/playMode'
import { HashRouter, Link, Route } from 'react-router-dom'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)


const menuClick = e => {
  console.log(e);

}
const App = (e) => {
  console.log('1111', e)
  return (
    <>
      <div style={{ display: 'flex' }} >
        <div style={{ width: 150 }}>
          <HashRouter>
            <Menu onClick={menuClick} mode='inline' defaultSelectedKeys={['home']} >
              <Menu.Item key='home' ><Link to='/home'>转谱</Link> </Menu.Item>
              <Menu.Item key='online-image'><Link to='/online-image'>搜谱</Link> </Menu.Item>
              <Menu.Item key='play-mode'><Link to='/play-mode'>演奏模式</Link></Menu.Item>
            </Menu>
          </HashRouter>

        </div>
        <div style={{ flex: 1 }}>
          <HashRouter >
            <Route path='/' exact component={Home} />
            <Route path='/home' exact component={Home} />
            <Route path='/online-image' exact component={OnlineImage} />
            <Route path='/play-mode' exact component={PlayMode} />
          </HashRouter>
        </div>
      </div>
    </>
  )
}

render(<App />, mainElement)