import React from 'react'
import httpService from '../../service'
import { message, Row,Col } from 'antd'
import CryptoJS from 'crypto-js';
import { Form, Input, Button } from 'antd';
import store from 'store'
const FormItem = Form.Item;
class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            usernameValidate: '',
            emailValidate: '',
            submiting: false,
            pendingTime:0,
            email:''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("init");
        this.props.form.validateFields((errors, values) => {
            console.log(errors);
            if (!errors) {
                this.setState({submiting: true});
                httpService.post('auth/register', {
                    username: values.username,
                    password: CryptoJS.SHA1(values.password).toString(),
                    email: values.email,
                    code:values.code
                }).then(r => {
                    message.success('注册成功，请登录', 1).then(() => {
                        this.setState({submiting: false});
                        store.set(('token'),{
                            Api_Token:r.data.token,
                        });
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

    compareToFirstPassword = (rule, value, callback) => {
        console.log('1');
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        console.log('2');
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = (e) => {
        console.log('3');
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    usernameValidating = (rule, value, callback) => {
        const form = this.props.form;
        this.setState({usernameValidate: 'validating'});
        let username = form.getFieldsValue(['username']).username;
        if (!username) {
            this.setState({usernameValidate: 'error'});
            callback('请输入用户名');
            return;
        }
        let Reg = /^([a-zA-Z][a-zA-Z0-9_]{0,9})$|^([\u4e00-\u9fa5]{1,10})$/;
        console.log(Reg.test(username));
        if (!Reg.test(username)) {
            this.setState({usernameValidate: 'error'});
            callback('请检查用户名(以英文字母或中文字符开头，不超过10个字符)');
            return;
        }
        this.setState({usernameValidate: 'success'});
        callback();
    };

    emailValidating = (rule, value, callback) => {
        const form = this.props.form;
        this.setState({emailValidate: 'validating'});
        let email = form.getFieldsValue(['email']).email;
        this.setState({
            email:email
        });
        if (!email) {
            this.setState({emailValidate: 'error'});
            callback('请输入邮箱');
            return
        }
        let Reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!Reg.test(email)) {
            this.setState({emailValidate: 'error'});
            callback('请检查邮箱格式');
            return;
        }
        this.setState({emailValidate: 'success'})
        callback();
    };

    getCode = () => {
        console.log(this.state.email);
        const data = {email: this.state.email};
        this.setState({
            pendingTime:60
        });
        httpService.post('auth/code',data).then(r=>{
            console.log('zhu');
            message.success('邮件发送成功，请及时填写你的验证码');
            this.penderTime(60);
        }).catch(e=>{
            console.log('zhu1');
            this.penderTime(60);
        })
    };

    penderTime(sending = this.state.pendingTime - 1) {
        if (sending < 0) {
            return;
        }
        this.setState({ sending });
        if (sending > 0) {
            setTimeout(this.penderTime.bind(this), 1000);
        }
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
                <FormItem>
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: '请输入你的验证码' }],
                            })(<Input />)}
                        </Col>
                        <Col span={12}>
                            <Button
                                onClick={this.getCode.bind(this)}
                                disabled={!(this.state.emailValidate === 'success')}
                            >
                                {this.state.pendingTime > 0 ? `${this.state.pendingTime}后获取重新获取`: '获取验证码'}
                            </Button>
                        </Col>
                    </Row>
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
