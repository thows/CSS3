import React from 'react';
import {Layout, Row, Col, Card, Avatar} from "antd";
import {Route, Switch} from "react-router-dom";
import CardItem from "../CardItem";
import NavContent from "../NavContent";

const {Header, Content, Footer} = Layout;

export default class BaseContent extends React.Component {


    render() {
        return (
            <Layout>
                <Content style={{background:"red"}}>
                    <Switch>
                        <Route exact path="/home" component={CardItem}/>
                        <Route path="/about" component={NavContent}/>
                    </Switch>
                </Content>
                {/*<Footer style={{alignContent: 'center', textAlign: 'center'}}>Ant Design ©2018 Created by Ant*/}
                {/*    UED</Footer>*/}
            </Layout>
        )
    }
}


