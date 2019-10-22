import React, { Component } from 'react'

import {
    Route,
    Link
} from 'react-router-dom'

export default class Food extends Component {

    render() {
        return (
            <div>
                <Link to="/food/foodlist/3">foodlist</Link><br />
                <Link to="/food/foodmenu">foodmenu</Link>
                <Route path="/food/foodlist/:id" component={Foodlist}></Route>
                <Route path="/food/foodmenu" component={Foodmenu}></Route>
            </div>
        )
    }
}


//子路由调用的组件
const Foodlist = () => (
    <div>子路由的Foodlist11</div>
)
const Foodmenu = () => (
    <div>子路由的Foodmenu</div>
)