/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMatch = /* GraphQL */ `
  query GetMatch($id: ID!) {
    getMatch(id: $id) {
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
export const listMatches = /* GraphQL */ `
  query ListMatches(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        User1ID
        User2ID
        isMatch
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        matchUser1Id
        matchUser2Id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMatches = /* GraphQL */ `
  query SyncMatches(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMatches(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        User1ID
        User2ID
        isMatch
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        matchUser1Id
        matchUser2Id
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
