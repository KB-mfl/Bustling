import React from 'react'
import { Carousel } from 'antd';
import './TopicalImg.less'
export default class TopicalImg extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Carousel autoplay style={{width:'100%'}}>
                <div>
                    <img src='http://localhost:8000/storage/public/igACzzLe5bNhgiUx8v8Gn8.png' style={{maxWidth:'100%',height:'auto',width:"auto"}}/>
                </div>
                <div>
                    <img src='http://localhost:8000/storage/public/zQQguxVYkaBLnwaRBTxTJ5.jpg' style={{maxWidth:'100%',height:'auto',width:"auto"}}/>
                </div>
                <div>
                    <img src='http://localhost:8000/storage/public/igACzzLe5bNhgiUx8v8Gn8.png' style={{maxWidth:'100%',height:'auto',width:"auto"}}/>
                </div>
                <div>
                    <img src='http://localhost:8000/storage/public/zQQguxVYkaBLnwaRBTxTJ5.jpg' style={{maxWidth:'100%',height:'auto',width:"auto"}}/>
                </div>
            </Carousel>
        )
    }
}
