/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMatch = /* GraphQL */ `
  mutation CreateMatch(
    $input: CreateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    createMatch(input: $input, condition: $condition) {
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
export const updateMatch = /* GraphQL */ `
  mutation UpdateMatch(
    $input: UpdateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    updateMatch(input: $input, condition: $condition) {
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
export const deleteMatch = /* GraphQL */ `
  mutation DeleteMatch(
    $input: DeleteMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    deleteMatch(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
