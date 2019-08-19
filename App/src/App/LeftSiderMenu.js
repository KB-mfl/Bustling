import React from 'react'
import LeftDrawer from "./LeftDrawer";

export default class LeftSiderMenu extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <LeftDrawer/>
            </div>
        )
    }

}
