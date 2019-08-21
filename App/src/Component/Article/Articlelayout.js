import React from 'react'
import httpService from '../../service';
import {message, Tag, Icon, Avatar, Comment, Card,Input,Form,Button,Result} from "antd";
import {Link} from "react-router-dom";
import ArticleModal from "./ArticleModal";
const { TextArea } = Input;
export default class Articlelayout extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            auth:'科比',
            valueComment:'',
            like:100,
            disLike:51,
            isLike:false,
            isDisLike:false,
            comment:'',
            articleData:{
                title : null,
                created_at:null,
                tags:'',
                views:null,
                updated_at:null,
                article_type:null,
                html_content:null,
            },
            isShowFirstComment:false,
            valueFirstComment:'',
            isShowSecondComment:false
        };
        this.articleId = window.location.pathname.split('/')[3];
    }

    componentDidMount() {
        this.fetchArticleData();
    }

    fetchArticleData = () =>{
        httpService.get(`article/detail/${this.articleId}`).then(r=>{
            this.setState({
                articleData:r.data
            },function () {
                this.setState({
                    comment: this.htmlStringChangeToText(this.state.articleData.html_content)
                });
            })
        })
    };

    htmlStringChangeToText =(str) => {
        let dd=str.replace(/<\/?.+?>/g,"");
        let dds=dd.replace(/ /g,"");//dds为得到后的内容
        let ddr=dds.replace(/\r\n/g,"").replace(/\n/g,"").replace(/\s/g,"");
        return ddr;
    }

    onChange = (e)=>{
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

    addLike = () => {
        this.setState({
            isLike:!this.state.isLike,
        },function () {
            console.log(this.state.isLike);
            if(this.state.isLike){
                this.setState({
                    like:this.state.like+1
                })
            }else{
                this.setState({
                    like:this.state.like-1
                })
            }
        })

    };

    showFirstComment =() =>{
        this.setState({
            isShowFirstComment:!this.state.isShowFirstComment
        })
    }

    addDislike =() => {
        this.setState({
            isDisLike:!this.state.isDisLike,
        },function () {
            if(this.state.isDisLike) {
                this.setState({
                    disLike: this.state.disLike+1,
                })
            }else
                this.setState({
                    disLike:this.state.disLike-1
                })

        });
    };

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
                    </div>
                    <hr/>
                    <div>
                        {this.state.comment ? this.state.comment:
                            <Card><Result title='作者太懒了，啥也没写'/></Card>
                        }
                        <span style={{float:"right"}}>上次更新时间:{new Date(this.state.articleData.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{marginTop:30}}>
                        {tags ? tags.map((item,index)=>
                            <Tag color='blue' key={index}>{item}</Tag>
                        ):''}
                    </div>
                </div>
                <Card
                    title={<strong>评论区</strong>}
                    style={{marginTop:30}}
                >
                    <ExampleComment/>
                    <div>
                        <Form.Item>
                            <TextArea rows={4} onChange={this.onChange} value={valueComment} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                添加评论
                            </Button>
                        </Form.Item>
                    </div>
                </Card>
            </div>
        )
    }

}
