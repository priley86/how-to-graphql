import React, { ReactNode, Component } from 'react';
import { Layout } from 'antd';
import Head from 'next/head';
import Nav from './nav';

const { Footer, Header, Content } = Layout;

type Props = {
  title?: string;
  children: ReactNode;
};

class MainLayout extends Component<Props> {
  render() {
    const { children, title } = this.props;
    return (
      <Layout>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header>
          <Nav />
        </Header>
        <Content style={{ padding: '20px 20px' }}>{children}</Content>
        <Footer>
          <hr />
          <span>I'm here to stay (Footer)</span>
        </Footer>
      </Layout>
    );
  }
}

export default MainLayout;
