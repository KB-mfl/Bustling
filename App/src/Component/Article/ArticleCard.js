import React from 'react'
import {Card, Icon, Avatar, Tag,Tooltip} from "antd";
import {Link} from "react-router-dom";

export default class ArticleCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tags:[]
        }
    }
    componentDidMount() {
        this.setState({
            tags:this.props.paper.tags.split("/")
        })
    }

    render() {
        const title = (
            <div>
                <Link to={`/user/article/${this.props.paper.id}`}>{`标题:${this.props.paper.title}`}</Link>
            </div>
        );
        const paperTags=(
            this.state.tags.map((o,index)=>(
                <Tag color='red' key={index}>{o}</Tag>
            ))
        )
        return (
            <Card
            style={{width:'100%'}}
            title= {(
                <span>{this.props.paper.article_type}{this.props.paper.reviewed?<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>:<Icon type="loading"/>}</span>
            )}
            >
                <Card.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={title}
                    description={paperTags}
                >
                </Card.Meta>
                <div style={{marginTop:40}}>
                    <p>
                        创建于:{ new Date(this.props.paper.created_at).toDateString() }
                    </p>
                    <p>
                        上次更新时间:{ new Date(this.props.paper.updated_at).toDateString() }
                    </p>
                </div>
                <div style={{float:'right'}}>
                    <Tooltip title="观看数">
                        <Icon type="eye" style={{ marginRight:"5px" }} />
                    </Tooltip>
                    { this.props.paper.views }
                </div>
            </Card>
        )
    }
}
