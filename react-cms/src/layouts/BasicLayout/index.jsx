import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Aside from './components/Aside';
import MainRoutes from './MainRoutes';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout fixable className="basic-layout-dark ice-design-layout">
        <Layout.Section>
          <Layout.Aside>
            <Aside />
          </Layout.Aside>
          <Layout.Main scrollable>
            <MainRoutes />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
