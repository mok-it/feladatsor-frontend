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

export type AlternativeDifficultyExerciseGroup = {
  __typename: 'AlternativeDifficultyExerciseGroup';
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description?: Maybe<Scalars['String']['output']>;
  exercises: Array<Exercise>;
  id: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ContributionCalendar = {
  __typename: 'ContributionCalendar';
  data: Array<ContributionCalendarDay>;
  fromDate: Scalars['String']['output'];
  toDate: Scalars['String']['output'];
};

export type ContributionCalendarDay = {
  __typename: 'ContributionCalendarDay';
  count: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  level: Scalars['Int']['output'];
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
  exerciseImage?: Maybe<Image>;
  helpingQuestions: Array<Scalars['String']['output']>;
  history: Array<ExerciseHistory>;
  id: Scalars['ID']['output'];
  isCompetitionFinal?: Maybe<Scalars['Boolean']['output']>;
  sameLogicExercises: Array<Exercise>;
  solution: Scalars['String']['output'];
  solutionImage?: Maybe<Image>;
  solutionOptions: Array<Scalars['String']['output']>;
  solveIdea?: Maybe<Scalars['String']['output']>;
  solveIdeaImage?: Maybe<Image>;
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
  comment?: InputMaybe<Scalars['String']['input']>;
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
  createdBy: User;
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
  createdAt: Scalars['String']['output'];
  createdBy: User;
  exercise: Exercise;
  field: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  newValue: Scalars['String']['output'];
  oldValue: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ExerciseHourlyGroup = {
  __typename: 'ExerciseHourlyGroup';
  count: Scalars['Int']['output'];
  hour: Scalars['String']['output'];
};

export type ExerciseInput = {
  alternativeDifficultyGroup?: InputMaybe<Scalars['ID']['input']>;
  description: Scalars['String']['input'];
  difficulty: Array<ExerciseDifficultyInput>;
  exerciseImage?: InputMaybe<Scalars['String']['input']>;
  helpingQuestions: Array<Scalars['String']['input']>;
  isCompetitionFinal?: InputMaybe<Scalars['Boolean']['input']>;
  sameLogicGroup?: InputMaybe<Scalars['ID']['input']>;
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
  isCompetitionFinal?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  queryStr?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  take: Scalars['Int']['input'];
};

export type ExerciseSearchResult = {
  __typename: 'ExerciseSearchResult';
  exercises: Array<Exercise>;
  totalCount: Scalars['Int']['output'];
};

export type ExerciseSheet = {
  __typename: 'ExerciseSheet';
  createdAt: Scalars['String']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sheetItems: Array<ExerciseSheetItem>;
  updatedAt: Scalars['String']['output'];
};

export type ExerciseSheetInput = {
  name: Scalars['String']['input'];
  sheetItems?: InputMaybe<Array<ExerciseSheetItemInput>>;
};

export type ExerciseSheetItem = {
  __typename: 'ExerciseSheetItem';
  ageGroup: ExerciseAgeGroup;
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
};

export type ExerciseSheetItemInput = {
  ageGroup: ExerciseAgeGroup;
  exercises: Array<Scalars['ID']['input']>;
  level: Scalars['Int']['input'];
};

export type ExerciseStatus =
  | 'APPROVED'
  | 'CREATED'
  | 'DELETED'
  | 'DRAFT';

export type ExerciseTag = {
  __typename: 'ExerciseTag';
  children: Array<ExerciseTag>;
  exerciseCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<ExerciseTag>;
};

export type ExerciseUpdateInput = {
  alternativeDifficultyGroup?: InputMaybe<Scalars['ID']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Array<ExerciseDifficultyInput>>;
  exerciseImage?: InputMaybe<Scalars['String']['input']>;
  helpingQuestions?: InputMaybe<Array<Scalars['String']['input']>>;
  isCompetitionFinal?: InputMaybe<Scalars['Boolean']['input']>;
  sameLogicGroup?: InputMaybe<Scalars['ID']['input']>;
  solution?: InputMaybe<Scalars['String']['input']>;
  solutionImage?: InputMaybe<Scalars['String']['input']>;
  solutionOptions?: InputMaybe<Array<Scalars['String']['input']>>;
  solveIdea?: InputMaybe<Scalars['String']['input']>;
  solveIdeaImage?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExerciseStatus>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type GlobalStats = {
  __typename: 'GlobalStats';
  checkedExerciseCount: Scalars['Int']['output'];
  contributionCalendar: ContributionCalendar;
  exerciseHourlyCount: Array<ExerciseHourlyGroup>;
  totalExerciseCount: Scalars['Int']['output'];
  userLeaderboard: Array<LeaderBoardUser>;
};

export type Image = {
  __typename: 'Image';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type LeaderBoardUser = {
  __typename: 'LeaderBoardUser';
  rank: Scalars['Int']['output'];
  submittedExerciseCount: Scalars['Int']['output'];
  user: User;
};

export type LoginResponse = {
  __typename: 'LoginResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename: 'Mutation';
  changePermissions: User;
  createExercise: Exercise;
  createExerciseCheck: ExerciseCheck;
  createExerciseComment: ExerciseComment;
  createExerciseSheet: ExerciseSheet;
  createExerciseTag: ExerciseTag;
  deleteExerciseComment: ExerciseComment;
  deleteExerciseSheet: Scalars['Boolean']['output'];
  deleteExerciseTag: Scalars['Boolean']['output'];
  login?: Maybe<LoginResponse>;
  loginWithGoogle?: Maybe<LoginResponse>;
  register: User;
  updateExercise: Exercise;
  updateExerciseComment: ExerciseComment;
  updateExerciseSheet: ExerciseSheet;
  updateExerciseTag: ExerciseTag;
  /** Update by id, or if not provided, use the user from the JWT token */
  updateUser: User;
};


export type MutationChangePermissionsArgs = {
  permissions: Array<Role>;
  userId: Scalars['ID']['input'];
};


export type MutationCreateExerciseArgs = {
  input: ExerciseInput;
};


export type MutationCreateExerciseCheckArgs = {
  data: ExerciseCheckInput;
};


export type MutationCreateExerciseCommentArgs = {
  comment: Scalars['String']['input'];
  exerciseId: Scalars['ID']['input'];
};


export type MutationCreateExerciseSheetArgs = {
  sheetData: ExerciseSheetInput;
};


export type MutationCreateExerciseTagArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteExerciseCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteExerciseSheetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteExerciseTagArgs = {
  id: Scalars['ID']['input'];
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


export type MutationUpdateExerciseArgs = {
  id: Scalars['ID']['input'];
  input: ExerciseUpdateInput;
};


export type MutationUpdateExerciseCommentArgs = {
  comment: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateExerciseSheetArgs = {
  id: Scalars['ID']['input'];
  sheetData: UpdateExerciseSheetInput;
};


export type MutationUpdateExerciseTagArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderDirection =
  | 'ASC'
  | 'DESC';

export type Query = {
  __typename: 'Query';
  alternativeDifficultyExerciseGroups: Array<AlternativeDifficultyExerciseGroup>;
  commentsByExercise: Array<ExerciseComment>;
  exercise?: Maybe<Exercise>;
  exerciseComment?: Maybe<ExerciseComment>;
  exerciseHistoryByExercise: Array<ExerciseHistory>;
  exerciseSheet?: Maybe<ExerciseSheet>;
  exerciseSheets: Array<ExerciseSheet>;
  exerciseTag?: Maybe<ExerciseTag>;
  exerciseTags: Array<ExerciseTag>;
  exercises: Array<Exercise>;
  exercisesCount: Scalars['Int']['output'];
  globalStats?: Maybe<GlobalStats>;
  sameLogicExerciseGroups: Array<SameLogicExerciseGroup>;
  searchExercises: ExerciseSearchResult;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentsByExerciseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExerciseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExerciseCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExerciseHistoryByExerciseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExerciseSheetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExerciseTagArgs = {
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

export type Role =
  | 'ADMIN'
  | 'USER';

export type SameLogicExerciseGroup = {
  __typename: 'SameLogicExerciseGroup';
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description?: Maybe<Scalars['String']['output']>;
  exercises: Array<Exercise>;
  id: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Tag = {
  __typename: 'Tag';
  children: Array<Tag>;
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Tag>;
};

export type UpdateExerciseSheetInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  sheetItems?: InputMaybe<Array<ExerciseSheetItemInput>>;
};

export type User = {
  __typename: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<Role>;
  updatedAt: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type UserRegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type UserUpdateInput = {
  customAvatarId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type ChangePermissionsMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  permissions: Array<Role> | Role;
}>;


export type ChangePermissionsMutation = { __typename: 'Mutation', changePermissions: { __typename: 'User', id: string, name: string } };

export type CommentsByExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
}>;


export type CommentsByExerciseQuery = { __typename: 'Query', commentsByExercise: Array<{ __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, createdBy: { __typename: 'User', id: string, name: string } }> };

export type CreateExerciseMutationVariables = Exact<{
  input: ExerciseInput;
}>;


export type CreateExerciseMutation = { __typename: 'Mutation', createExercise: { __typename: 'Exercise', id: string } };

export type CreateExerciseCheckMutationVariables = Exact<{
  input: ExerciseCheckInput;
}>;


export type CreateExerciseCheckMutation = { __typename: 'Mutation', createExerciseCheck: { __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, user: { __typename: 'User', id: string, name: string } } };

export type CreateExerciseCommentMutationVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
}>;


export type CreateExerciseCommentMutation = { __typename: 'Mutation', createExerciseComment: { __typename: 'ExerciseComment', id: string } };

export type CreateExerciseSheetMutationVariables = Exact<{
  sheetData: ExerciseSheetInput;
}>;


export type CreateExerciseSheetMutation = { __typename: 'Mutation', createExerciseSheet: { __typename: 'ExerciseSheet', id: string, name: string, createdAt: string } };

export type DeleteExerciseCommentMutationVariables = Exact<{
  deleteExerciseCommentId: Scalars['ID']['input'];
}>;


export type DeleteExerciseCommentMutation = { __typename: 'Mutation', deleteExerciseComment: { __typename: 'ExerciseComment', id: string } };

export type DeleteExerciseSheetMutationVariables = Exact<{
  deleteExerciseSheetId: Scalars['ID']['input'];
}>;


export type DeleteExerciseSheetMutation = { __typename: 'Mutation', deleteExerciseSheet: boolean };

export type SelectExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type SelectExercisesQuery = { __typename: 'Query', exercises: Array<{ __typename: 'Exercise', id: string, description: string, solution: string, helpingQuestions: Array<string>, source?: string | null, createdAt: string, updatedAt: string, difficulty: Array<{ __typename: 'ExerciseDifficulty', difficulty: number, ageGroup: ExerciseAgeGroup }>, history: Array<{ __typename: 'ExerciseHistory', id: string, exercise: { __typename: 'Exercise', id: string } }>, checks: Array<{ __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, user: { __typename: 'User', id: string, name: string } }>, createdBy: { __typename: 'User', id: string, name: string } }> };

export type SelectExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
}>;


export type SelectExerciseQuery = { __typename: 'Query', exercise?: { __typename: 'Exercise', id: string, status: ExerciseStatus, description: string, solutionOptions: Array<string>, solution: string, solveIdea?: string | null, helpingQuestions: Array<string>, alternativeDifficultyExercises: Array<{ __typename: 'Exercise', id: string }>, exerciseImage?: { __typename: 'Image', id: string, url: string } | null, solutionImage?: { __typename: 'Image', id: string, url: string } | null, solveIdeaImage?: { __typename: 'Image', id: string, url: string } | null, tags: Array<{ __typename: 'Tag', id: string, name: string }>, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }>, checks: Array<{ __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, user: { __typename: 'User', id: string, name: string } }> } | null };

export type ExerciseHistoryByExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
}>;


export type ExerciseHistoryByExerciseQuery = { __typename: 'Query', exerciseHistoryByExercise: Array<{ __typename: 'ExerciseHistory', id: string, field: string, oldValue: string, newValue: string, createdAt: string, createdBy: { __typename: 'User', id: string, name: string } }> };

export type ExerciseSheetQueryVariables = Exact<{
  exerciseSheetId: Scalars['ID']['input'];
}>;


export type ExerciseSheetQuery = { __typename: 'Query', exerciseSheet?: { __typename: 'ExerciseSheet', id: string, name: string, createdAt: string, updatedAt: string, sheetItems: Array<{ __typename: 'ExerciseSheetItem', id: string, ageGroup: ExerciseAgeGroup, level: number, exercises: Array<{ __typename: 'Exercise', id: string, description: string, exerciseImage?: { __typename: 'Image', url: string } | null, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }> }> }>, createdBy: { __typename: 'User', name: string } } | null };

export type ExerciseSheetsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExerciseSheetsQuery = { __typename: 'Query', exerciseSheets: Array<{ __typename: 'ExerciseSheet', id: string, name: string, createdAt: string, updatedAt: string, createdBy: { __typename: 'User', name: string } }> };

export type ExerciseTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExerciseTagsQuery = { __typename: 'Query', exerciseTags: Array<{ __typename: 'ExerciseTag', id: string, name: string, exerciseCount: number, children: Array<{ __typename: 'ExerciseTag', id: string, name: string, children: Array<{ __typename: 'ExerciseTag', id: string, name: string }> }> }> };

export type ExerciseCheckFragment = { __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, user: { __typename: 'User', id: string, name: string } };

export type ExerciseCommentFragment = { __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, createdBy: { __typename: 'User', id: string, name: string } };

export type ExerciseHistoryFragment = { __typename: 'ExerciseHistory', id: string, field: string, oldValue: string, newValue: string, createdAt: string, createdBy: { __typename: 'User', id: string, name: string } };

export type ExerciseListElemFragment = { __typename: 'Exercise', id: string, description: string, status: ExerciseStatus, createdAt: string, exerciseImage?: { __typename: 'Image', url: string } | null, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }>, tags: Array<{ __typename: 'Tag', id: string, name: string }> };

export type LoginMutationVariables = Exact<{
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename: 'Mutation', login?: { __typename: 'LoginResponse', token: string, user: { __typename: 'User', id: string, name: string, userName: string, email: string, roles: Array<Role>, createdAt: string, updatedAt: string } } | null };

export type LoginWithGoogleMutationVariables = Exact<{
  googleToken: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { __typename: 'Mutation', loginWithGoogle?: { __typename: 'LoginResponse', token: string, user: { __typename: 'User', id: string, email: string, name: string, userName: string, roles: Array<Role>, createdAt: string, updatedAt: string } } | null };

export type RegisterMutationVariables = Exact<{
  data: UserRegisterInput;
}>;


export type RegisterMutation = { __typename: 'Mutation', register: { __typename: 'User', id: string, userName: string } };

export type SearchExercisesQueryVariables = Exact<{
  query: ExerciseSearchQuery;
}>;


export type SearchExercisesQuery = { __typename: 'Query', searchExercises: { __typename: 'ExerciseSearchResult', totalCount: number, exercises: Array<{ __typename: 'Exercise', id: string, description: string, status: ExerciseStatus, createdAt: string, exerciseImage?: { __typename: 'Image', url: string } | null, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }>, tags: Array<{ __typename: 'Tag', id: string, name: string }> }> } };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename: 'Query', globalStats?: { __typename: 'GlobalStats', checkedExerciseCount: number, totalExerciseCount: number, contributionCalendar: { __typename: 'ContributionCalendar', fromDate: string, toDate: string, data: Array<{ __typename: 'ContributionCalendarDay', date: string, level: number, count: number }> }, exerciseHourlyCount: Array<{ __typename: 'ExerciseHourlyGroup', count: number, hour: string }>, userLeaderboard: Array<{ __typename: 'LeaderBoardUser', rank: number, submittedExerciseCount: number, user: { __typename: 'User', id: string, name: string, avatarUrl?: string | null } }> } | null };

export type UpdateExerciseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ExerciseUpdateInput;
}>;


export type UpdateExerciseMutation = { __typename: 'Mutation', updateExercise: { __typename: 'Exercise', id: string } };

export type UpdateExerciseSheetMutationVariables = Exact<{
  updateExerciseSheetId: Scalars['ID']['input'];
  sheetData: UpdateExerciseSheetInput;
}>;


export type UpdateExerciseSheetMutation = { __typename: 'Mutation', updateExerciseSheet: { __typename: 'ExerciseSheet', id: string } };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename: 'Mutation', updateUser: { __typename: 'User', createdAt: string, name: string, userName: string, email: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename: 'Query', users: Array<{ __typename: 'User', id: string, name: string, userName: string, email: string, roles: Array<Role>, avatarUrl?: string | null }> };

export const ExerciseCheckFragmentDoc = gql`
    fragment ExerciseCheck on ExerciseCheck {
  id
  type
  createdAt
  user {
    id
    name
  }
}
    `;
export const ExerciseCommentFragmentDoc = gql`
    fragment ExerciseComment on ExerciseComment {
  id
  comment
  createdAt
  createdBy {
    id
    name
  }
}
    `;
export const ExerciseHistoryFragmentDoc = gql`
    fragment ExerciseHistory on ExerciseHistory {
  id
  field
  oldValue
  newValue
  createdAt
  createdBy {
    id
    name
  }
}
    `;
export const ExerciseListElemFragmentDoc = gql`
    fragment ExerciseListElem on Exercise {
  id
  description
  status
  exerciseImage {
    url
  }
  difficulty {
    ageGroup
    difficulty
  }
  tags {
    id
    name
  }
  createdAt
}
    `;
export const ChangePermissionsDocument = gql`
    mutation changePermissions($userId: ID!, $permissions: [Role!]!) {
  changePermissions(userId: $userId, permissions: $permissions) {
    id
    name
  }
}
    `;
export type ChangePermissionsMutationFn = Apollo.MutationFunction<ChangePermissionsMutation, ChangePermissionsMutationVariables>;

/**
 * __useChangePermissionsMutation__
 *
 * To run a mutation, you first call `useChangePermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePermissionsMutation, { data, loading, error }] = useChangePermissionsMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      permissions: // value for 'permissions'
 *   },
 * });
 */
export function useChangePermissionsMutation(baseOptions?: Apollo.MutationHookOptions<ChangePermissionsMutation, ChangePermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePermissionsMutation, ChangePermissionsMutationVariables>(ChangePermissionsDocument, options);
      }
export type ChangePermissionsMutationHookResult = ReturnType<typeof useChangePermissionsMutation>;
export type ChangePermissionsMutationResult = Apollo.MutationResult<ChangePermissionsMutation>;
export type ChangePermissionsMutationOptions = Apollo.BaseMutationOptions<ChangePermissionsMutation, ChangePermissionsMutationVariables>;
export const CommentsByExerciseDocument = gql`
    query commentsByExercise($exerciseId: ID!) {
  commentsByExercise(id: $exerciseId) {
    id
    comment
    createdAt
    createdBy {
      id
      name
    }
  }
}
    `;

/**
 * __useCommentsByExerciseQuery__
 *
 * To run a query within a React component, call `useCommentsByExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsByExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsByExerciseQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useCommentsByExerciseQuery(baseOptions: Apollo.QueryHookOptions<CommentsByExerciseQuery, CommentsByExerciseQueryVariables> & ({ variables: CommentsByExerciseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsByExerciseQuery, CommentsByExerciseQueryVariables>(CommentsByExerciseDocument, options);
      }
export function useCommentsByExerciseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsByExerciseQuery, CommentsByExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsByExerciseQuery, CommentsByExerciseQueryVariables>(CommentsByExerciseDocument, options);
        }
export function useCommentsByExerciseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CommentsByExerciseQuery, CommentsByExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CommentsByExerciseQuery, CommentsByExerciseQueryVariables>(CommentsByExerciseDocument, options);
        }
export type CommentsByExerciseQueryHookResult = ReturnType<typeof useCommentsByExerciseQuery>;
export type CommentsByExerciseLazyQueryHookResult = ReturnType<typeof useCommentsByExerciseLazyQuery>;
export type CommentsByExerciseSuspenseQueryHookResult = ReturnType<typeof useCommentsByExerciseSuspenseQuery>;
export type CommentsByExerciseQueryResult = Apollo.QueryResult<CommentsByExerciseQuery, CommentsByExerciseQueryVariables>;
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
export const CreateExerciseCheckDocument = gql`
    mutation CreateExerciseCheck($input: ExerciseCheckInput!) {
  createExerciseCheck(data: $input) {
    ...ExerciseCheck
  }
}
    ${ExerciseCheckFragmentDoc}`;
export type CreateExerciseCheckMutationFn = Apollo.MutationFunction<CreateExerciseCheckMutation, CreateExerciseCheckMutationVariables>;

/**
 * __useCreateExerciseCheckMutation__
 *
 * To run a mutation, you first call `useCreateExerciseCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseCheckMutation, { data, loading, error }] = useCreateExerciseCheckMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExerciseCheckMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseCheckMutation, CreateExerciseCheckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseCheckMutation, CreateExerciseCheckMutationVariables>(CreateExerciseCheckDocument, options);
      }
export type CreateExerciseCheckMutationHookResult = ReturnType<typeof useCreateExerciseCheckMutation>;
export type CreateExerciseCheckMutationResult = Apollo.MutationResult<CreateExerciseCheckMutation>;
export type CreateExerciseCheckMutationOptions = Apollo.BaseMutationOptions<CreateExerciseCheckMutation, CreateExerciseCheckMutationVariables>;
export const CreateExerciseCommentDocument = gql`
    mutation CreateExerciseComment($exerciseId: ID!, $comment: String!) {
  createExerciseComment(exerciseId: $exerciseId, comment: $comment) {
    id
  }
}
    `;
export type CreateExerciseCommentMutationFn = Apollo.MutationFunction<CreateExerciseCommentMutation, CreateExerciseCommentMutationVariables>;

/**
 * __useCreateExerciseCommentMutation__
 *
 * To run a mutation, you first call `useCreateExerciseCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseCommentMutation, { data, loading, error }] = useCreateExerciseCommentMutation({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateExerciseCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseCommentMutation, CreateExerciseCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseCommentMutation, CreateExerciseCommentMutationVariables>(CreateExerciseCommentDocument, options);
      }
export type CreateExerciseCommentMutationHookResult = ReturnType<typeof useCreateExerciseCommentMutation>;
export type CreateExerciseCommentMutationResult = Apollo.MutationResult<CreateExerciseCommentMutation>;
export type CreateExerciseCommentMutationOptions = Apollo.BaseMutationOptions<CreateExerciseCommentMutation, CreateExerciseCommentMutationVariables>;
export const CreateExerciseSheetDocument = gql`
    mutation createExerciseSheet($sheetData: ExerciseSheetInput!) {
  createExerciseSheet(sheetData: $sheetData) {
    id
    name
    createdAt
  }
}
    `;
export type CreateExerciseSheetMutationFn = Apollo.MutationFunction<CreateExerciseSheetMutation, CreateExerciseSheetMutationVariables>;

/**
 * __useCreateExerciseSheetMutation__
 *
 * To run a mutation, you first call `useCreateExerciseSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseSheetMutation, { data, loading, error }] = useCreateExerciseSheetMutation({
 *   variables: {
 *      sheetData: // value for 'sheetData'
 *   },
 * });
 */
export function useCreateExerciseSheetMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseSheetMutation, CreateExerciseSheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseSheetMutation, CreateExerciseSheetMutationVariables>(CreateExerciseSheetDocument, options);
      }
export type CreateExerciseSheetMutationHookResult = ReturnType<typeof useCreateExerciseSheetMutation>;
export type CreateExerciseSheetMutationResult = Apollo.MutationResult<CreateExerciseSheetMutation>;
export type CreateExerciseSheetMutationOptions = Apollo.BaseMutationOptions<CreateExerciseSheetMutation, CreateExerciseSheetMutationVariables>;
export const DeleteExerciseCommentDocument = gql`
    mutation DeleteExerciseComment($deleteExerciseCommentId: ID!) {
  deleteExerciseComment(id: $deleteExerciseCommentId) {
    id
  }
}
    `;
export type DeleteExerciseCommentMutationFn = Apollo.MutationFunction<DeleteExerciseCommentMutation, DeleteExerciseCommentMutationVariables>;

/**
 * __useDeleteExerciseCommentMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseCommentMutation, { data, loading, error }] = useDeleteExerciseCommentMutation({
 *   variables: {
 *      deleteExerciseCommentId: // value for 'deleteExerciseCommentId'
 *   },
 * });
 */
export function useDeleteExerciseCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseCommentMutation, DeleteExerciseCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseCommentMutation, DeleteExerciseCommentMutationVariables>(DeleteExerciseCommentDocument, options);
      }
export type DeleteExerciseCommentMutationHookResult = ReturnType<typeof useDeleteExerciseCommentMutation>;
export type DeleteExerciseCommentMutationResult = Apollo.MutationResult<DeleteExerciseCommentMutation>;
export type DeleteExerciseCommentMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseCommentMutation, DeleteExerciseCommentMutationVariables>;
export const DeleteExerciseSheetDocument = gql`
    mutation deleteExerciseSheet($deleteExerciseSheetId: ID!) {
  deleteExerciseSheet(id: $deleteExerciseSheetId)
}
    `;
export type DeleteExerciseSheetMutationFn = Apollo.MutationFunction<DeleteExerciseSheetMutation, DeleteExerciseSheetMutationVariables>;

/**
 * __useDeleteExerciseSheetMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseSheetMutation, { data, loading, error }] = useDeleteExerciseSheetMutation({
 *   variables: {
 *      deleteExerciseSheetId: // value for 'deleteExerciseSheetId'
 *   },
 * });
 */
export function useDeleteExerciseSheetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseSheetMutation, DeleteExerciseSheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseSheetMutation, DeleteExerciseSheetMutationVariables>(DeleteExerciseSheetDocument, options);
      }
export type DeleteExerciseSheetMutationHookResult = ReturnType<typeof useDeleteExerciseSheetMutation>;
export type DeleteExerciseSheetMutationResult = Apollo.MutationResult<DeleteExerciseSheetMutation>;
export type DeleteExerciseSheetMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseSheetMutation, DeleteExerciseSheetMutationVariables>;
export const SelectExercisesDocument = gql`
    query selectExercises {
  exercises(take: 10, skip: 0) {
    id
    description
    solution
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
export const SelectExerciseDocument = gql`
    query selectExercise($exerciseId: ID!) {
  exercise(id: $exerciseId) {
    id
    status
    description
    solutionOptions
    alternativeDifficultyExercises {
      id
    }
    exerciseImage {
      id
      url
    }
    solution
    solutionImage {
      id
      url
    }
    solveIdea
    solveIdeaImage {
      id
      url
    }
    tags {
      id
      name
    }
    difficulty {
      ageGroup
      difficulty
    }
    helpingQuestions
    checks {
      ...ExerciseCheck
    }
  }
}
    ${ExerciseCheckFragmentDoc}`;

/**
 * __useSelectExerciseQuery__
 *
 * To run a query within a React component, call `useSelectExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectExerciseQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useSelectExerciseQuery(baseOptions: Apollo.QueryHookOptions<SelectExerciseQuery, SelectExerciseQueryVariables> & ({ variables: SelectExerciseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectExerciseQuery, SelectExerciseQueryVariables>(SelectExerciseDocument, options);
      }
export function useSelectExerciseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectExerciseQuery, SelectExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectExerciseQuery, SelectExerciseQueryVariables>(SelectExerciseDocument, options);
        }
export function useSelectExerciseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SelectExerciseQuery, SelectExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SelectExerciseQuery, SelectExerciseQueryVariables>(SelectExerciseDocument, options);
        }
export type SelectExerciseQueryHookResult = ReturnType<typeof useSelectExerciseQuery>;
export type SelectExerciseLazyQueryHookResult = ReturnType<typeof useSelectExerciseLazyQuery>;
export type SelectExerciseSuspenseQueryHookResult = ReturnType<typeof useSelectExerciseSuspenseQuery>;
export type SelectExerciseQueryResult = Apollo.QueryResult<SelectExerciseQuery, SelectExerciseQueryVariables>;
export const ExerciseHistoryByExerciseDocument = gql`
    query ExerciseHistoryByExercise($exerciseId: ID!) {
  exerciseHistoryByExercise(id: $exerciseId) {
    ...ExerciseHistory
  }
}
    ${ExerciseHistoryFragmentDoc}`;

/**
 * __useExerciseHistoryByExerciseQuery__
 *
 * To run a query within a React component, call `useExerciseHistoryByExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useExerciseHistoryByExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExerciseHistoryByExerciseQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useExerciseHistoryByExerciseQuery(baseOptions: Apollo.QueryHookOptions<ExerciseHistoryByExerciseQuery, ExerciseHistoryByExerciseQueryVariables> & ({ variables: ExerciseHistoryByExerciseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExerciseHistoryByExerciseQuery, ExerciseHistoryByExerciseQueryVariables>(ExerciseHistoryByExerciseDocument, options);
      }
export function useExerciseHistoryByExerciseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExerciseHistoryByExerciseQuery, ExerciseHistoryByExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExerciseHistoryByExerciseQuery, ExerciseHistoryByExerciseQueryVariables>(ExerciseHistoryByExerciseDocument, options);
        }
export function useExerciseHistoryByExerciseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExerciseHistoryByExerciseQuery, ExerciseHistoryByExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExerciseHistoryByExerciseQuery, ExerciseHistoryByExerciseQueryVariables>(ExerciseHistoryByExerciseDocument, options);
        }
export type ExerciseHistoryByExerciseQueryHookResult = ReturnType<typeof useExerciseHistoryByExerciseQuery>;
export type ExerciseHistoryByExerciseLazyQueryHookResult = ReturnType<typeof useExerciseHistoryByExerciseLazyQuery>;
export type ExerciseHistoryByExerciseSuspenseQueryHookResult = ReturnType<typeof useExerciseHistoryByExerciseSuspenseQuery>;
export type ExerciseHistoryByExerciseQueryResult = Apollo.QueryResult<ExerciseHistoryByExerciseQuery, ExerciseHistoryByExerciseQueryVariables>;
export const ExerciseSheetDocument = gql`
    query exerciseSheet($exerciseSheetId: ID!) {
  exerciseSheet(id: $exerciseSheetId) {
    id
    name
    sheetItems {
      id
      ageGroup
      level
      exercises {
        id
        exerciseImage {
          url
        }
        difficulty {
          ageGroup
          difficulty
        }
        description
      }
    }
    createdAt
    updatedAt
    createdBy {
      name
    }
  }
}
    `;

/**
 * __useExerciseSheetQuery__
 *
 * To run a query within a React component, call `useExerciseSheetQuery` and pass it any options that fit your needs.
 * When your component renders, `useExerciseSheetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExerciseSheetQuery({
 *   variables: {
 *      exerciseSheetId: // value for 'exerciseSheetId'
 *   },
 * });
 */
export function useExerciseSheetQuery(baseOptions: Apollo.QueryHookOptions<ExerciseSheetQuery, ExerciseSheetQueryVariables> & ({ variables: ExerciseSheetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExerciseSheetQuery, ExerciseSheetQueryVariables>(ExerciseSheetDocument, options);
      }
export function useExerciseSheetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExerciseSheetQuery, ExerciseSheetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExerciseSheetQuery, ExerciseSheetQueryVariables>(ExerciseSheetDocument, options);
        }
export function useExerciseSheetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExerciseSheetQuery, ExerciseSheetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExerciseSheetQuery, ExerciseSheetQueryVariables>(ExerciseSheetDocument, options);
        }
export type ExerciseSheetQueryHookResult = ReturnType<typeof useExerciseSheetQuery>;
export type ExerciseSheetLazyQueryHookResult = ReturnType<typeof useExerciseSheetLazyQuery>;
export type ExerciseSheetSuspenseQueryHookResult = ReturnType<typeof useExerciseSheetSuspenseQuery>;
export type ExerciseSheetQueryResult = Apollo.QueryResult<ExerciseSheetQuery, ExerciseSheetQueryVariables>;
export const ExerciseSheetsDocument = gql`
    query exerciseSheets {
  exerciseSheets {
    id
    name
    createdBy {
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useExerciseSheetsQuery__
 *
 * To run a query within a React component, call `useExerciseSheetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExerciseSheetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExerciseSheetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExerciseSheetsQuery(baseOptions?: Apollo.QueryHookOptions<ExerciseSheetsQuery, ExerciseSheetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExerciseSheetsQuery, ExerciseSheetsQueryVariables>(ExerciseSheetsDocument, options);
      }
export function useExerciseSheetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExerciseSheetsQuery, ExerciseSheetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExerciseSheetsQuery, ExerciseSheetsQueryVariables>(ExerciseSheetsDocument, options);
        }
export function useExerciseSheetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExerciseSheetsQuery, ExerciseSheetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExerciseSheetsQuery, ExerciseSheetsQueryVariables>(ExerciseSheetsDocument, options);
        }
export type ExerciseSheetsQueryHookResult = ReturnType<typeof useExerciseSheetsQuery>;
export type ExerciseSheetsLazyQueryHookResult = ReturnType<typeof useExerciseSheetsLazyQuery>;
export type ExerciseSheetsSuspenseQueryHookResult = ReturnType<typeof useExerciseSheetsSuspenseQuery>;
export type ExerciseSheetsQueryResult = Apollo.QueryResult<ExerciseSheetsQuery, ExerciseSheetsQueryVariables>;
export const ExerciseTagsDocument = gql`
    query ExerciseTags {
  exerciseTags {
    id
    name
    exerciseCount
    children {
      id
      name
      children {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useExerciseTagsQuery__
 *
 * To run a query within a React component, call `useExerciseTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExerciseTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExerciseTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExerciseTagsQuery(baseOptions?: Apollo.QueryHookOptions<ExerciseTagsQuery, ExerciseTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExerciseTagsQuery, ExerciseTagsQueryVariables>(ExerciseTagsDocument, options);
      }
export function useExerciseTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExerciseTagsQuery, ExerciseTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExerciseTagsQuery, ExerciseTagsQueryVariables>(ExerciseTagsDocument, options);
        }
export function useExerciseTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExerciseTagsQuery, ExerciseTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExerciseTagsQuery, ExerciseTagsQueryVariables>(ExerciseTagsDocument, options);
        }
export type ExerciseTagsQueryHookResult = ReturnType<typeof useExerciseTagsQuery>;
export type ExerciseTagsLazyQueryHookResult = ReturnType<typeof useExerciseTagsLazyQuery>;
export type ExerciseTagsSuspenseQueryHookResult = ReturnType<typeof useExerciseTagsSuspenseQuery>;
export type ExerciseTagsQueryResult = Apollo.QueryResult<ExerciseTagsQuery, ExerciseTagsQueryVariables>;
export const LoginDocument = gql`
    mutation login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    token
    user {
      id
      name
      userName
      email
      roles
      createdAt
      updatedAt
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
 *      name: // value for 'name'
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
export const LoginWithGoogleDocument = gql`
    mutation loginWithGoogle($googleToken: String!) {
  loginWithGoogle(googleToken: $googleToken) {
    user {
      id
      email
      name
      userName
      roles
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
export const RegisterDocument = gql`
    mutation register($data: UserRegisterInput!) {
  register(data: $data) {
    id
    userName
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SearchExercisesDocument = gql`
    query searchExercises($query: ExerciseSearchQuery!) {
  searchExercises(query: $query) {
    exercises {
      ...ExerciseListElem
    }
    totalCount
  }
}
    ${ExerciseListElemFragmentDoc}`;

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
export const StatsDocument = gql`
    query stats {
  globalStats {
    checkedExerciseCount
    totalExerciseCount
    contributionCalendar {
      fromDate
      toDate
      data {
        date
        level
        count
      }
    }
    exerciseHourlyCount {
      count
      hour
    }
    userLeaderboard {
      rank
      submittedExerciseCount
      user {
        id
        name
        avatarUrl
      }
    }
  }
}
    `;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export function useStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsSuspenseQueryHookResult = ReturnType<typeof useStatsSuspenseQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const UpdateExerciseDocument = gql`
    mutation UpdateExercise($id: ID!, $input: ExerciseUpdateInput!) {
  updateExercise(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateExerciseMutationFn = Apollo.MutationFunction<UpdateExerciseMutation, UpdateExerciseMutationVariables>;

/**
 * __useUpdateExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseMutation, { data, loading, error }] = useUpdateExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseMutation, UpdateExerciseMutationVariables>(UpdateExerciseDocument, options);
      }
export type UpdateExerciseMutationHookResult = ReturnType<typeof useUpdateExerciseMutation>;
export type UpdateExerciseMutationResult = Apollo.MutationResult<UpdateExerciseMutation>;
export type UpdateExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>;
export const UpdateExerciseSheetDocument = gql`
    mutation updateExerciseSheet($updateExerciseSheetId: ID!, $sheetData: UpdateExerciseSheetInput!) {
  updateExerciseSheet(id: $updateExerciseSheetId, sheetData: $sheetData) {
    id
  }
}
    `;
export type UpdateExerciseSheetMutationFn = Apollo.MutationFunction<UpdateExerciseSheetMutation, UpdateExerciseSheetMutationVariables>;

/**
 * __useUpdateExerciseSheetMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseSheetMutation, { data, loading, error }] = useUpdateExerciseSheetMutation({
 *   variables: {
 *      updateExerciseSheetId: // value for 'updateExerciseSheetId'
 *      sheetData: // value for 'sheetData'
 *   },
 * });
 */
export function useUpdateExerciseSheetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseSheetMutation, UpdateExerciseSheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseSheetMutation, UpdateExerciseSheetMutationVariables>(UpdateExerciseSheetDocument, options);
      }
export type UpdateExerciseSheetMutationHookResult = ReturnType<typeof useUpdateExerciseSheetMutation>;
export type UpdateExerciseSheetMutationResult = Apollo.MutationResult<UpdateExerciseSheetMutation>;
export type UpdateExerciseSheetMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseSheetMutation, UpdateExerciseSheetMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UserUpdateInput!) {
  updateUser(data: $data) {
    createdAt
    name
    userName
    email
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UsersDocument = gql`
    query users {
  users {
    id
    name
    userName
    email
    userName
    roles
    avatarUrl
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;