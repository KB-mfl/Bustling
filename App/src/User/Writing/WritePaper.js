import React from 'react'
import httpService from '../../service'
import {Input, Button, message, Card, Icon, Select} from "antd";
import TextEditor from "./TextEditor";
import store from 'store';
const {TextArea} = Input;
export default class WritePaper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:store.get('title') || null,
            articleType:store.get('type') || null,
            tags:store.get('tags') || [],
            htmlContent:'',
            rawContent:''
        }
    }
    componentDidMount() {
        console.log(this);
    }

    changeTitle = (e) => {
        store.set(('title'),e.target.value);
        this.setState({
            title:e.target.value
        })
    }

    changeEditorState = (htmlContent,rawContent) => {
        this.setState({
            htmlContent:htmlContent,
            rawContent:rawContent
        })
    };

    selectArticleType = (value) =>{
        this.setState({
            articleType:value
        });
        store.set(('type'),value);
    }

    handleChangeTags = (value) => {
        this.setState({
            tags:value
        });
        store.set(('tags'),value);
    };

    postPapers = (e) =>{
        let tagString = '';
        const title = this.state.title;
        const articleType = this.state.articleType;
        const tagsArr = this.state.tags;
        const htmlContent = this.state.htmlContent;
        const rawContent = this.state.rawContent;
        for (let i=0;i<tagsArr.length;i++){
            tagString=tagsArr[i]+'/'+tagString;
        }
        const tags = tagString.substr(0,tagString.length-1);
        if(!(title && tags && articleType && htmlContent && rawContent)){
            return message.error('请确保输入对应完整信息');
        }
        httpService.post('/article/',{
            title:title,
            article_type: articleType,
            tags: tags,
            html_content: htmlContent,
            raw_content: rawContent
        }).then(r => {
            message.success('上传成功,等待管理员审核......');
            store.remove('title');
            store.remove('type');
            store.remove('tags');
            store.remove('editorState');
            setTimeout(()=>window.location.reload(),2000)
        }).catch(e=>{
            message.error('上传失败，请重新上传')
        })
    };

    render() {

        return(
            <div>
                <Card title='我的写作板'>
                    <Input type='text' placeholder='请输入你的标题' onChange={this.changeTitle} style={{marginBottom:10}} defaultValue={this.state.title}/>
                    <div>
                        <Select defaultValue={this.state.articleType||'文章类型'} onChange={this.selectArticleType}>
                            <Select.Option value='sports'>运动</Select.Option>
                            <Select.Option value='life'>生活</Select.Option>
                            <Select.Option value='study'>学习</Select.Option>
                            <Select.Option value='technology'>科技</Select.Option>
                            <Select.Option value='game'>游戏</Select.Option>
                            <Select.Option value='disabled' disabled>开发中...</Select.Option>
                        </Select>
                        <Select
                            mode="tags"
                            placeholder="请选择你的标签"
                            onChange={this.handleChangeTags}
                            style={{ width: '80%' }}
                            defaultValue={this.state.tags||''}
                        >
                        </Select>
                    </div>
                    <TextEditor changeEditorState={this.changeEditorState}/>
                </Card>
                <Button type='primary' onClick={this.postPapers} style={{marginTop:10,float:"right"}}>提交</Button>
            </div>
        )
    }
}
