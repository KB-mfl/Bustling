import React from 'react'
import httpService from '../../service'
import {Input, Button, message, Card} from "antd";
import TextEditor from "./TextEditor";
const {TextArea} = Input;
export default class WritePaper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            sketch:'',
            content:'',
        }
    }
    componentDidMount() {
        console.log(this);
    }

    changeTitle = (e) => {
        this.setState({
            title:e.target.value
        })
    }

    changeSketch = (e) => {
        this.setState({
            sketch: e.target.value
        })
    }

    changeEditorState = (content) => {
        this.setState({
            content:content
        },function () {
            console.log(this.state.content);
        })
    }

    postPapers = (e) =>{
        const title = this.state.title;
        const sketch = this.state.sketch;
        const content = this.state.content;
        if(!(title && sketch && content)){
            return message.error('请输入对应完整信息');
        }
        httpService.post('/',{
            title:title,
            sketch:sketch,
            content:content
        }).then(r => {
            message.success('上传成功,等待管理员审核......');
        }).catch(e=>{
            message.error('上传失败，请重新上传')
        })
    };

    render() {
        return(
            <div>
                <Card title='我的写作板'>
                    <Input placeholder='请输入你的标题' style={{marginBottom:10}} onChange={this.changeTitle}/>
                    <Input placeholder='请输入你的副标题' style={{marginBottom:10}} onChange={this.changeSketch}/>
                    <TextEditor changeEditorState={this.changeEditorState}/>
                </Card>
                <Button type='primary' onClick={this.postPapers} style={{marginTop:10,float:"right"}}>提交</Button>
            </div>
        )
    }
}
