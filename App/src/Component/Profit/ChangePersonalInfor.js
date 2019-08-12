import React from 'react'
import httpService from "../../service";
import {Form, Button, Input, Message, Radio,Icon} from "antd";
import UploadImg from './UploadImg'
const FormItem = Form.Item;

class ChangePersonalInfor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:`${window.authInfor.username}`,
            gender:`${window.authInfor.gender}`,
            introduction:`${window.authInfor.introduction}`,
            avatar:`${window.authInfor.avatar}`
        }
    }
    componentDidMount() {
        console.log(window.authInfor.avatar);
        // console.log(this.state.name);
    }

    postInfor = (e) =>{
        httpService.put('user/profile',{
            username:this.state.username,
            introduction:this.state.introduction,
            gender:this.state.gender,
            avatar:this.state.avatar
        }).then(r=>{
            Message.success('修改成功');
            // setTimeout(()=>{window.location.reload();},2000);
        }).catch(reason => {
            console.log(reason);
            Message.error("上传失败")

        })
    };

    changeGender = (e) => {
        this.setState({
            gender: e.target.value,
        })
    };

    changeImg = (filename) => {
        this.setState({
            avatar:filename,
        })
    }

    render() {
        return (
            <div>
                <div style={{marginLeft:'40%'}}>
                    <Form>
                        <FormItem style={{marginLeft:'2%'}}>
                            <UploadImg
                                src={window.authInfor.avatar}
                                changeImg={this.changeImg}
                            />
                        </FormItem>
                        <FormItem>
                            <Radio.Group onChange={this.changeGender} value={this.state.gender}>
                                <Radio value={0}>
                                    女(<Icon type='woman'/>)
                                </Radio>
                                <Radio value={1}>
                                    男(<Icon type='man'/>)
                                </Radio>
                            </Radio.Group>
                        </FormItem>
                    </Form>
                </div>
                <Form>
                    <FormItem>
                        <strong>姓名</strong>
                        <Input
                            onChange={e => {this.setState({username:e.target.value})}}
                        />
                    </FormItem>
                    <FormItem>
                        <strong>个人简介</strong>
                        <Input
                            onChange={e => {this.setState({introduction:e.target.value})}}
                        />
                    </FormItem>
                </Form>
                <Button style={{float:'right',marginBottom:20}} type="primary" onClick={this.postInfor.bind(this)}>保存</Button>

            </div>
        );
    }
}
export default ChangePersonalInfor
