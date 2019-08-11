import React from 'react';
import { Row, Col, Button, Form, Input, Tooltip } from 'antd';
import {
  LoginUserMutationComponent,
  AuthPayload
} from '../generated/apollo-components';
import withApolloClient from '../utils/with-apollo-client';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/auth';
import redirect from '../utils/redirect';

type Props = {
  apolloClient: any;
};
const initialState = { email: '', password: '', message: '' };
type State = typeof initialState;

class LoginUser extends React.Component<Props> {
  state: State = initialState;

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { apolloClient } = this.props;
    const authToken = getAuthToken();

    return (
      <LoginUserMutationComponent>
        {loginUser => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              loginUser({
                variables: { ...this.state }
              })
                .then(result => {
                  const authPaylod = (result as any).data.login as AuthPayload;
                  setAuthToken(authPaylod.token);

                  // resets and forces other apollo client queries to refetch
                  // include `MeQueryDocument` in the nav
                  apolloClient.resetStore().then(() => {
                    redirect({}, '/');
                  });

                  this.setState({
                    email: '',
                    password: '',
                    message: `Successfully logged in ${authPaylod.user.name}.`
                  });
                })
                .catch(() => {
                  this.setState({
                    email: '',
                    password: '',
                    message: 'Error logging in user.'
                  });
                });
            }}
          >
            <Row>
              <Col span={6}>
                <Form.Item>
                  <Input
                    placeholder="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Input
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Button htmlType="submit">Login User</Button>
                </Form.Item>
              </Col>
            </Row>
            {(authToken || this.state.message) && (
              <Row>
                <Col span={6}>
                  <Form.Item>{this.state.message}</Form.Item>
                </Col>
                {authToken && (
                  <Col span={6}>
                    <Tooltip placement="top" title={authToken}>
                      <Button>Show Token</Button>
                    </Tooltip>
                  </Col>
                )}
                {authToken && (
                  <Col span={6}>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        removeAuthToken();
                        apolloClient.resetStore().then(() => {
                          redirect({}, '/');
                        });
                        this.setState({
                          email: '',
                          password: '',
                          message: ''
                        });
                      }}
                    >
                      Logout User
                    </Button>
                  </Col>
                )}
              </Row>
            )}
          </Form>
        )}
      </LoginUserMutationComponent>
    );
  }
}

export default withApolloClient(LoginUser);
