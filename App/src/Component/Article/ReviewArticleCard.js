import React from 'react'
import {Button, Card, Modal, Tag,Input, message} from "antd";
import {Link} from "react-router-dom";
import httpService from '../../service'
const {TextArea} = Input
export default class ReviewArticleCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            articleData:this.props.paper,
            visible:false,
            reason:'',
            reviewed:false
        }
    }
    componentDidMount() {
    }

    showReviewModal = (e) => {
        if(e.target.value==='1'){
            this.setState({
                reviewed:true
            })
        }
        this.setState({
            visible: true,
        })
    };


    getConfirmReason = (e) => {
        this.setState({
            reason:e.target.value,
        });
    };

    confirmArticle = () =>{
        if(!(this.state.reviewed||this.state.reason))
            return message.error('请输入拒绝的理由');
        httpService.post('article/reviewed',{
            article_id:this.state.articleData.id,
            reviewed:this.state.reviewed,
            reason:this.state.reason
        }).then(r=>{
            message.success('操作成功');
            this.setState({
                visible:false
            })
        }).catch(err=>{
            message.error('操作失败')
        })
    };

    cancelArticle = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {articleData} =  this.state;
        const tags = this.state.articleData.tags.split('/');
        return(
            <Card
            title={(
                <span><Link to={`/admin/article/${articleData.id}`}>作者:{articleData.title}</Link></span>
            )}
            >
                {tags.map((o,index)=>(
                    <Tag key={index} color='red'>{o}</Tag>
                ))}
                <div style={{float:"right"}}>
                    <Button style={{marginRight:10}} onClick={this.showReviewModal} value={1}>通过</Button>
                    <Button onClick={this.showReviewModal} value={-1}>不通过</Button>
                </div>
                <Modal
                title='确认窗口'
                visible={this.state.visible}
                onOk={this.confirmArticle}
                onCancel={this.cancelArticle}
                okText="确认"
                cancelText="取消"
                >
                    <div>
                        <p>你确定这样操作？</p>
                        <TextArea
                            onChange={this.getConfirmReason}
                            placeholder='请写下你的理由'
                        >
                        </TextArea>
                    </div>
                </Modal>
            </Card>
        )
    }

}
