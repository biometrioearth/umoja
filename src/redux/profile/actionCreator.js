/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
// import { gql, useQuery } from '@apollo/client';
import actions from './actions';
import { GET_ALL_USERS } from '../query';

const {
  profileUsersBegin,
  profileUsersSuccess,
  profileUsersErr,
  profileFriendsBegin,
  // profileFriendsSuccess,
  profileFriendsErr,
  postDataBegin,
  postDataSuccess,
  postDataErr,
} = actions;

const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(profileUsersBegin());
      const response = await fetch(process.env.REACT_APP_BALAM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
              query {
                ${GET_ALL_USERS}
              }
            `,
        }),
      });

      const { data, errors } = await response.json();
      if (errors) {
        throw new Error(errors[0].message);
      }

      const { allProjects } = data;
      dispatch(profileUsersSuccess(allProjects));
    } catch (error) {
      dispatch(profileUsersErr(error.message));
    }
  };
};

const profileFriendsChangeStatus = () => {
  return async (dispatch) => {
    try {
      dispatch(profileFriendsBegin());
      // initialState.map((friend) => {
      //   if (friend.key === key) {
      //     return friend.status ? (friend.status = false) : (friend.status = true);
      //   }
      //   return dispatch(profileFriendsSuccess(initialState));
      // });
    } catch (err) {
      dispatch(profileFriendsErr(err));
    }
  };
};

const submitPost = (data) => {
  return async (dispatch) => {
    try {
      dispatch(postDataBegin());
      dispatch(postDataSuccess(data));
    } catch (err) {
      dispatch(postDataErr(err));
    }
  };
};

const likeUpdate = (data, key) => {
  return async (dispatch) => {
    try {
      dispatch(postDataBegin());
      data.map((post) => {
        if (post.postId === key) {
          return (post.like += 1);
        }
        return dispatch(postDataSuccess(data));
      });
    } catch (err) {
      dispatch(postDataErr(err));
    }
  };
};

const commentUpdate = (data, key, comment) => {
  return async (dispatch) => {
    try {
      dispatch(postDataBegin());
      data.map((post) => {
        if (post.postId === key) {
          return (post.comment = [
            ...post.comment,
            {
              time: new Date().getTime(),
              from: 'David Warner',
              text: comment,
            },
          ]);
        }
        return dispatch(postDataSuccess(data));
      });
    } catch (err) {
      dispatch(postDataErr(err));
    }
  };
};

const postDelete = (data, key) => {
  return async (dispatch) => {
    try {
      dispatch(postDataBegin());
      const posts = data.filter((post) => {
        return post.postId !== key;
      });
      return dispatch(postDataSuccess(posts));
    } catch (err) {
      return dispatch(postDataErr(err));
    }
  };
};

export { profileFriendsChangeStatus, submitPost, likeUpdate, commentUpdate, postDelete, fetchAllUsers };
