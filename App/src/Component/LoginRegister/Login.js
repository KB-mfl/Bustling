import React from 'react'
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import { Link } from "react-router-dom";
import CryptoJS from 'crypto-js';
import {message} from 'antd';
import httpService from '../../service';
import store from 'store'
const FormItem = Form.Item;
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submiting: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({submiting: true});
                httpService.post('auth/login', {
                    username: values.username,
                    password: CryptoJS.SHA1(values.password).toString(),
                    remember: true,
                }).then(r => {
                    console.log(r.data);
                    message.success('登陆成功', 3);
                    this.setState({submiting: false});
                    store.set(('token'),{
                        Api_Token:r.data.token,
                    });
                    httpService.get('/auth/auth').then(r=>{
                        let alias = r.data.role.alias;
                        setTimeout(()=>{window.location.href=`/${alias}/homepage`},3000);
                    })
                }).catch(e => {
                    message.error('登录失败');
                    console.log(e);
                    this.setState({submiting: false})
                })
            } else {
                message.error('表单填写有误')
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical" style={{maxWidth:'300px',marginLeft:'9%'}}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: '请输入用户名'
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={this.state.submiting} onClick={this.handleSubmit}>登陆</Button>
                </FormItem>
                <Form.Item>
                    <a style={{float:"right"}} href="/forgot">
                        Forgot password
                    </a>
                    <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(login);
export default WrappedNormalLoginForm
