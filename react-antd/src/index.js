import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';
import '@alifd/next/reset.scss';
import { Nav, Radio } from '@alifd/next';
const { Item, SubNav } = Nav;


class SiderDemo extends React.Component {
    state = {
        collapsed: false,
        popupAlign: 'follow'
    };

    setValue(popupAlign) {
        this.setState({
            popupAlign
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout fixable className="basic-layout-dark ice-design-layout">
                <Layout.Section>
                    <Layout.Aside>
                        <Nav style={{ height: 400, width: 240 }} mode="popup" popupAlign={this.state.popupAlign} defaultOpenKeys={['sub-nav-2']}>
                            <SubNav key="sub-nav-1"label="Sub Nav 1">
                                <Item key="1">Item 1</Item>
                            </SubNav>
                            <SubNav key="sub-nav-2" label="Sub Nav 2">
                                <Item key="1">Item 1</Item>
                                <Item key="2">Item 2</Item>
                            </SubNav>
                            <SubNav key="sub-nav-3" label="Sub Nav 3">
                                <Item key="1">Item 1</Item>
                                <Item key="2">Item 2</Item>
                                <Item key="3">Item 3</Item>
                            </SubNav>
                            <SubNav key="sub-nav-4" label="Sub Nav 4">
                                <Item key="1">Item 1</Item>
                                <Item key="2">Item 2</Item>
                                <Item key="3">Item 3</Item>
                                <Item key="4">Item 4</Item>
                            </SubNav>
                        </Nav>
1                    </Layout.Aside>
                    <Layout.Main scrollable>
                        1
                    </Layout.Main>
                </Layout.Section>
            </Layout>
        );
    }
}

ReactDOM.render(<SiderDemo/>, document.getElementById('root'));
