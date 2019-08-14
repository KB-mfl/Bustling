import React from 'react'
import { List, Avatar ,Pagination,Icon} from 'antd';
import httpService from '../../../service'
export default class NetPartnerMessage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            start:0,
            end:3,
            pagination: {
                current: 0,
                pageSize: 30,
                total: 0
            },
            data: [{
                title: 'Ant Design Title 0'
            },{
                title: 'Ant Design Title 1',
            }, {
                title: 'Ant Design Title 2',
            }, {
                title: 'Ant Design Title 3',
            }, {
                title: 'Ant Design Title 4',
            }, {
                title: 'Ant Design Title 5',
            }, {
                title: 'Ant Design Title 6',
            }, {
                title: 'Ant Design Title 7',
            }, {
                title: 'Ant Design Title 8',
            },{
                title: 'Ant Design Title 9',
            }]
        }
    }

    componentDidMount() {

    }

    fetchData = () => {
        // let pagination = this.state.pagination;
        // const params = {
        //     offset:(this.state.current-1)*this.state.pageSize,
        //     limit:pagination.pageSize
        // };
        // httpService.get('/').then(r=>{
        //     this.setState({
        //         data:r.data
        //     })
        // })
        // const data = totalData.slice(params.offset+1,params.offset+2+params.limit)
    };

    onChange = (pageNumber,pageSize) => {
        const pagination = this.state.pagination;
        pagination.current = pageNumber;
        pagination.pageSize = pageSize;
        this.setState({
            pagination,
        },function () {
            this.setState({
                start:(pagination.current-1)*pagination.pageSize,
                end:(pagination.current-1)*pagination.pageSize+pagination.pageSize,
            })
        })
    };
    render() {
        const data = this.state.data.slice(this.state.start,this.state.end);
        return(
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="http://localhost:8000/storage/public/zQQguxVYkaBLnwaRBTxTJ5.jpg" />}
                                title={
                                        <a href="https://ant.design">{item.title}</a>
                                }
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
                <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChange} pageSize={3}/>
            </div>
        )
    }
}
