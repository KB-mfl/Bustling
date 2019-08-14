import React from 'react'
import TopicalImg from './TopicalImg/TopicalImg'
import {Card, Icon} from "antd";
import {Link} from "react-router-dom";

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const simpleInformation = [{
            key:'title1',
            title:'标题1',
            auth:'朱自强',
            time:"2019-01-09 11:51:51",
            articleId:'title1',
            sketch:'这是对内容作出简短介绍的副标题1',
            like:101,
            dislike:30
        },{
            key:'title2',
            title:'标题2',
            auth:'朱紫玲',
            time:"2019-01-09 11:49:25",
            articleId:'title2',
            sketch:'这是对内容作出简短介绍的副标题2',
            like:101,
            dislike:30
        }];

        return (
            <div>
                <div style={{width:'100%',height:200}}>
                    <TopicalImg/>
                </div>
                <div>
                    <div style={{marginTop:40}}>
                        <span style={{fontWeight:'200px',fontSize:'40px'}}>今日资讯</span>
                    </div>
                    {simpleInformation.map((item) =>
                        <Card key={item.key} title={
                            <div>
                                <Link to={`/user/article/${item.articleId}`}>{item.title}</Link>
                                <span style={{fontSize:15,marginLeft:'85%'}}>作者：<a href='/'>{item.auth}</a></span>
                            </div>
                        }>
                            <div>
                                {item.sketch}
                            </div>
                            <div style={{marginTop:10,marginBottom:5,marginLeft:'85%'}}>
                                <p>{item.time}</p>
                                <Icon type='like' style={{marginLeft:20}}/>{item.like}
                                <Icon type='dislike' style={{marginLeft:20}}/>{item.dislike}
                            </div>
                        </Card>
                    )}
                </div>
            </div>

        )
    }
}

