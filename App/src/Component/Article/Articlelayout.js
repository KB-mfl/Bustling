import React from 'react'
import httpService from '../../service';
import {message, Tag, Icon, Avatar, Comment, Card} from "antd";
import {Link} from "react-router-dom";

export default class Articlelayout extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            isLike:false,
            data:null
        };
        this.articleId = window.location.pathname.split('/')[3];
    }

    componentDidMount() {
        //这里获取文章以及评论
        // httpService.get('/').then(r=>{
        //     this.setState({
        //         data: r.data
        //     })
        // }).catch(err=>{
        //     message.error('获取文章失败');
        // })
    }

    postComment = () => {
        console.log(123);
    }

    addLike = () => {
        this.setState({
            isLike:!this.state.isLike
        })
        console.log('我点赞了');

    };

    addDislike =() => {
        console.log('傻逼');
    };

    render() {
        const data ={
            auth:'朱自强',
            title:'这是第一篇文章',
            content:
                '朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特' +
                '朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特' +
                '朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特朱自强最喜欢的球星是科比布莱恩特',
            time:'2019-01-09 11:51:51',
            like:100,
            dislike:51,
            read:1000,
            tags:[{key:1,tag:'篮球',url:'https://nba.hupu.com/'},{key:2,tag:'科比',url:'https://nba.hupu.com/'},{key:3,tag:'nba',url:'https://nba.hupu.com/'},{key:4,tag:'唱',url:'https://www.bilibili.com/video/av50768383?from=search&seid=8869599899048816890'},{key:'5',tag:'rap',url:'https://www.bilibili.com/video/av50768383?from=search&seid=8869599899048816890'},{key:6,tag:'跳',url:'https://www.bilibili.com/video/av50768383?from=search&seid=8869599899048816890'}]
        };


        const ExampleComment = () => (
            <Comment
                actions={[
                    <div>
                        <span style={{marginRight:10}}>喜欢<Icon type='like' onClick={this.addLike} style={{color:(this.state.isLike)?'red':''}}/></span>
                        <span style={{marginRight:10}}>点灭<Icon type='dislike' onClick={this.addDislike}/></span>
                        <span key="comment-nested-reply-to" onClick={this.postComment}>Reply to</span>
                    </div>
                ]}
                author={<a>科比</a>}
                avatar={
                    <Avatar
                        src="http://localhost:8000/storage/public/zQQguxVYkaBLnwaRBTxTJ5.jpg"
                        alt="kobe"
                    />
                }
                content={
                    <p>
                       湖人总冠军
                    </p>
                }
            >
                <Comment
                    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                    author={<a>詹姆斯</a>}
                    avatar={
                        <Avatar
                            src="http://localhost:8000/storage/public/zQQguxVYkaBLnwaRBTxTJ5.jpg"
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


        return(
            <div>
                <div>
                    <div>
                        {data.like-data.dislike>0?
                            (data.like>=100 && data.like-2*data.dislike>0)?<Tag color="red">精</Tag>:<Tag color="red">良</Tag>
                            :<Tag color='blue'>差</Tag>
                        }
                        {}
                        <strong>{data.title}</strong>
                    </div>
                    <div>
                        <span>{data.time}</span>
                        <span style={{marginLeft:20}}><Link to={`/user/visit/${data.auth}`}>{data.auth}</Link></span>
                    </div>
                    <hr/>
                    <div>
                        {data.content}
                    </div>
                    <div style={{marginTop:30}}>
                        {data.tags.map(item=>
                            <Tag color='blue' key={item.key}><a href={item.url}>{item.tag}</a></Tag>
                        )}
                    </div>
                </div>
                <Card
                    title={<strong>评论区</strong>}
                    style={{marginTop:30}}
                >
                    <ExampleComment/>
                </Card>
            </div>
        )
    }

}
