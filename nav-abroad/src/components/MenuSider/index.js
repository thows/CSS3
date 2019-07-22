import {Icon, Layout, Menu} from "antd";
import React from "react";

import navItemList from '../../pages/navdata'
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";

const {Sider} = Layout;
const {SubMenu} = Menu;


class MenuSider extends React.Component {

    state = {
        current: '2',
    };

    handleClick = e => {

        this.setState({
            current: e.key,
        });
    };

    render() {
        return <Sider width={300} style={{
            minHeight: '100vh',
            overflow: 'auto',}}>
            <div className="logo">LOGO</div>

            {
                // navItemList.map(item,index)
            }
            <Menu onClick={this.handleClick} theme="dark" mode="inline"
                  defaultSelectedKeys={[this.state.current]}>


                {

                }

                <Menu.Item key="1">
                    <Link to="/home">
                        <Icon type="user"/>
                        <span className="nav-text">热门国家</span></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/about">
                        <Icon type="video-camera"/>
                        <span className="nav-text">南亚</span></Link>
                </Menu.Item>
                <SubMenu key="sub1"
                         title={<span><Icon type="mail"/><span>中东</span></span>}>
                    <Menu.Item key="5">伊朗</Menu.Item>
                    <Menu.Item key="6">埃及</Menu.Item>
                    <Menu.Item key="8">沙特</Menu.Item>
                    <Menu.Item key="7">伊拉克</Menu.Item>
                </SubMenu>


            </Menu>
        </Sider>
    }
}

export default MenuSider


