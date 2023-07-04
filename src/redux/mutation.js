import { gql } from '@apollo/client';
import { GraphQLEnumType, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

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

export const SortInputTypeEnum = new GraphQLEnumType({
  name: 'SortInputTypeEnum',
  values: {
    ASC: {
      value: 'ASC',
    },
    DESC: {
      value: 'DESC',
    },
  },
});
export const ProjectFieldEnum = new GraphQLEnumType({
  name: 'ProjectFieldEnum',
  values: {
    countries: {
      value: 'countries',
      name: 'countries',
    },
    title: {
      value: 'title',
      name: 'title',
    },
    shortname: {
      value: 'shortname',
    },
    project_configuration: {
      value: 'project_configuration',
    },
    temporality: {
      value: 'temporality',
    },
    duration: {
      value: 'duration',
    },
  },
});
export const InputTypeEnum = new GraphQLEnumType({
  name: 'InputTypeEnum',
  values: {
    Int: {
      value: 'Int',
    },
    Float: {
      value: 'Float',
    },
    String: {
      value: 'String',
    },
    Boolean: {
      value: 'Boolean',
    },
    Date: {
      value: 'Date',
    },
    Time: {
      value: 'Time',
    },
    DateTime: {
      value: 'DateTime',
    },
  },
});
export const SearchOperatorEnum = new GraphQLEnumType({
  name: 'SearchOperatorEnum',
  values: {
    eq: {
      value: 'eq',
    },
    neq: {
      value: 'neq',
    },
    gt: {
      value: 'gt',
    },
    gte: {
      value: 'gte',
    },
    lt: {
      value: 'lt',
    },
    lte: {
      value: 'lte',
    },
    contains: {
      value: 'contains',
    },
    notContains: {
      value: 'notContains',
    },
    OR: {
      value: 'OR',
    },
    AND: {
      value: 'AND',
    },
  },
});
export const ProjectFilterTypeInput = new GraphQLEnumType({
  name: 'ProjectFilterTypeInput',
  values: {
    countries: {
      value: 'countries',
    },
    title: {
      value: 'title',
    },
    shortname: {
      value: 'shortname',
    },
    project_configuration: {
      value: 'project_configuration',
    },
    temporality: {
      value: 'temporality',
    },
    duration: {
      value: 'duration',
    },
  },
});
export const ProjectSortTypeInput = new GraphQLInputObjectType({
  name: 'ProjectSortTypeInput',
  fields: {
    order: { type: new GraphQLNonNull(SortInputTypeEnum) },
    field: { type: new GraphQLNonNull(ProjectFieldEnum) },
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
export const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject(
    $id: UUID!
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
    updateProject(
      id: $id
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
// SAMPLING POINT MUTATION
// export const CREATE_SAMPLING_POINT_MUTATION = gql`
//   mutation CreateSamplingPoint(
//     $device: ID!
//     $project: ID!
//     $dateDeployment: DateTime!
//     $dateCollected: DateTime!
//     $location: PointScalar!
//     $altitude: Float!
//   ) {
//     createSamplingPoint(
//       device: $device
//       project: $project
//       dateDeployment: $dateDeployment
//       dateCollected: $dateCollected
//       location: $location
//       altitude: $altitude
//     ) {
//       project
//       device
//       dateDeployment
//       dateCollected
//       location
//       altitude
//       errors {
//         field
//         messages
//       }
//     }
//   }
// `;
export const CREATE_SAMPLING_POINT_MUTATION = gql`
  mutation CreateSamplingPoint(
    $dateDeployment: DateTime!
    $dateCollected: DateTime!
    $location: PointScalar!
    $altitude: Float!
  ) {
    createSamplingPoint(
      dateDeployment: $dateDeployment
      dateCollected: $dateCollected
      location: $location
      altitude: $altitude
    ) {
      dateDeployment
      dateCollected
      location
      altitude
      errors {
        field
        messages
      }
    }
  }
`;
