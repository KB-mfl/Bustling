import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: '',
            content:''
        };
        this.changeEditorState = this.props.changeEditorState;
    }


     componentDidMount () {
        //获取已经发表的文章，并重新编辑
    }
    onchangeEditorState = (editorState) => {
        this.setState({ editorState},function () {
            const  editorState = this.state.editorState;
            const htmlContent = editorState.toHTML();
            this.setState({
                content:JSON.stringify(htmlContent)
            },function () {
                this.changeEditorState(this.state.content);
            })
        })
    };


    render () {

        const { editorState } = this.state.editorState;

        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={this.onchangeEditorState}
                />
            </div>
        )

    }

}
