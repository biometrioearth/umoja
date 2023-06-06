import React, { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Auth0Lock } from 'auth0-lock';
import { login } from '../../../../redux/authentication/actionCreator';
import { auth0options } from '../../../../config/auth0';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();

  const lock = new Auth0Lock(clientId, domain, auth0options);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(login(values, () => history('/dashboard')));
    },
    [history, dispatch],
  );

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error) => {
      if (error) {
        return;
      }

      handleSubmit();
      lock.hide();
    });
  });

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <div className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">Sign in Biometrio</h2>
          </div>
          <div className="px-10 pt-8 pb-6">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ message: 'Please input your username or Email!', required: false }]}
                initialValue="ninjadash@dm.com"
                label="Username or Email Address"
              >
                <Input
                  placeholder="name@example.com"
                  className="focus:shadow focus:border-primary focus:border-2 hover:border-2 hover:border-primary"
                />
              </Form.Item>
              <Form.Item name="password" initialValue="123456" label="Password">
                <Input.Password
                  placeholder="Password"
                  className="focus:shadow-none focus:border-primary focus-within:border-primary active:border-primary focus:border-2 hover:border-2 hover:border-primary"
                />
              </Form.Item>
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <NavLink className=" text-primary font-medium text-13" to="/forgotPassword">
                  Forgot password?
                </NavLink>
              </div>
              <Form.Item>
                <Button
                  className="w-full h-12 p-0 text-white border-primary bg-primary hover:bg-green-900  my-6 text-sm rounded-full font-medium"
                  htmlType="submit"
                  size="large"
                >
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SignIn;
