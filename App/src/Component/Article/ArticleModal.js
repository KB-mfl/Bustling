import React from 'react'
import {Button, Form, Input ,Modal,message} from "antd";
import httpService from '../../service'
const {TextArea} = Input;
export default class ArticleModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            auth:this.props.auth,
            visible:false,
            commentValue:'',
        }
    }

    changeComment = (e) => {
        this.setState({
            commentValue:e.target.value
        })
    };

    postComment  = () => {
        httpService.put('/',{
            comment:this.state.commentValue,
        }).then(r=>{
            message.success('评论失败')
        }).catch(err=>{
            console.log(err);
            message.error('评论失败，请再次评论')
        })
    }

    showModal = () =>{
        this.setState({
            visible:true
        })
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return(
            <div>
                <a type="primary" onClick={this.showModal}>
                    回复
                </a>
                <Modal
                    title="添加评论"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form.Item><TextArea rows={4} onChange={this.changeComment} value={this.state.commentValue} placeholder={`请输入你对${this.state.auth}的看法`}/></Form.Item>
                    <Form.Item>
                        <Button onClick={this.postComment} type='primary' style={{left:'75%'}}>确认添加评论</Button>
                    </Form.Item>
                </Modal>
            </div>
        )
    }
}
