import React from 'react'
import {Button, Card, Icon, Form, Input} from "antd";

class PersonalInfor extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Form>
                <Form.Item>
                    <strong>姓名</strong>
                    <Input disabled={true}
                        value={window.authInfor.username}
                    />
                </Form.Item>
                <Form.Item>
                    <strong>性别({window.authInfor.gender===1 ? <Icon type='woman'/>:<Icon type='man'/>})</strong>
                    <Input
                        value={window.authInfor.gender===1 ? '女':'男'}
                        disabled={true}
                    />
                </Form.Item>
                <Form.Item>
                    <strong>邮箱</strong>
                    <Input
                    value={window.authInfor.email}
                    disabled={true}
                    />
                </Form.Item>
                <Form.Item>
                    <strong>自我简介</strong>
                    <Input
                    type='Textarea'
                    value={window.authInfor.introduction === null ? '你太懒了，竟然不想写下一点简介':window.authInfor.introduction}
                    disabled={true}
                    />
                </Form.Item>
            </Form>
        )
    }
}
export default PersonalInfor
