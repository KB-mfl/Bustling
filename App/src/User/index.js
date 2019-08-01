import React from 'react'
import {Switch,Route,Redirect} from "react-router-dom";
import HomePage from "../Component/HomePage/HomePage";
import Dashboard from '../Component/HomePage/HomePage'
import Writing from "./Writing/Writing";
import Profit from "../Component/Profit/Profit";
import Notification from '../Component/Notification/Notification'

export default class extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route exact path="/user" component={() =><Redirect to="/user/homePage"/>}/>
                <Route path='/user/homepage' component={HomePage}/>
                <Route path='/user/dashboard' component={Dashboard}/>
                <Route path='/user/notification' component={Notification}/>
                <Route path='/user/writing' component={Writing}/>
                <Route path='/user/profit' component={Profit}/>
            </Switch>
        )
    }
}
