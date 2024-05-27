/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMatch = /* GraphQL */ `
  subscription OnCreateMatch($filter: ModelSubscriptionMatchFilterInput) {
    onCreateMatch(filter: $filter) {
      id
      User1ID
      User2ID
      isMatch
      User1 {
        id
        name
        images
        bio
        gender
        lookingFor
        sub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      User2 {
        id
        name
        images
        bio
        gender
        lookingFor
        sub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchUser1Id
      matchUser2Id
      __typename
    }
  }
`;
export const onUpdateMatch = /* GraphQL */ `
  subscription OnUpdateMatch($filter: ModelSubscriptionMatchFilterInput) {
    onUpdateMatch(filter: $filter) {
      id
      User1ID
      User2ID
      isMatch
      User1 {
        id
        name
        images
        bio
        gender
        lookingFor
        sub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      User2 {
        id
        name
        images
        bio
        gender
        lookingFor
        sub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchUser1Id
      matchUser2Id
      __typename
    }
  }
`;
export const onDeleteMatch = /* GraphQL */ `
  subscription OnDeleteMatch($filter: ModelSubscriptionMatchFilterInput) {
    onDeleteMatch(filter: $filter) {
      id
      User1ID
      User2ID
      isMatch
      User1 {
        id
        name
        images
        bio
        gender
        lookingFor
        sub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      User2 {
        id
        name
        images
        bio
        gender
        lookingFor
        sub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchUser1Id
      matchUser2Id
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      images
      bio
      gender
      lookingFor
      sub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      images
      bio
      gender
      lookingFor
      sub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      images
      bio
      gender
      lookingFor
      sub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
