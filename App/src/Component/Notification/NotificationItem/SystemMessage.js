import React from 'react'
import ChangTags from './ChangeTags'
export default class SystemMessage extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div>
                <ChangTags/>
            </div>
        )
    }
}
