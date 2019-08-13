import React from 'react'
import {Card,Icon,Popover,message} from "antd";
import httpService from '../../service'
export default class ViewProcess extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        httpService.get('').then(r=>{
            // const paper = r.data
        }).catch(e=>{
            message.error('获取文章失败');
        })
    }

    render() {
        const Symbol = (
        <div>
            <p>审核中<Icon type='loading'/></p>
            <p>完成审核<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/></p>
        </div>
        );
        const papers = [{
            key:'title1',
            title:'标题1',
            sketch:'副标题1',
            content:'内容1',
            process:0
        },{
            key:'title2',
            title:'标题2',
            sketch:'副标题2',
            content:'内容2',
            process:'1'
        }];
        const title = (
            <div>
                文章审核情况<Popover content={Symbol}><Icon type='question-circle'/></Popover>
            </div>
        )
        return(
            <Card
                title={title}
            >
                {papers.map(o=>
                    <Card
                    title={o.title}
                    key={o.key}
                    >
                        <p style={{marginRight:10}}>{o.sketch}</p>
                        {o.process?<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>:<Icon type="loading"/>}
                    </Card>
                )}
            </Card>
        )
    }
}
