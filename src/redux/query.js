import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
  query allProjects {
    allProjects {
      pageInfo {
        totalCount
        totalPages
        hasNextPage
        hasPrevPage
        pageSize
        currentPage
      }
      items {
        id
        updatedAt
        createdAt
        title
        shortname
        projectHash
        sequenceInterval
        description
        countries {
          name
        }
        contacts
        duration
        temporality
        projectConfiguration {
          value
          description
        }
      }
    }
  }
`;

export const GET_ALL_DEVICES = gql`
  query allDevices(
    $search: String
    $sort: [DeviceSortTypeInput]
    $filters: DeviceFilterTypeInput
    $page: Int!
    $pageSize: Int!
  ) {
    allDevices(search: $search, sort: $sort, filters: $filters, page: $page, pageSize: $pageSize) {
      pageInfo {
        totalCount
        totalPages
        hasNextPage
        hasPrevPage
        pageSize
        currentPage
      }
      items {
        id
        updatedAt
        createdAt
        brand
        serialNumber
        additionalIdentifier
        deviceType
        status
        currentProject {
          title
          id
        }
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
