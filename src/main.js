import React from 'react'
import { render } from 'react-dom'

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

// 引入主体样式文件
import './main.css'

// 引入单个页面（包括嵌套的子页面）
// import Home from './components/demo1.js'
import senguodemo from './components/demo2Example.js'
import About from './components/demo2.js'

// 配置路由
render((
    <Router history={hashHistory} >
        <Route path="/" >
            <IndexRoute component={senguodemo} />
            <Route path="senguodemo" component={senguodemo} />
        </Route>
    </Router>
), document.getElementById('app'));


