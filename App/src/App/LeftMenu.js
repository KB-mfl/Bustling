import React from 'react'
import { Menu, Icon, Layout, Avatar, Badge} from 'antd'
import { withRouter, Link} from 'react-router-dom'
import store from 'store'
import LeftDrawer from "./LeftDrawer";
const { SubMenu } = Menu;

class LeftMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed:store.get('collapsed') || false,
        };
        this.leftMenuList = [
            {key: 'homepage',title:'首页',icon:'key'},
            {key: 'notification', title: '通知', icon: 'notification'},
            {key: 'writing',title:'写作',icon:'read'},
            {key: 'profit', title: '个人中心', icon: 'user'},
        ];
        console.log(props);
    }
    componentWillMount() {
        console.log(window.authIndex);
    }

    getDefaultKey = () => {
        let sider = this.leftMenuList.find(o => this.props.location.pathname.match(o.key)) || {};
        return sider.key;
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout.Sider
                theme="dark"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div>
                    {!this.state.collapsed?
                        <div className="logo">晴空交友论坛</div>
                        :<Avatar style={{marginLeft:22,marginTop:10}} src={ `http://localhost:8000/storage/public/${window.authInfor.avatar}`}/>
                    }
                </div>
                <Menu theme="dark" mode="inline" className="LeftItem" defaultSelectedKeys={[this.getDefaultKey()]}>
                    <Menu.Item key='homepage'>
                        <Link to={`/${window.role}/homepage`}/>
                        <Icon type='key'/>
                        <span>首页</span>
                    </Menu.Item>
                    {window.authIndex===2 && <Menu.Item key='dashboard'>
                        <Link to='/admin/dashboard'/>
                        <Icon type='pie-chart'/>
                        <span>控制中心</span>
                    </Menu.Item>}
                    <SubMenu
                    key='notification'
                    title={
                        <span>
                            <Icon type='notification'/>
                            <span>通知</span>
                        </span>
                    }
                    >
                        <Menu.Item key='netPartnerMessage'><Link to={`/${window.role}/notification/netPartnerMessage`}/><Icon type='twitter'/>网友留言<Badge count={100} style={{ backgroundColor: '#52c41a',boxShadow: '0 0 0 1px #d9d9d9'}}/></Menu.Item>
                        <Menu.Item key='systemMessage'><Link to={`/${window.role}/notification/systemMessage`}/><Icon type='sound'/>系统通知<Badge count={10} style={{boxShadow: '0 0 0 1px #d9d9d9'}}/></Menu.Item>
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
                        <Menu.Item key='writePapers'><Link to={`/${window.role}/writing/writePapers`}/><Icon type='edit'/>立即写作</Menu.Item>
                        <Menu.Item key='viewProcess'><Link to={`/${window.role}/writing/viewProcess`}/><Icon type='clock-circle'/>查看进程</Menu.Item>
                    </SubMenu>
                    }
                    {window.authIndex===2 && <Menu.Item key='setting'>
                        <Link to={`/${window.role}/setting`}/>
                        <Icon type='setting'/>
                        <span>设置</span>
                    </Menu.Item>
                    }
                    <Menu.Item key='profit'>
                        <Link to={`/${window.role}/profit`}/>
                        <Icon type='user'/>
                        <span>个人中心</span>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}
export default withRouter(LeftMenu)

