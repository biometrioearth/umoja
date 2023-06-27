import { gql } from '@apollo/client';
import { GraphQLEnumType } from 'graphql';

export const ProjectmanagementDeviceDeviceTypeChoices = new GraphQLEnumType({
  name: 'ProjectmanagementDeviceDeviceTypeChoices',
  values: {
    CAMERA: {
      value: 'CAMERA',
    },
    RECORDER: {
      value: 'RECORDER',
    },
  },
});

export const ProjectmanagementDeviceStatusChoices = new GraphQLEnumType({
  name: 'ProjectmanagementDeviceStatusChoices',
  values: {
    ACTIVE: {
      value: 'ACTIVE',
    },
    INACTIVE: {
      value: 'INACTIVE',
    },
    BROKEN: {
      value: 'BROKEN',
    },
    MISSING: {
      value: 'MISSING',
    },
  },
});

export const ProjectmanagementProjectProjectConfigurationChoices = new GraphQLEnumType({
  name: 'ProjectmanagementProjectProjectConfigurationChoices',
  values: {
    A_1: {
      value: 'A_1',
    },
    A_2: {
      value: 'A_2',
    },
    A_3: {
      value: 'A_3',
    },
  },
});
// PROJECT MUTATION
export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject(
    $title: String!
    $shortname: String!
    $sequenceInterval: Int
    $description: String
    $contacts: String
    $duration: String
    $temporality: String
    $projectConfiguration: ProjectmanagementProjectProjectConfigurationChoices!
    $countries: [ProjectCountries]
  ) {
    createProject(
      title: $title
      shortname: $shortname
      sequenceInterval: $sequenceInterval
      description: $description
      contacts: $contacts
      duration: $duration
      temporality: $temporality
      projectConfiguration: $projectConfiguration
      countries: $countries
    ) {
      id
      title
      shortname
      sequenceInterval
      description
      contacts
      duration
      temporality
      projectConfiguration
      countries {
        name
      }
      errors {
        field
        messages
      }
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      errors {
        field
        messages
      }
      message
    }
  }
`;
// DEVICE MUTATION
export const CREATE_DEVICE_MUTATION = gql`
  mutation CreateDevice(
    $serialNumber: String!
    $deviceType: ProjectmanagementDeviceDeviceTypeChoices!
    $brand: String!
    $status: ProjectmanagementDeviceStatusChoices!
    $additionalIdentifier: String!
  ) {
    createDevice(
      serialNumber: $serialNumber
      deviceType: $deviceType
      brand: $brand
      status: $status
      additionalIdentifier: $additionalIdentifier
    ) {
      serialNumber
      deviceType
      brand
      status
      additionalIdentifier
      errors {
        field
        messages
      }
    }
  }
`;
export const DELETE_DEVICE_MUTATION = gql`
  mutation deleteDevice($id: ID!) {
    deleteDevice(id: $id) {
      id
      errors {
        field
        messages
      }
      message
    }
  }
`;
export const UPDATE_DEVICE_MUTATION = gql`
  mutation updateDevice(
    $id: UUID!
    $serialNumber: String
    $additionalIdentifier: String
    $deviceType: ProjectmanagementDeviceDeviceTypeChoices
    $brand: String
    $status: ProjectmanagementDeviceStatusChoices
  ) {
    updateDevice(
      id: $id
      serialNumber: $serialNumber
      additionalIdentifier: $additionalIdentifier
      deviceType: $deviceType
      brand: $brand
      status: $status
    ) {
      id
      serialNumber
      additionalIdentifier
      deviceType
      brand
      status
      errors {
        field
        messages
      }
    }
  }
`;
