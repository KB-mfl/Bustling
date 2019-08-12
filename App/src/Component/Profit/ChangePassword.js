import React from 'react'
import {Button, Col, Form, Input, message, Row} from "antd";
import httpService from "../../service";
import CryptoJS from "crypto-js";
const FormItem = Form.Item
class ChangePassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submiting: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({submiting: true});
                console.log(123);
                httpService.put('user/security', {
                    password_old: CryptoJS.SHA1(values.password_old).toString(),
                    password_new: CryptoJS.SHA1(values.password).toString(),
                }).then(r => {
                    message.success('修改成功', 3);
                    this.setState({submiting: false});
                    setTimeout(()=>{window.location.reload()},3000);
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

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不同');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical" style={{maxWidth:'300px',marginLeft:'9%'}}>
                <FormItem
                    label="旧密码"
                >
                    {getFieldDecorator('password_old', {
                        rules: [{
                            required: true, message: '请输入旧密码',
                        }],
                    })(
                        <Input.Password/>
                    )}
                </FormItem>
                <FormItem label="新密码">
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input.Password />
                    )}
                </FormItem>
                <FormItem label="确认新密码">
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次确认密码',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input.Password onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={this.state.submiting} onClick={this.handleSubmit}>确认</Button>
                </FormItem>
            </Form>
        )
    }
}
const WrappedRegistrationForm = Form.create()(ChangePassword);
export default WrappedRegistrationForm
