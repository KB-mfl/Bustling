import React from 'react'
import {Layout,Button} from 'antd';
import store from "store";
const { Header, Footer, Content } = Layout;

export default class TouristIndex extends React.Component{
    constructor(props){
        super(props);
    }
    goToLogin = () => {
        window.location.href='/login'
    };


    render() {
        return(
            <div>
                <Layout>
                    <Header style={{backgroundColor:'#bde3ff',padding:0}}>
                        <div style={{float:"right",paddingRight:10}}>
                            {window.role ==='tourist' && <Button
                                onClick={this.goToLogin}
                                type="primary"
                            >
                                登录
                            </Button>}
                        </div>
                    </Header>
                    <Content>
                        这是游客的首页
                    </Content>
                    <Footer>
                        这是游客的底部信息
                    </Footer>
                </Layout>
            </div>
        )
    }
}
