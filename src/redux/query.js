import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
  {
    allProjects {
      items {
        id
        updatedAt
        createdAt
        title
        shortname
        projectHash
        sequenceInterval
        description
        country
      }
      pageInfo {
        totalCount
        totalPages
        hasNextPage
        hasPrevPage
        pageSize
        currentPage
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  {
    allUsers {
      items {
        lastLogin
        isSuperuser
        username
        firstName
        lastName
        email
        isStaff
        isActive
        canLogin
      }
      pageInfo {
        totalCount
        totalPages
        hasNextPage
        hasPrevPage
        pageSize
        currentPage
      }
    }
  }
`;
