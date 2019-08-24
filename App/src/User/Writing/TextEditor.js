import React from 'react'
import BraftEditor from 'braft-editor'
import {Input, message} from "antd";
import store from 'store'
import 'braft-editor/dist/index.css'

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState:undefined,
            submitting:false,
            content:false,
            isNeedSave:false
        };
        this.changeEditorState = this.props.changeEditorState;
        this.editorStateIsEmpty = this.props.editorStateIsEmpty
    }


    componentDidMount () {
        console.log(this.state.submitting);
        this.setState({
            editorState: BraftEditor.createEditorState(store.get('editorState') || null)
        })
    }
    componentWillUnmount = () => {
        if(this.state.submitting){//未按保存
            return
        }else {
            if(this.state.content&&this.state.isNeedSave){//有text内容且需要保存
                return  message.error('请确定保存文章');
            }else
                return
        }
    }

    onchangeEditorState = (editorState) => {
        if (editorState.isEmpty()){
            this.setState({
                content:false
            })
            return this.editorStateIsEmpty(this.state.content);
        }
        this.setState({editorState,content:true},function () {
            this.editorStateIsEmpty(this.state.content);
            const  editorState = this.state.editorState;
            const htmlContent = editorState.toHTML();
            const rawContent = editorState.toRAW();
            if(rawContent!==store.get('editorState'))
                this.setState({
                    isNeedSave: true
                });
            this.setState({
                htmlContent:htmlContent,
                rawContent:rawContent,

            },function () {
                this.changeEditorState(this.state.htmlContent,this.state.rawContent);
            })
        })
    };

    submitContent = () => {
        const rawContent = this.state.editorState.toRAW();
        if(!store.get('editorState'))
            message.success('保存成功');
        store.set('editorState',rawContent);
        this.setState({
            submitting:true
        })
    };



    render () {
        return (
            <div className="my-component">
                <BraftEditor
                    value={this.state.editorState}
                    onChange={this.onchangeEditorState}
                    onSave={this.submitContent}
                />
            </div>
        )

    }

}
