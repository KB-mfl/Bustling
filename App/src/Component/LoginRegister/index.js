import React from 'react'
import { Modal, Button } from "antd";
import Login from './Login'
import Register from './Register'
import LoginModal from "./LoginModal";

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible:true
        })
    }

    handleCancel = () => {
        this.setState({
            visible:false
        })
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    登录
                </Button>
                <LoginModal
                    visible={this.state.visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                />
            </div>
        )
    }
}
