import React from "react";
import {Card, Avatar} from 'antd';

const {Meta} = Card;

class CardItem extends React.Component {
    render() {

        return <Card
            hoverable
            style={{height:122,}}>
            <Meta style={{marginTop:'10px'}}
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title="标题"
                description="网站描述信息"/>
        </Card>
    }

}

export default CardItem
