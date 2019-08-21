import React from 'react'
import TopicalImg from './TopicalImg/TopicalImg'
import {Card, Icon,Radio,Result} from "antd";
import httpService from '../../service'
import {Link} from "react-router-dom";
import ArticleCard from "../Article/ArticleCard";

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            t0tal:0,
            articleData:[],
            articleType:"life",
            total:0
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        const params = {
            offset: (this.state.currentPage - 1) * 4,
            limit: 4,
        };
        httpService.get(`/article/list/${this.state.articleType}`,{params}).then(r=>{
            console.log(r.data.articles)
            this.setState({
                articleData:r.data.articles,
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
                    {this.state.articleData ? this.state.articleData.map((item) =>
                        <ArticleCard paper={item} key={item.id}/>
                    ):<Card>
                        <Result title='该版块暂未发表文章'/>
                    </Card>}
                </div>
            </div>

        )
    }
}

