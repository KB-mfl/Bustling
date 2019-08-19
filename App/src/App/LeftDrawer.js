import React from 'react'
import { Drawer, Button, Icon} from 'antd';
import LeftMenu from "./LeftMenu";

export default class LeftDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p>朱</p>
                    <p>自</p>
                    <p>强</p>
                </Drawer>
            </div>
        );
    }
}
