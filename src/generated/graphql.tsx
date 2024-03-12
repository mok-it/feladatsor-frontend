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
  alternativeDifficultyExercises: Array<Exercise>;
  checks: Array<ExerciseCheck>;
  comments: Array<ExerciseComment>;
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
  isCompetitionFinal?: Maybe<Scalars['Boolean']['output']>;
  sameLogicExercises: Array<Exercise>;
  solution: Scalars['String']['output'];
  solutionOptions: Array<Scalars['String']['output']>;
  solveIdea?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  status: ExerciseStatus;
  tags: Array<Tag>;
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
  role: ExerciseCheckRole;
  type: ExerciseCheckType;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type ExerciseCheckInput = {
  exerciseId: Scalars['ID']['input'];
  type: ExerciseCheckType;
};

export type ExerciseCheckRole =
  | 'EXAMINER'
  | 'LECTOR'
  | 'PROFESSIONAL';

export type ExerciseCheckType =
  | 'CHANGE_REQUIRED'
  | 'GOOD'
  | 'TO_DELETE';

export type ExerciseComment = {
  __typename: 'ExerciseComment';
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type ExerciseDifficulty = {
  __typename: 'ExerciseDifficulty';
  ageGroup: ExerciseAgeGroup;
  difficulty: Scalars['Int']['output'];
};

export type ExerciseDifficultyInput = {
  ageGroup: ExerciseAgeGroup;
  difficulty: Scalars['Int']['input'];
};

export type ExerciseDifficultyRange = {
  ageGroup: ExerciseAgeGroup;
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type ExerciseHistory = {
  __typename: 'ExerciseHistory';
  exercise: Exercise;
  id: Scalars['ID']['output'];
};

export type ExerciseInput = {
  alternativeDifficultyParent?: InputMaybe<Scalars['ID']['input']>;
  description: Scalars['String']['input'];
  difficulty: Array<ExerciseDifficultyInput>;
  elaboration?: InputMaybe<Scalars['String']['input']>;
  elaborationImage?: InputMaybe<Scalars['String']['input']>;
  exerciseImage?: InputMaybe<Scalars['String']['input']>;
  helpingQuestions: Array<Scalars['String']['input']>;
  isCompetitionFinal?: InputMaybe<Scalars['Boolean']['input']>;
  sameLogicParent?: InputMaybe<Scalars['ID']['input']>;
  solution: Scalars['String']['input'];
  solutionImage?: InputMaybe<Scalars['String']['input']>;
  solutionOptions: Array<Scalars['String']['input']>;
  solveIdea?: InputMaybe<Scalars['String']['input']>;
  solveIdeaImage?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  status: ExerciseStatus;
  tags: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type ExerciseSearchQuery = {
  difficulty?: InputMaybe<Array<ExerciseDifficultyRange>>;
  excludeTags?: InputMaybe<Array<Scalars['ID']['input']>>;
  fromRow: Scalars['Int']['input'];
  queryStr?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  toRow: Scalars['Int']['input'];
};

export type ExerciseSearchResult = {
  __typename: 'ExerciseSearchResult';
  exercises: Array<Exercise>;
  totalCount: Scalars['Int']['output'];
};

export type ExerciseStatus =
  | 'APPROVED'
  | 'CREATED'
  | 'DELETED'
  | 'DRAFT';

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
  loginWithGoogle?: Maybe<LoginResponse>;
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


export type MutationLoginWithGoogleArgs = {
  googleToken: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  data: UserRegisterInput;
};

export type Query = {
  __typename: 'Query';
  exercise?: Maybe<Exercise>;
  exercises: Array<Exercise>;
  exercisesCount: Scalars['Int']['output'];
  searchExercises: ExerciseSearchResult;
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


export type QuerySearchExercisesArgs = {
  query?: InputMaybe<ExerciseSearchQuery>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Tag = {
  __typename: 'Tag';
  children: Array<Tag>;
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Tag>;
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

export type CreateExerciseMutationVariables = Exact<{
  input: ExerciseInput;
}>;


export type CreateExerciseMutation = { __typename: 'Mutation', createExercise: { __typename: 'Exercise', id: string } };

export type SelectExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type SelectExercisesQuery = { __typename: 'Query', exercises: Array<{ __typename: 'Exercise', id: string, description: string, exerciseImage?: string | null, solution: string, elaboration?: string | null, elaborationImage?: string | null, helpingQuestions: Array<string>, source?: string | null, createdAt: string, updatedAt: string, difficulty: Array<{ __typename: 'ExerciseDifficulty', difficulty: number, ageGroup: ExerciseAgeGroup }>, history: Array<{ __typename: 'ExerciseHistory', id: string, exercise: { __typename: 'Exercise', id: string } }>, checks: Array<{ __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, user: { __typename: 'User', id: string, name: string } }>, createdBy: { __typename: 'User', id: string, name: string } }> };

export type LoginWithGoogleMutationVariables = Exact<{
  googleToken: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { __typename: 'Mutation', loginWithGoogle?: { __typename: 'LoginResponse', token: string, user: { __typename: 'User', id: string, email: string, name: string, userName: string, createdAt: string, updatedAt: string } } | null };

export type SearchExercisesQueryVariables = Exact<{
  query: ExerciseSearchQuery;
}>;


export type SearchExercisesQuery = { __typename: 'Query', searchExercises: { __typename: 'ExerciseSearchResult', totalCount: number, exercises: Array<{ __typename: 'Exercise', id: string, description: string, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }>, tags: Array<{ __typename: 'Tag', id: string, name: string }> }> } };


export const CreateExerciseDocument = gql`
    mutation createExercise($input: ExerciseInput!) {
  createExercise(input: $input) {
    id
  }
}
    `;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const SelectExercisesDocument = gql`
    query selectExercises {
  exercises(take: 10, skip: 0) {
    id
    description
    exerciseImage
    solution
    elaboration
    elaborationImage
    helpingQuestions
    source
    difficulty {
      difficulty
      ageGroup
    }
    history {
      id
      exercise {
        id
      }
    }
    checks {
      id
      user {
        id
        name
      }
      type
    }
    createdBy {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSelectExercisesQuery__
 *
 * To run a query within a React component, call `useSelectExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelectExercisesQuery(baseOptions?: Apollo.QueryHookOptions<SelectExercisesQuery, SelectExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectExercisesQuery, SelectExercisesQueryVariables>(SelectExercisesDocument, options);
      }
export function useSelectExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectExercisesQuery, SelectExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectExercisesQuery, SelectExercisesQueryVariables>(SelectExercisesDocument, options);
        }
export function useSelectExercisesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SelectExercisesQuery, SelectExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SelectExercisesQuery, SelectExercisesQueryVariables>(SelectExercisesDocument, options);
        }
export type SelectExercisesQueryHookResult = ReturnType<typeof useSelectExercisesQuery>;
export type SelectExercisesLazyQueryHookResult = ReturnType<typeof useSelectExercisesLazyQuery>;
export type SelectExercisesSuspenseQueryHookResult = ReturnType<typeof useSelectExercisesSuspenseQuery>;
export type SelectExercisesQueryResult = Apollo.QueryResult<SelectExercisesQuery, SelectExercisesQueryVariables>;
export const LoginWithGoogleDocument = gql`
    mutation loginWithGoogle($googleToken: String!) {
  loginWithGoogle(googleToken: $googleToken) {
    user {
      id
      email
      name
      userName
      createdAt
      updatedAt
    }
    token
  }
}
    `;
export type LoginWithGoogleMutationFn = Apollo.MutationFunction<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;

/**
 * __useLoginWithGoogleMutation__
 *
 * To run a mutation, you first call `useLoginWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithGoogleMutation, { data, loading, error }] = useLoginWithGoogleMutation({
 *   variables: {
 *      googleToken: // value for 'googleToken'
 *   },
 * });
 */
export function useLoginWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>(LoginWithGoogleDocument, options);
      }
export type LoginWithGoogleMutationHookResult = ReturnType<typeof useLoginWithGoogleMutation>;
export type LoginWithGoogleMutationResult = Apollo.MutationResult<LoginWithGoogleMutation>;
export type LoginWithGoogleMutationOptions = Apollo.BaseMutationOptions<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;
export const SearchExercisesDocument = gql`
    query searchExercises($query: ExerciseSearchQuery!) {
  searchExercises(query: $query) {
    exercises {
      id
      difficulty {
        ageGroup
        difficulty
      }
      tags {
        id
        name
      }
      description
    }
    totalCount
  }
}
    `;

/**
 * __useSearchExercisesQuery__
 *
 * To run a query within a React component, call `useSearchExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchExercisesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchExercisesQuery(baseOptions: Apollo.QueryHookOptions<SearchExercisesQuery, SearchExercisesQueryVariables> & ({ variables: SearchExercisesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchExercisesQuery, SearchExercisesQueryVariables>(SearchExercisesDocument, options);
      }
export function useSearchExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchExercisesQuery, SearchExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchExercisesQuery, SearchExercisesQueryVariables>(SearchExercisesDocument, options);
        }
export function useSearchExercisesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchExercisesQuery, SearchExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchExercisesQuery, SearchExercisesQueryVariables>(SearchExercisesDocument, options);
        }
export type SearchExercisesQueryHookResult = ReturnType<typeof useSearchExercisesQuery>;
export type SearchExercisesLazyQueryHookResult = ReturnType<typeof useSearchExercisesLazyQuery>;
export type SearchExercisesSuspenseQueryHookResult = ReturnType<typeof useSearchExercisesSuspenseQuery>;
export type SearchExercisesQueryResult = Apollo.QueryResult<SearchExercisesQuery, SearchExercisesQueryVariables>;