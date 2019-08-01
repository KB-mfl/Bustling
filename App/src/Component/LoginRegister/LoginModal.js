import React from 'react'
import { Modal } from "antd";
import Login from './Login'
import Register from './Register'

export default class LoginModal extends React.Component{
    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleOk = () => {
        this.props.handleOk();
    };

    handleCancel = () => {
        this.props.handleCancel();
    };

    render() {
        return (
            <Modal
                width="400px"
                title="登录"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                {/*<Login/>*/}
                <Register/>
            </Modal>

        )
    }
}
