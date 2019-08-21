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
            submitting:false
        };
        this.changeEditorState = this.props.changeEditorState;
    }


    componentDidMount () {
        console.log(store.get('editorState'));
        this.setState({
            editorState: BraftEditor.createEditorState(store.get('editorState') || null)
        },function () {
            console.log(this.state.editorState);
        })
    }
    componentWillUnmount = () => {
        if(this.state.submiting){
            return
        }else {
            message.error('请确定保存文章');
        }
    }

    onchangeEditorState = (editorState) => {
        this.setState({ editorState},function () {
            const  editorState = this.state.editorState;
            const htmlContent = editorState.toHTML();
            const rawContent = editorState.toRAW();
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
        store.set('editorState',rawContent);
        message.success('保存成功')
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
