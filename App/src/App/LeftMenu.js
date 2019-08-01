import React from 'react'
import { Menu, Icon, Layout} from 'antd'
import { withRouter} from 'react-router-dom'
import store from 'store'

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

    itemClick = ({item, key}) => {
        window.location.href = '/' + window.role + '/' + key
    };

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
                    <div className="logo">
                        {!this.state.collapsed ? '晴空交友论坛' : '' }
                    </div>
                    <Icon
                        type={this.state.collapsed ? 'align-right' : 'align-left'}
                        className="trigger"
                        onClick={this.controlCollapse}
                    />
                </div>
                <Menu theme="light" mode="inline" className="LeftItem" defaultSelectedKeys={[this.getDefaultKey()]} onClick={this.itemClick}>

                    {this.leftMenuList.map(o =>
                        <Menu.Item key={o.key}>
                            <Icon type={o.icon}/>
                            <span>{o.title}</span>
                        </Menu.Item>)
                    }
                </Menu>
            </Layout.Sider>
        )
    }
}
export default withRouter(LeftMenu)

