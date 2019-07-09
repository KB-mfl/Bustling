import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import sha256 from 'sha256';
import {message} from 'antd';
import http from '../service';
import store from 'store'
const FormItem = Form.Item;
class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submiting: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({submiting: true})
                http.post('auth/login', {
                    password: sha256(values.password),
                    email: values.email
                }).then(r => {
                    message.success('登陆成功', 1).then(() => {
                        this.setState({submiting: false})
                        store.set('token', {
                            accessToken: r.data.data.accessToken,
                            refreshToken: r.data.data.refreshToken
                        })
                        // console.log(window)
                        window.location.reload();
                    })
                }).catch(e => {
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
            <Form onSubmit={this.handleSubmit} layout="vertical">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请检查邮箱格式',
                        }, {
                            required: true, message: '请输入邮箱'
                        }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={this.state.submiting}>登陆</Button>
                </FormItem>
            </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(login);
export default WrappedNormalLoginForm
