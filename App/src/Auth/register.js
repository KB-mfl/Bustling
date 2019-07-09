import React from 'react'
import http from '../service'
import { message } from 'antd'
import sha256 from 'sha256'
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            usernameValidate: '',
            emailValidate: '',
            submiting: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(err)
            if (!err) {
                this.setState({submiting: true})
                http.post('auth/register', {
                    username: values.username,
                    password: sha256(values.password),
                    email: values.email
                }).then(r => {
                    message.success('注册成功，请登录', 1).then(() => {
                        this.setState({submiting: false})
                        // window.location.reload();
                    })
                }).catch(e => {
                    this.setState({submiting: false})
                })
            } else {
                message.error('表单填写有误')
            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    usernameValidating = (rule, value, callback) => {
        const form = this.props.form;
        this.setState({usernameValidate: 'validating'})
        let username = form.getFieldsValue(['username']).username
        if (!username) {
            this.setState({usernameValidate: 'error'})
            callback('请输入用户名')
            return;
        }
        let Reg = /^([a-zA-Z][a-zA-Z0-9_]{0,9})$|^([\u4e00-\u9fa5]{1,10})$/;
        console.log(Reg.test(username))
        if (!Reg.test(username)) {
            this.setState({usernameValidate: 'error'})
            callback('请检查用户名(以英文字母或中文字符开头，不超过10个字符)')
            return;
        }
        http.get('auth/valid/username', {params: {username: username}}).then(r => {
            console.log(r)
            if (r.data.status.code === 200) {
                this.setState({usernameValidate: 'success'})
                callback()
            } else {
                this.setState({usernameValidate: 'error'})
                callback(r.data.status.msg)
            }
        })
    }

    emailValidating = (rule, value, callback) => {
        const form = this.props.form;
        this.setState({emailValidate: 'validating'});
        let email = form.getFieldsValue(['email']).email
        if (!email) {
            this.setState({emailValidate: 'error'})
            callback('请输入邮箱')
            return
        }
        let Reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (!Reg.test(email)) {
            this.setState({emailValidate: 'error'})
            callback('请检查邮箱格式')
            return;
        }
        http.get('auth/valid/email', {params: {email: email}}).then(r => {
            console.log(r)
            if (r.data.status.code === 200) {
                this.setState({emailValidate: 'success'})
                callback()
            } else {
                this.setState({emailValidate: 'error'})
                callback(r.data.status.msg)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} layout="vertical">
                <FormItem
                    label="用户名"
                    validateStatus = {this.state.usernameValidate}
                    hasFeedback
                >
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: ' ',
                        }, {
                            validator: this.usernameValidating
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="邮箱"
                    validateStatus = {this.state.emailValidate}
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: ' ',
                        }, {
                            validator: this.emailValidating
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="密码">
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem label="确认密码">
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次确认密码',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={this.state.submiting}>注册</Button>
                </FormItem>
            </Form>
        )
    }
}
const WrappedRegistrationForm = Form.create()(register);

export default WrappedRegistrationForm
