import React from 'react'
import BraftEditor from 'braft-editor'
import {message} from "antd";
import store from 'store'
import 'braft-editor/dist/index.css'

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState:BraftEditor.createEditorState(null),
            submitting:false
        };
        this.changeEditorState = this.props.changeEditorState;
    }


     componentDidMount () {
         const htmlContent = store.get('editorState').editorState;
         console.log(htmlContent);
         this.setState({
             editorState: BraftEditor.createEditorState(htmlContent || null)
         })
    }
    componentWillUnmount = () => {
        if(this.state.submiting){
            return
        }else {
            message.error('请确定保存文章');
        }
    }
    // onchangeEditorState = (editorState) => {
    //     this.setState({ editorState},function () {
    //         const  editorState = this.state.editorState;
    //         const htmlContent = editorState.toRAW();
    //         this.setState({
    //             content:JSON.stringify(htmlContent)
    //         },function () {
    //             this.changeEditorState(this.state.content);
    //         })
    //     })
    // };

    submitContent = () => {
        const rawContent = this.state.editorState.toRAW();
        store.set(('editorState'),{
            editorState:rawContent,
        })
        message.success('保存成功')
    }


    render () {

        const { editorState } = this.state;

        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={this.onchangeEditorState}
                    onSave={this.submitContent}
                />
            </div>
        )

    }

}
