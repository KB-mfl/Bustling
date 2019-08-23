import React from 'react'
import httpService from '../../service';
import {message, Tag, Icon, Avatar, Comment, Card, Input, Form, Button, Result, Tooltip, Modal} from "antd";
import {Link} from "react-router-dom";
import ArticleModal from "./ArticleModal";
const { TextArea } = Input;
const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);
export default class ArticleLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            visible:false,
            reason:'',
            reviewed:false,
            authProfit:{
                role:{}
            },
            auth:'科比',
            valueComment:'',
            like:100,
            disLike:51,
            isLike:false,
            isDisLike:false,
            comment:'',
            articleData:{
                user_id:null,
                title: null,
                created_at:null,
                tags:'',
                reviewed:0,
                views:null,
                updated_at:null,
                article_type:null,
                html_content:null,
                likes:103,
                unlikes:51,
            },
            isShowFirstComment:false,
            valueFirstComment:'',
            isShowSecondComment:false
        };
        this.articleId = window.location.pathname.split('/')[3];
    }

    componentDidMount() {
        this.fetchArticleData();
        this.fetchIsLike()
    }

    fetchArticleData = () =>{
        httpService.get(`article/detail/${this.articleId}`).then(r=>{
            console.log(r.data);
            this.setState({
                articleData:r.data
            },function () {
                this.setState({
                    comment: this.htmlStringChangeToText(this.state.articleData.html_content)
                });
                this.fetchAuth();
            })
        })
    };

    fetchIsLike = () =>{
        httpService.get(`article/islike/${this.articleId}`).then(r=>{
            if(r.data.islike===1){
                this.setState({
                    isLike:true
                },function () {
                    console.log(this.state.isLike);
                })
            }
            if(r.data.islike===-1){
                this.setState({
                    isDisLike:true
                },function () {
                    console.log(this.state.isLike);
                })
            }

        })
    }

    fetchAuth = () => {
        httpService.get(`user/profile/${this.state.articleData.user_id}`).then(r=>{
            console.log(r.data);
            this.state.authProfit = r.data;
            this.setState({
                authProfit:r.data
            })

        }).catch(err=>{
            message.error('获取作者信息失败')
        })
    }


    htmlStringChangeToText =(str) => {
        let dd=str.replace(/<\/?.+?>/g,"");
        let dds=dd.replace(/ /g,"");//dds为得到后的内容
        let ddr=dds.replace(/\r\n/g,"").replace(/\n/g,"").replace(/\s/g,"");
        return ddr;
    }

    onChangeCommentValue = (e)=>{
        this.setState({
            valueComment:e.target.value
        },function () {
            console.log(this.state.valueComment);
        })
    }

    onChangeValueFirstComment = (value) => {
        this.setState({
            valueFirstComment:value
        })
    };

    postComment = () => {
        console.log(123);
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
            return message.error('请输入拒绝的理由')
        httpService.post('article/reviewed',{
            article_id:this.state.articleData.id,
            reviewed:this.state.reviewed,
            reason:this.state.reason
        }).then(r=>{
            message.success('操作成功');
            this.setState({
                visible:false
            },function () {
                setTimeout(()=>window.history.back(),2000);
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

    showFirstComment =() =>{
        this.setState({
            isShowFirstComment:!this.state.isShowFirstComment
        })
    };

    confirmLike  = () => {
        httpService.post('article/like',{
            like:true,
            article_id: this.articleId
        }).then(r=>{
            this.fetchArticleData();
        })
    };

    confirmDislike = () =>{
        httpService.post('article/like',{
            like:false,
            article_id:this.articleId
        }).then(r=>{
            this.fetchArticleData();
        })
    };

    cancelLike = () => {
        const params = {
            like:true,
            article_id:this.articleId
        }
        httpService.delete('article/unlike',{params}).then(r=>{
            this.fetchArticleData();
        })
    };

    cancelDislike = () => {
        const params = {
            like:false,
            article_id:this.articleId
        }
        httpService.delete('article/unlike',{params}).then(r=>{
            this.fetchArticleData();
        })
    }

    addLike = () => {
        if(this.state.isDisLike){
            this.setState({
                isDisLike:!this.state.isDisLike
            },function () {
                this.cancelDislike()
                this.setState({
                    isLike:!this.state.isLike,
                },function () {
                    if (this.state.isLike){
                        this.confirmLike()
                    }else
                        this.cancelLike()
                })
            })
        }else{
            this.setState({
                isLike:!this.state.isLike,
            },function () {
                if (this.state.isLike){
                    this.confirmLike()
                }else
                    this.cancelLike()
            })
        }
    };

    addDislike =() => {
        if(this.state.isLike){
            this.setState({
                isLike:!this.state.isLike
            },function () {
                this.cancelLike()
                this.setState({
                    isDisLike: !this.state.isDisLike
                }, function () {
                    if (this.state.isDisLike)
                        this.confirmDislike()
                    else
                        this.cancelDislike()
                });
            })
        }else {
            this.setState({
                isDisLike: !this.state.isDisLike
            }, function () {
                if (this.state.isDisLike)
                    this.confirmDislike()
                else
                    this.cancelDislike()
            });
        }
    }

    render() {
        const ExampleComment = () => (
            <Comment
                actions={[
                    <div>
                        <span style={{marginRight:10, userSelect:false}}>喜欢<Icon type='like' onClick={this.addLike} style={{color:(this.state.isLike)?'red':''}}/>({this.state.like})</span>
                        <span style={{marginRight:10, userSelect:false}}>点灭<Icon type='dislike' onClick={this.addDislike} style={{color:(this.state.isDisLike)?'red':''}}/>({this.state.disLike})</span>
                        <ArticleModal auth={this.state.auth}/>
                    </div>
                ]}
                author={<a>科比</a>}
                avatar={
                    <Avatar
                        src="http://localhost:8888/static/images/0f299c5d-9af6-42e5-9752-54f5768205ec.png"
                        alt="kobe"
                    />
                }
                content={
                    <div>
                        <p>
                            湖人总冠军
                        </p>

                    </div>
                }
            >
                <Comment
                    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                    author={<a>詹姆斯</a>}
                    avatar={
                        <Avatar
                            src="http://localhost:8888/static/images/0f299c5d-9af6-42e5-9752-54f5768205ec.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p>
                            科比是我爸爸，你说啥就是啥，湖人总冠军
                        </p>
                    }
                >
                </Comment>
            </Comment>
        );

        const {valueComment} = this.state;
        const tags = this.state.articleData.tags.split('/');
        return(
            <div>
                <div>
                    <div>
                        {this.state.like-this.state.dislike>0?
                            (this.state.like>=100 && this.state.like-2*this.state.dislike>0)?<Tag color="red">精</Tag>:<Tag color="red">良</Tag>
                            :<Tag color='blue'>差</Tag>
                        }
                        {}
                        <strong>
                            {this.state.articleData.title}
                        </strong>
                    </div>
                    <div>
                        <span>{new Date(this.state.articleData.created_at).toLocaleDateString()}</span>
                        <p>
                            <strong>作者:</strong><Link to='/'>{this.state.authProfit.username}</Link>
                            <Tooltip
                                placement="topLeft"
                                title={(
                                    <div>
                                        {this.state.authProfit.role.roleId===2 && <p style={{color:"orange"}}>普通用户</p>}
                                        {this.state.authProfit.role.roleId===1 && <p style={{color:"pink"}}>至尊VIP</p>}
                                        {this.state.authProfit.role.roleId===-1 && '游客'}
                                    </div>
                                )}
                                arrowPointAtCenter>
                                {this.state.authProfit.role.roleId===2 && <Icon component={HeartSvg} style={{color: 'hotpink'}}/>}
                                {this.state.authProfit.role.roleId===1 && <Icon component={HeartSvg} style={{color: 'black'}}/>}
                                {this.state.authProfit.role.roleId===-1 && <Icon component={HeartSvg} style={{color: 'blue'}}/>}
                            </Tooltip>

                        </p>
                    </div>
                    <div>
                        {this.state.comment ?
                            <Card actions={[
                                <Tooltip placement="topLeft" title="设置" arrowPointAtCenter><Icon type="edit" key="edit" /></Tooltip>,
                                <Tooltip placement="topLeft" title="喜欢" arrowPointAtCenter><Icon type='like' onClick={this.addLike} style={{color:(this.state.isLike)?'red':'' ,marginRight:10}}/>{this.state.articleData.likes}</Tooltip>,
                                <Tooltip placement="topLeft" title="点灭" arrowPointAtCenter><Icon type='dislike' onClick={this.addDislike} style={{color:(this.state.isDisLike)?'red':'', marginRight:10}}/>{this.state.articleData.unlikes}</Tooltip>,
                            ]}>
                                <Card.Meta
                                    description={this.state.comment}
                                >
                                </Card.Meta>
                            </Card>:
                            <Card><Result title='作者太懒了，啥也没写'/></Card>
                        }
                        {window.role==='user'&&<span style={{float:"right"}}>上次更新时间:{new Date(this.state.articleData.updated_at).toLocaleDateString()}</span>}
                    </div>
                    <div style={{marginTop:30}}>
                        {tags ? tags.map((item,index)=>
                            <Tag color='blue' key={index}>{item}</Tag>
                        ):''}
                        {(window.role==='admin' && this.state.articleData.reviewed===0)&& <span style={{float:"right"}}>
                            <Button style={{marginRight:10}} onClick={this.showReviewModal} value={1}>通过</Button>
                            <Button onClick={this.showReviewModal} value={-1}>不通过</Button>
                        </span>}
                    </div>
                </div>
                {window.role==='user' &&
                <Card
                    title={<strong>评论区</strong>}
                    style={{marginTop:30}}
                >
                    <ExampleComment/>
                    <div>
                        <Form.Item>
                            <TextArea rows={4} onChange={this.onChangeCommentValue} value={valueComment} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                添加评论
                            </Button>
                        </Form.Item>
                    </div>
                </Card>
                }
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
            </div>
        )
    }

}
