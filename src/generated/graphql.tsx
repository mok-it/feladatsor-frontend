import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Exercise = {
  __typename: 'Exercise';
  checks: Array<ExerciseCheck>;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description: Scalars['String']['output'];
  difficulty: Array<ExerciseDifficulty>;
  elaboration?: Maybe<Scalars['String']['output']>;
  elaborationImage?: Maybe<Scalars['String']['output']>;
  exerciseImage?: Maybe<Scalars['String']['output']>;
  helpingQuestions: Array<Scalars['String']['output']>;
  history: Array<ExerciseHistory>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  similarExercises: Array<Exercise>;
  solution: Scalars['String']['output'];
  source?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type ExerciseAgeGroup =
  | 'JEGESMEDVE'
  | 'KISMEDVE'
  | 'KOALA'
  | 'MEDVEBOCS'
  | 'NAGYMEDVE';

export type ExerciseCheck = {
  __typename: 'ExerciseCheck';
  createdAt: Scalars['String']['output'];
  exercise: Exercise;
  id: Scalars['ID']['output'];
  type: ExerciseCheckType;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type ExerciseCheckInput = {
  exerciseId: Scalars['ID']['input'];
  type: ExerciseCheckType;
};

export type ExerciseCheckType =
  | 'CHANGE_REQUIRED'
  | 'GOOD'
  | 'TO_DELETE';

export type ExerciseDifficulty = {
  __typename: 'ExerciseDifficulty';
  ageGroup: ExerciseAgeGroup;
  difficulty: Scalars['Int']['output'];
};

export type ExerciseHistory = {
  __typename: 'ExerciseHistory';
  exercise: Exercise;
  id: Scalars['ID']['output'];
};

export type ExerciseInput = {
  description: Scalars['String']['input'];
  elaboration?: InputMaybe<Scalars['String']['input']>;
  elaborationImage?: InputMaybe<Scalars['String']['input']>;
  exerciseImage?: InputMaybe<Scalars['String']['input']>;
  helpingQuestions: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  solution: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponse = {
  __typename: 'LoginResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename: 'Mutation';
  createExercise: Exercise;
  createExerciseCheck: ExerciseCheck;
  login?: Maybe<LoginResponse>;
  register: User;
};


export type MutationCreateExerciseArgs = {
  input: ExerciseInput;
};


export type MutationCreateExerciseCheckArgs = {
  data: ExerciseCheckInput;
};


export type MutationLoginArgs = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  data: UserRegisterInput;
};

export type Query = {
  __typename: 'Query';
  exercise?: Maybe<Exercise>;
  exercises: Array<Exercise>;
  exercisesCount: Scalars['Int']['output'];
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryExerciseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExercisesArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type UserRegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  userName: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename: 'Mutation', login?: { __typename: 'LoginResponse', token: string, user: { __typename: 'User', id: string } } | null };


export const LoginDocument = gql`
    mutation login($userName: String!, $password: String!) {
  login(name: $userName, password: $password) {
    token
    user {
      id
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;