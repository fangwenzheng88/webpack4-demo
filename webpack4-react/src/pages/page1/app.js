import React, { Component, lazy, Suspense } from 'react'

import './index.css'
import {
    Route,
    Switch,
    Link,
    Redirect,
    NavLink,
    BrowserRouter as Router
} from 'react-router-dom'

import Error from './Error'


import Food from './Food'
import Page404 from './Page404'
//import Profile from './Profile'

//懒加载，有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
const Wiki = lazy(() => import( /* webpackChunkName: "Wike" */ './Wike'));
const Profile = lazy(() => import( /* webpackChunkName: "Wike" */ './Profile'));

export default class Home extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>

                        <NavLink to="/food" activeClassName="active">food</NavLink><hr />
                        <NavLink to="/wiki" activeClassName="active">wiki</NavLink><hr />
                        <NavLink to="/profile" activeClassName="active">profile</NavLink><hr />
                    </ul>


                    {/* 使用Switch是为了将React默认的包容性路由变为排他性路由 */}
                    {/* 包容性路由：/food 既能匹配到/ 又能匹配到/food   
                   排他性路由：只能匹配一个 /food就只能匹配到/food */}
                    <Error>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                {/*Redirect 是路由转化  即匹配到某一个路由转化到另一个路由  */}
                                <Redirect from="/" exact to="/food" />
                                <Route path="/food" component={Food} />
                                {/* 除了用Switch外也可以用exact来避免一个路由匹配多个，exact是精准匹配
                            但是使用exact时需要每个路由上都加上exact才能达到和Switch一样的效果 */}
                                {/* <Route path="/wiki" exact component={Wiki}/> */}
                                <Route path="/wiki" component={Wiki} />
                                <Route path="/profile" component={Profile} />
                                <Route component={Page404} />
                            </Switch>
                        </Suspense>
                    </Error>
                </div>
            </Router>
        )
    }
}