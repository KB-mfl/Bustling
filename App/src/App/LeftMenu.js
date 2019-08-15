import React from 'react'
import { Menu, Icon, Layout, Avatar, Badge} from 'antd'
import { withRouter, Link} from 'react-router-dom'
import store from 'store'
const { SubMenu } = Menu;

class LeftMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed:store.get('collapsed') || false,
        };
        this.leftMenuList = [
            {key: 'homepage',title:'首页',icon:'key'},
            {key: 'dashboard', title: '控制中心', icon: 'pie-chart'},
            {key: 'notification', title: '通知', icon: 'notification'},
            {key: 'writing',title:'写作',icon:'read'},
            {key: 'profit', title: '个人中心', icon: 'user'},
        ];
        console.log(props);
    }
    componentWillMount() {
        this.isRole();
    }

    getDefaultKey = () => {
        let sider = this.leftMenuList.find(o => this.props.location.pathname.match(o.key)) || {};
        return sider.key;
    };

    isRole = () =>{
        const admin ={
            key:'manage',
            title:'设置',
            icon:'setting'
        };
        if (window.auth===0){
            this.leftMenuList.splice(3,1);
            this.leftMenuList.push(admin);
        }
        // console.log(this.leftMenuList);
    };

    // itemClick = ({item, key}) => {
    //     window.location.href = '/' + window.role + '/' + key
    // };

    controlCollapse = () => {
        this.setState({
            collapsed:!this.state.collapsed,
        });
        store.set('collapsed',!this.state.collapsed);
        console.log(this.state.collapsed);
    };
    render() {
        return (
            <Layout.Sider
                theme="light"
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
            >
                <div>
                    {!this.state.collapsed?
                        <div className="logo">晴空交友论坛</div>
                        :<Avatar style={{marginLeft:20,marginTop:10}} src={ `http://localhost:8000/storage/public/${window.authInfor.avatar}`}/>
                    }
                    <Icon
                        type={this.state.collapsed ? 'align-right' : 'align-left'}
                        className="trigger"
                        onClick={this.controlCollapse}
                    />
                </div>
                <Menu theme="light" mode="inline" className="LeftItem" defaultSelectedKeys={[this.getDefaultKey()]}>
                    {/*{this.leftMenuList.map(o =>*/}
                    {/*    <Menu.Item key={o.key}>*/}
                    {/*        <Link to={`/user/${o.key}`}/>*/}
                    {/*        <Icon type={o.icon}/>*/}
                    {/*        <span>{o.title}</span>*/}
                    {/*    </Menu.Item>)*/}
                    {/*}*/}
                    <Menu.Item key='homepage'>
                        <Link to='/user/homepage'/>
                        <Icon type='key'/>
                        <span>首页</span>
                    </Menu.Item>
                    <Menu.Item key='dashboard'>
                        <Link to='/user/dashboard'/>
                        <Icon type='pie-chart'/>
                        <span>控制中心</span>
                    </Menu.Item>
                    <SubMenu
                    key='notification'
                    title={
                        <span>
                            <Icon type='notification'/>
                            <span>通知</span>
                        </span>
                    }
                    >
                        <Menu.Item key='netPartnerMessage'><Link to='/user/notification/netPartnerMessage'/><Icon type='twitter'/>网友留言<Badge count={100} style={{ backgroundColor: '#52c41a',boxShadow: '0 0 0 1px #d9d9d9'}}/></Menu.Item>
                        <Menu.Item key='systemMessage'><Link to='/user/notification/systemMessage'/><Icon type='sound'/>系统通知<Badge count={10} style={{boxShadow: '0 0 0 1px #d9d9d9'}}/></Menu.Item>
                    </SubMenu>
                    {window.authIndex ===1 &&
                    <SubMenu
                        key='writing'
                        title={
                            <span>
                                <Icon type='read'/>
                                <span>写作</span>
                            </span>
                        }
                    >
                        <Menu.Item key='writePapers'><Link to='/user/writing/writePapers'/><Icon type='edit'/>立即写作</Menu.Item>
                        <Menu.Item key='viewProcess'><Link to='/user/writing/viewProcess'/><Icon type='clock-circle'/>查看进程</Menu.Item>
                    </SubMenu>
                    }
                    {window.authIndex===0 && <Menu.Item key='manage'>
                        <Link to='/user/manage'/>
                        <Icon type='setting'/>
                        <span>设置</span>
                    </Menu.Item>
                    }
                    <Menu.Item key='profit'>
                        <Link to='/user/profit'/>
                        <Icon type='user'/>
                        <span>个人中心</span>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}
export default withRouter(LeftMenu)

