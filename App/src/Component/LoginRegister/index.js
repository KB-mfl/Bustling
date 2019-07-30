import React from 'react'
import { Modal, Button } from "antd";
import Login from './Login'
import Register from './Register'

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    };

    closeModal = () => {
        this.setState({
            visible: true
        })
    };

    handleOk = () => {
        this.setState({
            visible: false
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    登录
                </Button>
                <Button type="primary" style={{ marginLeft:'10px' }} onClick={this.showModal}>注册</Button>
                <Modal
                    width="400px"
                    title="登录"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    closeModal={this.closeModal.bind(this)}
                    footer=''
                >
                    {/*<Login/>*/}
                    <Register/>
                </Modal>
            </div>
        )
    }
}
