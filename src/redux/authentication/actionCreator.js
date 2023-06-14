import Cookies from 'js-cookie';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      // Call the mutation function with the form values
      const response = await fetch(process.env.REACT_APP_BALAM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation {
                tokenAuth(
                    username: "${values.email}",
                    password: "${values.password}"
                ) {
                    token
                }
            }`,
        }),
      });
      // Handle success case
      // ...

      const data = await response.json();
      if (data && data.errors) {
        // Handle error messages
        dispatch(loginErr(data.errors));
      } else {
        localStorage.setItem('authData', data.data.tokenAuth.token);
        Cookies.set('access_token', data.data.tokenAuth.token);
        Cookies.set('logedIn', true);
        dispatch(loginSuccess(true));
        callback();
      }
    } catch (error) {
      // Handle error case
      dispatch(loginErr(error));
    }
  };
};

const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('logedIn');
      Cookies.remove('access_token');
      localStorage.removeItem('authData');
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, loginErr, loginSuccess };
