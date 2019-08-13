import {Drawer, Button, Icon} from 'antd';
import {Link} from "react-router-dom";
import React from "react";
export default class ChangeTags extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button onClick={this.showDrawer}>
                    Open
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p>
                        <Button style={{marginRight:10}}><Link to='/user/notification/netPartnerMessage'><Icon type='twitter'/>网友留言</Link></Button>
                        <Button style={{marginRight:10}}><Link to='/user/notification/systemMessage'><Icon type='sound'/>系统消息</Link></Button>
                    </p>
                </Drawer>
            </div>
        );
    }
}
