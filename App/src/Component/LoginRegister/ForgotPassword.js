import React from 'react'
import httpService from '../../service'
import {Form, Icon, Input, Button, message, Row, Col} from 'antd';
import CryptoJS from 'crypto-js';
const FormItem = Form.Item;
class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailValidate: '',
            submiting: false,
            confirmDirty: false,
            pendingTime:0,
            email:''
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({submiting: true});
                console.log(123);
                httpService.put('auth/forgot', {
                    email: values.email,
                    password: CryptoJS.SHA1(values.password).toString(),
                    code:values.code,
                }).then(r => {
                    message.success('修改成功', 3);
                    this.setState({submiting: false});
                    setTimeout(()=>{window.location.href='/login'},3000);
                }).catch(e => {
                    message.error('修改失败');
                    console.log(e);
                    this.setState({submiting: false})
                })
            } else {
                message.error('表单填写有误')
            }
        });
    }

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
        httpService.post('auth/code',data).then(r=>{
            message.success('邮件发送成功，请及时填写你的验证码');
            this.setState({
                pendingTime:60
            },function () {
                this.penderTime(60);
            });
        }).catch(e=>{
            this.setState({
                pendingTime:60
            },function () {
                this.penderTime(60);
            });
        })
    };

    penderTime(pending = this.state.pendingTime - 1) {
        if (pending < 0) {
            return;
        }
        this.setState({pendingTime:pending});
        if (pending > 0) {
            setTimeout(this.penderTime.bind(this), 1000);
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical" style={{maxWidth:'300px',marginLeft:'9%'}}>
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
                    <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={this.state.submiting} onClick={this.handleSubmit}>确认</Button>
                </FormItem>
            </Form>
        )
    }
}
const WrappedRegistrationForm = Form.create()(ForgotPassword);
export default WrappedRegistrationForm
