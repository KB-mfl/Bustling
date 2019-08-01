import React from 'react'
import { Button } from "antd";
import LoginOut from '../LoginRegister/LoginOut'
class profit extends React.Component {
    constructor(props){
        super(props)
    }
    loginOut = () => {

    }
    render() {
        return (
            <div>
                <div style={{float:'right'}}>
                    <LoginOut/>
                </div>
            </div>
        )
    }
}

export default profit
