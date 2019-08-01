import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Notification from './Notification/Notification'
import Profit from './Profit/Profit'
import Manage from './Manage/Manage'

export default class AdminRouter extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route exact path="/admin" component={() => <Redirect to="/admin/homePage"/>}/>
                <Route exact path="/admin" component={HomePage}/>
                <Route exact path="/admin" conponent={Notification}/>
                <Route exact path="/admin" component={Profit}/>
                <Route exact path="/admin" component={Manage}/>
            </Switch>
        );
    }
}
