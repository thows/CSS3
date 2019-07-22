import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import MenuSider from '../MenuSider'
import BaceContent from '../BaceContent'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import './index.css';

const {Header, Content, Footer} = Layout;


class Index extends Component {
    render() {
        return (
            <Router>
                <Layout style={{display:"flex"}}>
                    <MenuSider/>
                    <BaceContent/>
                </Layout>
            </Router>
        );
    }
}

export default Index;
