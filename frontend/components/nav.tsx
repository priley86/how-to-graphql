import React from 'react';
import { MeQueryComponent } from '../generated/apollo-components';
import Link from 'next/link';

type Props = {};

class Nav extends React.PureComponent<Props> {
  render() {
    return (
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <a style={{ float: 'right' }}>
          {/* Due to delayed auth on the server, always query "Me" client side */}
          <MeQueryComponent ssr={false}>
            {({ data }) => {
              if (data && 'me' in data) {
                return data.me && data.me.name;
              }
              return null;
            }}
          </MeQueryComponent>
        </a>
      </nav>
    );
  }
}

export default Nav;
