/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { login } from '../../../../redux/authentication/actionCreator';

import CustomAlert from '../../../../components/alert';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BALAM_URL,
  cache: new InMemoryCache(),
});

const ApolloContext = React.createContext(null);
function SignIn({ error }) {
  const history = useNavigate();

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showMessage, setShowMessage] = useState('message');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);

  const handleAlertClose = () => {
    setShowErrorAlert(false);
  };

  useEffect(() => {
    if (error !== null) {
      setShowMessage(error[0].message);
      setShowErrorAlert(true);
      return () => {
        setShowErrorAlert(false);
      };
    }
  }, [error]);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(login(values, () => history('/dashboard')));
    },
    [history, dispatch],
  );

  return (
    <ApolloContext.Provider value={client}>
      <Row justify="center">
        <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
          <div className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
            <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
              <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">Sign in Biometrio</h2>
            </div>
            <div className="px-10 pt-8">
              <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  name="email"
                  rules={[{ message: 'Please input your username or Email!', required: true }]}
                  label="Username or Email Address"
                >
                  <Input
                    placeholder="name@example.com"
                    className="focus:shadow focus:border-primary focus:border-2 hover:border-2 hover:border-primary"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ message: 'Please enter a password!', required: true }]}
                >
                  <Input.Password
                    placeholder="*******"
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
      {/* {showSuccessAlert && <CustomAlert type="success" message={showMessage} onClose={handleAlertClose} />} */}
      {showErrorAlert && <CustomAlert type="error" message={showMessage} onClose={handleAlertClose} />}
    </ApolloContext.Provider>
  );
}
const mapStateToProps = (state) => ({
  error: state.auth.error, // Assuming your error state is stored under 'login.error'
});
export default connect(mapStateToProps)(SignIn);
