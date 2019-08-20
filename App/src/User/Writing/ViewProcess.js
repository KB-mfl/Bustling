import React from 'react'
import {Card, Icon, Popover, message, Pagination, Tag,Radio} from "antd";
import httpService from '../../service'
import ArticleCard from "../../Component/Article/ArticleCard";
export default class ViewProcess extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            papers :[],
            currentPage:1,
            total:0,
            reviewed: false,
        }
    }

    componentDidMount() {
        this.getArticles()
    }



    getArticles = () => {
        const params = {
            offset: (this.state.currentPage - 1) * 5,
            limit: 5,
            reviewed: this.state.reviewed,
        }
        httpService.get(`article/self_list/${window.userId}`,{params}).then(r=>{
            this.setState({
                papers:r.data.data,
                total:r.data.total
            },function () {
                console.log(r.data)
            });
        }).catch(e=>{
            message.error('获取文章失败');
        })
    }

    changePage = (pageNum) => {
        this.setState({currentPage: pageNum}, function() {
            this.getArticles();
        })
    }


    render() {

        const Symbol = (
        <div>
            <p>审核中<Icon type='loading'/></p>
            <p>完成审核<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/></p>
        </div>
        );
        const title = (
            <div>
                文章审核情况<Popover content={Symbol}><Icon type='question-circle'/></Popover>
            </div>
        )
        return(
            <div>
                <Radio.Group
                    defaultValue={false}
                    buttonStyle="solid"
                    onChange={ e => { this.setState({reviewed:e.target.value}, function(){this.getArticles()}) } } >
                    <Radio.Button value={false} >审核中</Radio.Button>
                    <Radio.Button value={true} >已通过</Radio.Button>
                </Radio.Group>
                <Card
                    title={title}
                >
                    { this.state.papers.map((item)=>(
                        <ArticleCard  key={item.id} paper={item}/>
                        )
                    )}
                </Card>
                <Pagination
                    className="pagination"
                    defaultCurrent={1}
                    onChange={ this.changePage }
                    pageSize={ 7 }
                    total={ this.state.total }
                />
            </div>
        )
    }
}
