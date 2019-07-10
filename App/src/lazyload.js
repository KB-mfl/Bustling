import React from 'react';
import Loadable from 'react-loadable';
import { Spin, Icon } from 'antd';

const LoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="page-spin" style={{textAlign: 'center', padding: '30px'}}>
                <Spin size="large"/>
            </div>
        );
    } else if (error) {
        return (
            <div style={{textAlign: 'center', padding: 24}}>
                <Icon
                    type="warning"
                    style={{fontSize: 50}}
                />
                <div style={{marginTop: 16}}>页面加载失败</div>
            </div>
        );
    } else {
        return null;
    }
};

export default (loader) => Loadable({
    loader: loader,
    loading: LoadingComponent
});
