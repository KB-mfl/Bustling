import React from 'react'
import TopicalImg from './TopicalImg/TopicalImg'
import {Card, Icon,Radio} from "antd";
import httpService from '../../service'
import {Link} from "react-router-dom";

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articleDta:[],
            articleType:"life",
            total:0
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        httpService.get(`/article/list/:${this.state.articleType}`).then(r=>{
            this.setState({
                articleType:r.data.data,
                total:r.data.total
            })
        })
    };

    changeArticleType = (e)=> {
        this.setState({
            articleType:e.target.value
        },function () {
            this.getData();
        })
    }

    render() {
        const simpleInformation = this.state.articleDta;

        return (
            <div>
                <div>
                    <div style={{left:'30%'}}>
                        <Radio.Group defaultValue="life" buttonStyle="solid" onChange={this.changeArticleType}>
                            <Radio.Button value="life">生活</Radio.Button>
                            <Radio.Button value="sports">运动</Radio.Button>
                            <Radio.Button value="study">学习</Radio.Button>
                            <Radio.Button value="technology">科技</Radio.Button>
                            <Radio.Button value="game">游戏</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div style={{marginTop:40}}>
                        <span style={{fontWeight:'200px',fontSize:'40px'}}>今日资讯</span>
                    </div>
                    {simpleInformation.map((item) =>
                        <Card key={item.key} title={
                            <div>
                                <Link to={`/user/article/${item.id}`}>{item.title}</Link>
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

