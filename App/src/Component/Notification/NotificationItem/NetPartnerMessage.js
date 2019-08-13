import React from 'react'
import { List, Avatar ,Pagination} from 'antd';
import httpService from '../../../service'
import {Link} from "react-router-dom";

export default class NetPartnerMessage extends React.Component{
    constructor(props) {
        super(props);
        const page =window.location.pathname.split('/')[4]||1;
        this.state = {
            pagination:{
                current:page,
                pageSize:30,
                total:0
            },
        }

    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        let pagination = this.state.pagination;
        const params = {
            offset:(this.state.current-1)*this.state.pageSize,
            limit:pagination.pageSize
        }
        httpService.get('/').then(r=>{
            this.setState({
                data:r.data
            })
        })
    }

    onChange = (pageNumber,pageSize) => {
        const pagination = this.state.pagination;
        pagination.current = pageNumber;
        pagination.pageSize = pageSize;
        window.location.href =`/user/notification/netPartnerMessage/${pageNumber}`
    };
    render() {
        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ];
        return(
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="http://localhost:8000/storage/public/zQQguxVYkaBLnwaRBTxTJ5.jpg" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
                <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChange} pageSize={2}/>
            </div>
        )
    }
}
