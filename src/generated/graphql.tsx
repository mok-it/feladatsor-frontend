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

export type AlertSeverity =
  | 'ERROR'
  | 'INFO'
  | 'SUCCESS'
  | 'WARNING';

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

export type Developer = {
  __typename: 'Developer';
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ExcelExportDeleteResult = {
  __typename: 'ExcelExportDeleteResult';
  success: Scalars['Boolean']['output'];
};

export type Exercise = {
  __typename: 'Exercise';
  alert?: Maybe<ExerciseAlert>;
  checks: Array<ExerciseCheck>;
  comments: Array<ExerciseComment>;
  contributors: Array<User>;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description: Scalars['String']['output'];
  difficulty: Array<ExerciseDifficulty>;
  exerciseImage?: Maybe<Image>;
  helpingQuestions: Array<Scalars['String']['output']>;
  history: Array<ExerciseHistory>;
  id: Scalars['ID']['output'];
  isCompetitionFinal?: Maybe<Scalars['Boolean']['output']>;
  sameLogicExerciseGroup?: Maybe<SameLogicExerciseGroup>;
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

export type ExerciseAlert = {
  __typename: 'ExerciseAlert';
  description: Scalars['String']['output'];
  severity: AlertSeverity;
};

export type ExerciseAlertInput = {
  description: Scalars['String']['input'];
  severity: AlertSeverity;
};

export type ExerciseCheck = {
  __typename: 'ExerciseCheck';
  contributors: Array<User>;
  createdAt: Scalars['String']['output'];
  exercise: Exercise;
  id: Scalars['ID']['output'];
  role: ExerciseCheckRole;
  type: ExerciseCheckType;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type ExerciseCheckFilter =
  | 'CHANGE_REQUIRED'
  | 'GOOD'
  | 'NEEDS_TO_BE_CHECKED'
  | 'TO_DELETE';

export type ExerciseCheckInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  contributors: Array<User>;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  exercise: Exercise;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
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
  fieldType: ExerciseHistoryFieldType;
  id: Scalars['ID']['output'];
  newValue?: Maybe<HistoryValue>;
  oldValue?: Maybe<HistoryValue>;
  updatedAt: Scalars['String']['output'];
};

export type ExerciseHistoryFieldType =
  | 'ARRAY'
  | 'BOOLEAN'
  | 'ENUM'
  | 'IMAGE'
  | 'JSON'
  | 'TEXT';

export type ExerciseHourlyGroup = {
  __typename: 'ExerciseHourlyGroup';
  count: Scalars['Int']['output'];
  hour: Scalars['String']['output'];
};

export type ExerciseInput = {
  alert?: InputMaybe<ExerciseAlertInput>;
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  exerciseCheck?: InputMaybe<ExerciseCheckFilter>;
  includeTags?: InputMaybe<Array<Scalars['ID']['input']>>;
  isCompetitionFinal?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  queryStr?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
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
  status: ExerciseSheetStatus;
  talonItems: Array<OrderedExercise>;
  updatedAt: Scalars['String']['output'];
};

export type ExerciseSheetInput = {
  name: Scalars['String']['input'];
  sheetItems?: InputMaybe<Array<ExerciseSheetItemInput>>;
};

export type ExerciseSheetItem = {
  __typename: 'ExerciseSheetItem';
  ageGroup: ExerciseAgeGroup;
  exercises: Array<OrderedExercise>;
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
};

export type ExerciseSheetItemInput = {
  ageGroup: ExerciseAgeGroup;
  exercises: Array<OrderedExerciseInput>;
  level: Scalars['Int']['input'];
};

export type ExerciseSheetStatus =
  | 'APPROVED'
  | 'CREATED'
  | 'DELETED'
  | 'DRAFT';

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
  alert?: InputMaybe<ExerciseAlertInput>;
  comment?: InputMaybe<Scalars['String']['input']>;
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
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

export type ExportResult = {
  __typename: 'ExportResult';
  createdAt: Scalars['String']['output'];
  exportedBy: User;
  fileName: Scalars['String']['output'];
  fileSize: Scalars['String']['output'];
  id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GlobalStats = {
  __typename: 'GlobalStats';
  checkedExerciseCount: Scalars['Int']['output'];
  contributionCalendar: ContributionCalendar;
  exerciseHourlyCount: Array<ExerciseHourlyGroup>;
  totalExerciseCount: Scalars['Int']['output'];
  userLeaderboard: Array<LeaderBoardUser>;
};

export type HistoryStringValue = {
  __typename: 'HistoryStringValue';
  value: Scalars['String']['output'];
};

export type HistoryTagArray = {
  __typename: 'HistoryTagArray';
  tags: Array<ExerciseTag>;
};

export type HistoryUserArray = {
  __typename: 'HistoryUserArray';
  users: Array<User>;
};

export type HistoryValue = HistoryStringValue | HistoryTagArray | HistoryUserArray | Image;

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
  cloneExerciseToNew: Exercise;
  createExercise: Exercise;
  createExerciseCheck: ExerciseCheck;
  createExerciseComment: ExerciseComment;
  createExerciseSheet: ExerciseSheet;
  createExerciseTag: ExerciseTag;
  createSameLogicExerciseGroup: SameLogicExerciseGroup;
  deleteExcelExport: ExcelExportDeleteResult;
  deleteExerciseComment: ExerciseComment;
  deleteExerciseSheet: Scalars['Boolean']['output'];
  deleteExerciseTag: Scalars['Boolean']['output'];
  exportExcel?: Maybe<ExportResult>;
  login?: Maybe<LoginResponse>;
  loginWithGoogle?: Maybe<LoginResponse>;
  register: User;
  updateExercise: Exercise;
  updateExerciseComment: ExerciseComment;
  updateExerciseSheet: ExerciseSheet;
  updateExerciseTag: ExerciseTag;
  /** Update by id, or if not provided, use the user from the JWT token */
  updateUser: User;
  voteOnDeveloper?: Maybe<Developer>;
};


export type MutationChangePermissionsArgs = {
  permissions: Array<Role>;
  userId: Scalars['ID']['input'];
};


export type MutationCloneExerciseToNewArgs = {
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
};


export type MutationCreateExerciseArgs = {
  input: ExerciseInput;
};


export type MutationCreateExerciseCheckArgs = {
  data: ExerciseCheckInput;
};


export type MutationCreateExerciseCommentArgs = {
  comment: Scalars['String']['input'];
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
  exerciseId: Scalars['ID']['input'];
};


export type MutationCreateExerciseSheetArgs = {
  sheetData: ExerciseSheetInput;
};


export type MutationCreateExerciseTagArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateSameLogicExerciseGroupArgs = {
  data?: InputMaybe<SameLogicExerciseGroupInput>;
};


export type MutationDeleteExcelExportArgs = {
  exportId: Scalars['String']['input'];
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
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
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


export type MutationVoteOnDeveloperArgs = {
  id: Scalars['ID']['input'];
};

export type OrderDirection =
  | 'ASC'
  | 'DESC';

export type OrderedExercise = {
  __typename: 'OrderedExercise';
  exercise: Exercise;
  order: Scalars['Int']['output'];
};

export type OrderedExerciseInput = {
  exerciseID: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
};

export type Query = {
  __typename: 'Query';
  commentsByExercise: Array<ExerciseComment>;
  exercise?: Maybe<Exercise>;
  exerciseComment?: Maybe<ExerciseComment>;
  exerciseHistoryByExercise: Array<ExerciseHistory>;
  exerciseHistoryByField: Array<ExerciseHistory>;
  exerciseSheet?: Maybe<ExerciseSheet>;
  exerciseSheets: Array<ExerciseSheet>;
  exerciseTag?: Maybe<ExerciseTag>;
  exerciseTags: Array<ExerciseTag>;
  exercises: Array<Exercise>;
  exercisesCount: Scalars['Int']['output'];
  flatExerciseTags: Array<ExerciseTag>;
  funkyPool: Array<Developer>;
  globalStats?: Maybe<GlobalStats>;
  listExcelExports: Array<ExportResult>;
  me?: Maybe<User>;
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


export type QueryExerciseHistoryByFieldArgs = {
  exerciseId: Scalars['ID']['input'];
  field: Scalars['String']['input'];
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
  /** Should bypass any other role check, can do anything */
  | 'ADMIN'
  /** Able to check an exercise */
  | 'CHECK_EXERCISE'
  /** Able to clone an exercise */
  | 'CLONE_EXERCISE'
  /** Ability to view and manipulate exercise sheets */
  | 'EXERCISE_SHEET'
  /** Able to change the exercise's state to Deleted or Done */
  | 'FINALIZE_EXERCISE'
  /** Able to list all exercises */
  | 'LIST_EXERCISES'
  /** Can add comments to exercise sheets */
  | 'PROOFREAD_EXERCISE_SHEET'
  /** Is able to submit new Exercises, and list his own */
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

export type SameLogicExerciseGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
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
  status?: InputMaybe<ExerciseSheetStatus>;
  talonItems?: InputMaybe<Array<OrderedExerciseInput>>;
};

export type User = {
  __typename: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  comments: Array<ExerciseComment>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<Role>;
  stats: UserStats;
  updatedAt: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};


export type UserCommentsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type UserExercisesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type UserRegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type UserStats = {
  __typename: 'UserStats';
  checkedExerciseCount: Scalars['Int']['output'];
  contributionCalendar: ContributionCalendar;
  totalExerciseCount: Scalars['Int']['output'];
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

export type CloneExerciseToNewMutationVariables = Exact<{
  cloneExerciseToNewId: Scalars['ID']['input'];
  contributors?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type CloneExerciseToNewMutation = { __typename: 'Mutation', cloneExerciseToNew: { __typename: 'Exercise', id: string } };

export type CommentsByExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
}>;


export type CommentsByExerciseQuery = { __typename: 'Query', commentsByExercise: Array<{ __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, updatedAt: string, createdBy: { __typename: 'User', id: string, name: string, avatarUrl?: string | null }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> }> };

export type CreateExerciseMutationVariables = Exact<{
  input: ExerciseInput;
}>;


export type CreateExerciseMutation = { __typename: 'Mutation', createExercise: { __typename: 'Exercise', id: string } };

export type CreateExerciseCheckMutationVariables = Exact<{
  input: ExerciseCheckInput;
}>;


export type CreateExerciseCheckMutation = { __typename: 'Mutation', createExerciseCheck: { __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, updatedAt: string, user: { __typename: 'User', id: string, name: string }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> } };

export type CreateExerciseCommentMutationVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
  contributors: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type CreateExerciseCommentMutation = { __typename: 'Mutation', createExerciseComment: { __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, updatedAt: string, createdBy: { __typename: 'User', id: string, name: string, avatarUrl?: string | null }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> } };

export type CreateExerciseSheetMutationVariables = Exact<{
  sheetData: ExerciseSheetInput;
}>;


export type CreateExerciseSheetMutation = { __typename: 'Mutation', createExerciseSheet: { __typename: 'ExerciseSheet', id: string, name: string, createdAt: string } };

export type CreateExerciseTagMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateExerciseTagMutation = { __typename: 'Mutation', createExerciseTag: { __typename: 'ExerciseTag', id: string } };

export type DeleteExcelExportMutationVariables = Exact<{
  exportId: Scalars['String']['input'];
}>;


export type DeleteExcelExportMutation = { __typename: 'Mutation', deleteExcelExport: { __typename: 'ExcelExportDeleteResult', success: boolean } };

export type DeleteExerciseCommentMutationVariables = Exact<{
  deleteExerciseCommentId: Scalars['ID']['input'];
}>;


export type DeleteExerciseCommentMutation = { __typename: 'Mutation', deleteExerciseComment: { __typename: 'ExerciseComment', id: string } };

export type DeleteExerciseSheetMutationVariables = Exact<{
  deleteExerciseSheetId: Scalars['ID']['input'];
}>;


export type DeleteExerciseSheetMutation = { __typename: 'Mutation', deleteExerciseSheet: boolean };

export type DeleteExerciseTagMutationVariables = Exact<{
  deleteExerciseTagId: Scalars['ID']['input'];
}>;


export type DeleteExerciseTagMutation = { __typename: 'Mutation', deleteExerciseTag: boolean };

export type SelectExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type SelectExercisesQuery = { __typename: 'Query', exercises: Array<{ __typename: 'Exercise', id: string, description: string, solution: string, helpingQuestions: Array<string>, source?: string | null, createdAt: string, updatedAt: string, difficulty: Array<{ __typename: 'ExerciseDifficulty', difficulty: number, ageGroup: ExerciseAgeGroup }>, history: Array<{ __typename: 'ExerciseHistory', id: string, exercise: { __typename: 'Exercise', id: string } }>, checks: Array<{ __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, user: { __typename: 'User', id: string, name: string } }>, createdBy: { __typename: 'User', id: string, name: string } }> };

export type SelectExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
}>;


export type SelectExerciseQuery = { __typename: 'Query', exercise?: { __typename: 'Exercise', id: string, status: ExerciseStatus, description: string, solutionOptions: Array<string>, solution: string, solveIdea?: string | null, source?: string | null, createdAt: string, helpingQuestions: Array<string>, alert?: { __typename: 'ExerciseAlert', description: string, severity: AlertSeverity } | null, sameLogicExerciseGroup?: { __typename: 'SameLogicExerciseGroup', exercises: Array<{ __typename: 'Exercise', id: string, description: string, createdAt: string, difficulty: Array<{ __typename: 'ExerciseDifficulty', difficulty: number, ageGroup: ExerciseAgeGroup }>, exerciseImage?: { __typename: 'Image', url: string } | null, tags: Array<{ __typename: 'Tag', id: string, name: string }>, createdBy: { __typename: 'User', id: string, userName: string, avatarUrl?: string | null } }> } | null, exerciseImage?: { __typename: 'Image', id: string, url: string } | null, solutionImage?: { __typename: 'Image', id: string, url: string } | null, createdBy: { __typename: 'User', id: string, name: string, avatarUrl?: string | null }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }>, solveIdeaImage?: { __typename: 'Image', id: string, url: string } | null, tags: Array<{ __typename: 'Tag', id: string, name: string }>, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }>, checks: Array<{ __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, updatedAt: string, user: { __typename: 'User', id: string, name: string }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> }> } | null };

export type ExerciseHistoryByExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID']['input'];
}>;


export type ExerciseHistoryByExerciseQuery = { __typename: 'Query', exerciseHistoryByExercise: Array<{ __typename: 'ExerciseHistory', id: string, field: string, fieldType: ExerciseHistoryFieldType, createdAt: string, updatedAt: string, oldValue?: { __typename: 'HistoryStringValue', value: string } | { __typename: 'HistoryTagArray', tags: Array<{ __typename: 'ExerciseTag', id: string, name: string }> } | { __typename: 'HistoryUserArray', users: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> } | { __typename: 'Image', id: string, url: string } | null, newValue?: { __typename: 'HistoryStringValue', value: string } | { __typename: 'HistoryTagArray', tags: Array<{ __typename: 'ExerciseTag', id: string, name: string }> } | { __typename: 'HistoryUserArray', users: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> } | { __typename: 'Image', id: string, url: string } | null, createdBy: { __typename: 'User', id: string, name: string } }> };

export type ExerciseSheetQueryVariables = Exact<{
  exerciseSheetId: Scalars['ID']['input'];
}>;


export type ExerciseSheetQuery = { __typename: 'Query', exerciseSheet?: { __typename: 'ExerciseSheet', id: string, name: string, status: ExerciseSheetStatus, createdAt: string, updatedAt: string, sheetItems: Array<{ __typename: 'ExerciseSheetItem', id: string, ageGroup: ExerciseAgeGroup, level: number, exercises: Array<{ __typename: 'OrderedExercise', order: number, exercise: { __typename: 'Exercise', id: string, description: string, exerciseImage?: { __typename: 'Image', url: string } | null, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }> } }> }>, talonItems: Array<{ __typename: 'OrderedExercise', order: number, exercise: { __typename: 'Exercise', id: string, description: string, exerciseImage?: { __typename: 'Image', url: string } | null, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }> } }>, createdBy: { __typename: 'User', name: string } } | null };

export type ExerciseSheetsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExerciseSheetsQuery = { __typename: 'Query', exerciseSheets: Array<{ __typename: 'ExerciseSheet', id: string, name: string, createdAt: string, updatedAt: string, createdBy: { __typename: 'User', name: string } }> };

export type ExerciseTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExerciseTagsQuery = { __typename: 'Query', flatExerciseTags: Array<{ __typename: 'ExerciseTag', id: string, name: string, exerciseCount: number, children: Array<{ __typename: 'ExerciseTag', id: string }> }> };

export type ExportExcelMutationVariables = Exact<{ [key: string]: never; }>;


export type ExportExcelMutation = { __typename: 'Mutation', exportExcel?: { __typename: 'ExportResult', id: string, url: string } | null };

export type FlatExerciseTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type FlatExerciseTagsQuery = { __typename: 'Query', flatExerciseTags: Array<{ __typename: 'ExerciseTag', id: string, name: string }> };

export type ExerciseCheckFragment = { __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, updatedAt: string, user: { __typename: 'User', id: string, name: string }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> };

export type ExerciseCommentFragment = { __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, updatedAt: string, createdBy: { __typename: 'User', id: string, name: string, avatarUrl?: string | null }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> };

export type ExerciseHistoryFragment = { __typename: 'ExerciseHistory', id: string, field: string, fieldType: ExerciseHistoryFieldType, createdAt: string, updatedAt: string, oldValue?: { __typename: 'HistoryStringValue', value: string } | { __typename: 'HistoryTagArray', tags: Array<{ __typename: 'ExerciseTag', id: string, name: string }> } | { __typename: 'HistoryUserArray', users: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> } | { __typename: 'Image', id: string, url: string } | null, newValue?: { __typename: 'HistoryStringValue', value: string } | { __typename: 'HistoryTagArray', tags: Array<{ __typename: 'ExerciseTag', id: string, name: string }> } | { __typename: 'HistoryUserArray', users: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> } | { __typename: 'Image', id: string, url: string } | null, createdBy: { __typename: 'User', id: string, name: string } };

export type ExerciseListElemFragment = { __typename: 'Exercise', id: string, description: string, status: ExerciseStatus, helpingQuestions: Array<string>, solutionOptions: Array<string>, solution: string, createdAt: string, exerciseImage?: { __typename: 'Image', url: string } | null, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }>, tags: Array<{ __typename: 'Tag', id: string, name: string }>, checks: Array<{ __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, updatedAt: string, user: { __typename: 'User', id: string, name: string }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> }> };

export type SameLogicExerciseFragment = { __typename: 'Exercise', id: string, description: string, createdAt: string, difficulty: Array<{ __typename: 'ExerciseDifficulty', difficulty: number, ageGroup: ExerciseAgeGroup }>, exerciseImage?: { __typename: 'Image', url: string } | null, tags: Array<{ __typename: 'Tag', id: string, name: string }>, createdBy: { __typename: 'User', id: string, userName: string, avatarUrl?: string | null } };

export type FunkyPoolQueryVariables = Exact<{ [key: string]: never; }>;


export type FunkyPoolQuery = { __typename: 'Query', funkyPool: Array<{ __typename: 'Developer', id: string, count: number, name: string }> };

export type ListExcelExportsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListExcelExportsQuery = { __typename: 'Query', listExcelExports: Array<{ __typename: 'ExportResult', id: string, fileName: string, fileSize: string, url: string, createdAt: string, exportedBy: { __typename: 'User', id: string, name: string, avatarUrl?: string | null } }> };

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


export type SearchExercisesQuery = { __typename: 'Query', searchExercises: { __typename: 'ExerciseSearchResult', totalCount: number, exercises: Array<{ __typename: 'Exercise', id: string, description: string, status: ExerciseStatus, helpingQuestions: Array<string>, solutionOptions: Array<string>, solution: string, createdAt: string, exerciseImage?: { __typename: 'Image', url: string } | null, difficulty: Array<{ __typename: 'ExerciseDifficulty', ageGroup: ExerciseAgeGroup, difficulty: number }>, tags: Array<{ __typename: 'Tag', id: string, name: string }>, checks: Array<{ __typename: 'ExerciseCheck', id: string, type: ExerciseCheckType, createdAt: string, updatedAt: string, user: { __typename: 'User', id: string, name: string }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> }> }> } };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename: 'Query', globalStats?: { __typename: 'GlobalStats', checkedExerciseCount: number, totalExerciseCount: number, contributionCalendar: { __typename: 'ContributionCalendar', fromDate: string, toDate: string, data: Array<{ __typename: 'ContributionCalendarDay', date: string, level: number, count: number }> }, exerciseHourlyCount: Array<{ __typename: 'ExerciseHourlyGroup', count: number, hour: string }>, userLeaderboard: Array<{ __typename: 'LeaderBoardUser', rank: number, submittedExerciseCount: number, user: { __typename: 'User', id: string, name: string, avatarUrl?: string | null } }> } | null };

export type UpdateExerciseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ExerciseUpdateInput;
}>;


export type UpdateExerciseMutation = { __typename: 'Mutation', updateExercise: { __typename: 'Exercise', id: string } };

export type UpdateExerciseCommentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
  contributors: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type UpdateExerciseCommentMutation = { __typename: 'Mutation', updateExerciseComment: { __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, updatedAt: string, createdBy: { __typename: 'User', id: string, name: string, avatarUrl?: string | null }, contributors: Array<{ __typename: 'User', id: string, name: string, avatarUrl?: string | null }> } };

export type UpdateExerciseSheetMutationVariables = Exact<{
  updateExerciseSheetId: Scalars['ID']['input'];
  sheetData: UpdateExerciseSheetInput;
}>;


export type UpdateExerciseSheetMutation = { __typename: 'Mutation', updateExerciseSheet: { __typename: 'ExerciseSheet', id: string } };

export type UpdateExerciseTagMutationVariables = Exact<{
  updateExerciseTagId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateExerciseTagMutation = { __typename: 'Mutation', updateExerciseTag: { __typename: 'ExerciseTag', id: string } };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename: 'Mutation', updateUser: { __typename: 'User', createdAt: string, name: string, userName: string, email: string } };

export type UserExerciseFragment = { __typename: 'Exercise', id: string, description: string, createdAt: string, status: ExerciseStatus };

export type UserCommentFragment = { __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, exercise: { __typename: 'Exercise', id: string, description: string } };

export type UserAvatarFragment = { __typename: 'User', id: string, name: string, avatarUrl?: string | null };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename: 'Query', user?: { __typename: 'User', id: string, name: string, avatarUrl?: string | null, email: string, stats: { __typename: 'UserStats', checkedExerciseCount: number, totalExerciseCount: number } } | null };

export type SelectUserExercisesQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SelectUserExercisesQuery = { __typename: 'Query', user?: { __typename: 'User', id: string, exercises: Array<{ __typename: 'Exercise', id: string, description: string, createdAt: string, status: ExerciseStatus }> } | null };

export type SelectUserCommentsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SelectUserCommentsQuery = { __typename: 'Query', user?: { __typename: 'User', id: string, comments: Array<{ __typename: 'ExerciseComment', id: string, comment: string, createdAt: string, exercise: { __typename: 'Exercise', id: string, description: string } }> } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename: 'Query', users: Array<{ __typename: 'User', id: string, name: string, userName: string, email: string, roles: Array<Role>, avatarUrl?: string | null }> };

export type VoteOnDeveloperMutationVariables = Exact<{
  voteOnDeveloperId: Scalars['ID']['input'];
}>;


export type VoteOnDeveloperMutation = { __typename: 'Mutation', voteOnDeveloper?: { __typename: 'Developer', id: string } | null };

export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  id
  name
  avatarUrl
}
    `;
export const ExerciseCommentFragmentDoc = gql`
    fragment ExerciseComment on ExerciseComment {
  id
  comment
  createdAt
  updatedAt
  createdBy {
    id
    ...UserAvatar
  }
  contributors {
    id
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const ExerciseHistoryFragmentDoc = gql`
    fragment ExerciseHistory on ExerciseHistory {
  id
  field
  oldValue {
    ... on Image {
      id
      url
    }
    ... on HistoryStringValue {
      value
    }
    ... on HistoryTagArray {
      tags {
        id
        name
      }
    }
    ... on HistoryUserArray {
      users {
        id
        name
        avatarUrl
      }
    }
  }
  newValue {
    ... on Image {
      id
      url
    }
    ... on HistoryStringValue {
      value
    }
    ... on HistoryTagArray {
      tags {
        id
        name
      }
    }
    ... on HistoryUserArray {
      users {
        id
        name
        avatarUrl
      }
    }
  }
  fieldType
  createdAt
  updatedAt
  createdBy {
    id
    name
  }
}
    `;
export const ExerciseCheckFragmentDoc = gql`
    fragment ExerciseCheck on ExerciseCheck {
  id
  type
  createdAt
  updatedAt
  user {
    id
    name
  }
  contributors {
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
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
  helpingQuestions
  solutionOptions
  solution
  createdAt
  checks {
    ...ExerciseCheck
  }
}
    ${ExerciseCheckFragmentDoc}`;
export const SameLogicExerciseFragmentDoc = gql`
    fragment SameLogicExercise on Exercise {
  id
  description
  difficulty {
    difficulty
    ageGroup
  }
  exerciseImage {
    url
  }
  tags {
    id
    name
  }
  createdAt
  createdBy {
    id
    userName
    avatarUrl
  }
}
    `;
export const UserExerciseFragmentDoc = gql`
    fragment UserExercise on Exercise {
  id
  description
  createdAt
  status
}
    `;
export const UserCommentFragmentDoc = gql`
    fragment UserComment on ExerciseComment {
  id
  comment
  createdAt
  exercise {
    id
    description
  }
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
export const CloneExerciseToNewDocument = gql`
    mutation CloneExerciseToNew($cloneExerciseToNewId: ID!, $contributors: [ID!]) {
  cloneExerciseToNew(id: $cloneExerciseToNewId, contributors: $contributors) {
    id
  }
}
    `;
export type CloneExerciseToNewMutationFn = Apollo.MutationFunction<CloneExerciseToNewMutation, CloneExerciseToNewMutationVariables>;

/**
 * __useCloneExerciseToNewMutation__
 *
 * To run a mutation, you first call `useCloneExerciseToNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloneExerciseToNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cloneExerciseToNewMutation, { data, loading, error }] = useCloneExerciseToNewMutation({
 *   variables: {
 *      cloneExerciseToNewId: // value for 'cloneExerciseToNewId'
 *      contributors: // value for 'contributors'
 *   },
 * });
 */
export function useCloneExerciseToNewMutation(baseOptions?: Apollo.MutationHookOptions<CloneExerciseToNewMutation, CloneExerciseToNewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloneExerciseToNewMutation, CloneExerciseToNewMutationVariables>(CloneExerciseToNewDocument, options);
      }
export type CloneExerciseToNewMutationHookResult = ReturnType<typeof useCloneExerciseToNewMutation>;
export type CloneExerciseToNewMutationResult = Apollo.MutationResult<CloneExerciseToNewMutation>;
export type CloneExerciseToNewMutationOptions = Apollo.BaseMutationOptions<CloneExerciseToNewMutation, CloneExerciseToNewMutationVariables>;
export const CommentsByExerciseDocument = gql`
    query commentsByExercise($exerciseId: ID!) {
  commentsByExercise(id: $exerciseId) {
    ...ExerciseComment
  }
}
    ${ExerciseCommentFragmentDoc}`;

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
    mutation CreateExerciseComment($exerciseId: ID!, $comment: String!, $contributors: [ID!]!) {
  createExerciseComment(
    exerciseId: $exerciseId
    comment: $comment
    contributors: $contributors
  ) {
    ...ExerciseComment
  }
}
    ${ExerciseCommentFragmentDoc}`;
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
 *      contributors: // value for 'contributors'
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
export const CreateExerciseTagDocument = gql`
    mutation CreateExerciseTag($name: String!, $parentId: ID) {
  createExerciseTag(name: $name, parentId: $parentId) {
    id
  }
}
    `;
export type CreateExerciseTagMutationFn = Apollo.MutationFunction<CreateExerciseTagMutation, CreateExerciseTagMutationVariables>;

/**
 * __useCreateExerciseTagMutation__
 *
 * To run a mutation, you first call `useCreateExerciseTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseTagMutation, { data, loading, error }] = useCreateExerciseTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateExerciseTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseTagMutation, CreateExerciseTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseTagMutation, CreateExerciseTagMutationVariables>(CreateExerciseTagDocument, options);
      }
export type CreateExerciseTagMutationHookResult = ReturnType<typeof useCreateExerciseTagMutation>;
export type CreateExerciseTagMutationResult = Apollo.MutationResult<CreateExerciseTagMutation>;
export type CreateExerciseTagMutationOptions = Apollo.BaseMutationOptions<CreateExerciseTagMutation, CreateExerciseTagMutationVariables>;
export const DeleteExcelExportDocument = gql`
    mutation DeleteExcelExport($exportId: String!) {
  deleteExcelExport(exportId: $exportId) {
    success
  }
}
    `;
export type DeleteExcelExportMutationFn = Apollo.MutationFunction<DeleteExcelExportMutation, DeleteExcelExportMutationVariables>;

/**
 * __useDeleteExcelExportMutation__
 *
 * To run a mutation, you first call `useDeleteExcelExportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExcelExportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExcelExportMutation, { data, loading, error }] = useDeleteExcelExportMutation({
 *   variables: {
 *      exportId: // value for 'exportId'
 *   },
 * });
 */
export function useDeleteExcelExportMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExcelExportMutation, DeleteExcelExportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExcelExportMutation, DeleteExcelExportMutationVariables>(DeleteExcelExportDocument, options);
      }
export type DeleteExcelExportMutationHookResult = ReturnType<typeof useDeleteExcelExportMutation>;
export type DeleteExcelExportMutationResult = Apollo.MutationResult<DeleteExcelExportMutation>;
export type DeleteExcelExportMutationOptions = Apollo.BaseMutationOptions<DeleteExcelExportMutation, DeleteExcelExportMutationVariables>;
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
export const DeleteExerciseTagDocument = gql`
    mutation DeleteExerciseTag($deleteExerciseTagId: ID!) {
  deleteExerciseTag(id: $deleteExerciseTagId)
}
    `;
export type DeleteExerciseTagMutationFn = Apollo.MutationFunction<DeleteExerciseTagMutation, DeleteExerciseTagMutationVariables>;

/**
 * __useDeleteExerciseTagMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseTagMutation, { data, loading, error }] = useDeleteExerciseTagMutation({
 *   variables: {
 *      deleteExerciseTagId: // value for 'deleteExerciseTagId'
 *   },
 * });
 */
export function useDeleteExerciseTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseTagMutation, DeleteExerciseTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseTagMutation, DeleteExerciseTagMutationVariables>(DeleteExerciseTagDocument, options);
      }
export type DeleteExerciseTagMutationHookResult = ReturnType<typeof useDeleteExerciseTagMutation>;
export type DeleteExerciseTagMutationResult = Apollo.MutationResult<DeleteExerciseTagMutation>;
export type DeleteExerciseTagMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseTagMutation, DeleteExerciseTagMutationVariables>;
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
    alert {
      description
      severity
    }
    description
    solutionOptions
    sameLogicExerciseGroup {
      exercises {
        ...SameLogicExercise
      }
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
    source
    createdAt
    createdBy {
      id
      name
      avatarUrl
    }
    contributors {
      id
      name
      avatarUrl
    }
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
    ${SameLogicExerciseFragmentDoc}
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
    status
    sheetItems {
      id
      ageGroup
      level
      exercises {
        order
        exercise {
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
    }
    talonItems {
      order
      exercise {
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
  flatExerciseTags {
    id
    name
    exerciseCount
    children {
      id
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
export const ExportExcelDocument = gql`
    mutation ExportExcel {
  exportExcel {
    id
    url
  }
}
    `;
export type ExportExcelMutationFn = Apollo.MutationFunction<ExportExcelMutation, ExportExcelMutationVariables>;

/**
 * __useExportExcelMutation__
 *
 * To run a mutation, you first call `useExportExcelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExportExcelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exportExcelMutation, { data, loading, error }] = useExportExcelMutation({
 *   variables: {
 *   },
 * });
 */
export function useExportExcelMutation(baseOptions?: Apollo.MutationHookOptions<ExportExcelMutation, ExportExcelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExportExcelMutation, ExportExcelMutationVariables>(ExportExcelDocument, options);
      }
export type ExportExcelMutationHookResult = ReturnType<typeof useExportExcelMutation>;
export type ExportExcelMutationResult = Apollo.MutationResult<ExportExcelMutation>;
export type ExportExcelMutationOptions = Apollo.BaseMutationOptions<ExportExcelMutation, ExportExcelMutationVariables>;
export const FlatExerciseTagsDocument = gql`
    query flatExerciseTags {
  flatExerciseTags {
    id
    name
  }
}
    `;

/**
 * __useFlatExerciseTagsQuery__
 *
 * To run a query within a React component, call `useFlatExerciseTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlatExerciseTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlatExerciseTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFlatExerciseTagsQuery(baseOptions?: Apollo.QueryHookOptions<FlatExerciseTagsQuery, FlatExerciseTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlatExerciseTagsQuery, FlatExerciseTagsQueryVariables>(FlatExerciseTagsDocument, options);
      }
export function useFlatExerciseTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlatExerciseTagsQuery, FlatExerciseTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlatExerciseTagsQuery, FlatExerciseTagsQueryVariables>(FlatExerciseTagsDocument, options);
        }
export function useFlatExerciseTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FlatExerciseTagsQuery, FlatExerciseTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FlatExerciseTagsQuery, FlatExerciseTagsQueryVariables>(FlatExerciseTagsDocument, options);
        }
export type FlatExerciseTagsQueryHookResult = ReturnType<typeof useFlatExerciseTagsQuery>;
export type FlatExerciseTagsLazyQueryHookResult = ReturnType<typeof useFlatExerciseTagsLazyQuery>;
export type FlatExerciseTagsSuspenseQueryHookResult = ReturnType<typeof useFlatExerciseTagsSuspenseQuery>;
export type FlatExerciseTagsQueryResult = Apollo.QueryResult<FlatExerciseTagsQuery, FlatExerciseTagsQueryVariables>;
export const FunkyPoolDocument = gql`
    query FunkyPool {
  funkyPool {
    id
    count
    name
  }
}
    `;

/**
 * __useFunkyPoolQuery__
 *
 * To run a query within a React component, call `useFunkyPoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useFunkyPoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFunkyPoolQuery({
 *   variables: {
 *   },
 * });
 */
export function useFunkyPoolQuery(baseOptions?: Apollo.QueryHookOptions<FunkyPoolQuery, FunkyPoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FunkyPoolQuery, FunkyPoolQueryVariables>(FunkyPoolDocument, options);
      }
export function useFunkyPoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FunkyPoolQuery, FunkyPoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FunkyPoolQuery, FunkyPoolQueryVariables>(FunkyPoolDocument, options);
        }
export function useFunkyPoolSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FunkyPoolQuery, FunkyPoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FunkyPoolQuery, FunkyPoolQueryVariables>(FunkyPoolDocument, options);
        }
export type FunkyPoolQueryHookResult = ReturnType<typeof useFunkyPoolQuery>;
export type FunkyPoolLazyQueryHookResult = ReturnType<typeof useFunkyPoolLazyQuery>;
export type FunkyPoolSuspenseQueryHookResult = ReturnType<typeof useFunkyPoolSuspenseQuery>;
export type FunkyPoolQueryResult = Apollo.QueryResult<FunkyPoolQuery, FunkyPoolQueryVariables>;
export const ListExcelExportsDocument = gql`
    query ListExcelExports {
  listExcelExports {
    id
    fileName
    fileSize
    url
    exportedBy {
      id
      name
      avatarUrl
    }
    createdAt
  }
}
    `;

/**
 * __useListExcelExportsQuery__
 *
 * To run a query within a React component, call `useListExcelExportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListExcelExportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListExcelExportsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListExcelExportsQuery(baseOptions?: Apollo.QueryHookOptions<ListExcelExportsQuery, ListExcelExportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListExcelExportsQuery, ListExcelExportsQueryVariables>(ListExcelExportsDocument, options);
      }
export function useListExcelExportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListExcelExportsQuery, ListExcelExportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListExcelExportsQuery, ListExcelExportsQueryVariables>(ListExcelExportsDocument, options);
        }
export function useListExcelExportsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListExcelExportsQuery, ListExcelExportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListExcelExportsQuery, ListExcelExportsQueryVariables>(ListExcelExportsDocument, options);
        }
export type ListExcelExportsQueryHookResult = ReturnType<typeof useListExcelExportsQuery>;
export type ListExcelExportsLazyQueryHookResult = ReturnType<typeof useListExcelExportsLazyQuery>;
export type ListExcelExportsSuspenseQueryHookResult = ReturnType<typeof useListExcelExportsSuspenseQuery>;
export type ListExcelExportsQueryResult = Apollo.QueryResult<ListExcelExportsQuery, ListExcelExportsQueryVariables>;
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
export const UpdateExerciseCommentDocument = gql`
    mutation UpdateExerciseComment($id: ID!, $comment: String!, $contributors: [ID!]!) {
  updateExerciseComment(id: $id, comment: $comment, contributors: $contributors) {
    ...ExerciseComment
  }
}
    ${ExerciseCommentFragmentDoc}`;
export type UpdateExerciseCommentMutationFn = Apollo.MutationFunction<UpdateExerciseCommentMutation, UpdateExerciseCommentMutationVariables>;

/**
 * __useUpdateExerciseCommentMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseCommentMutation, { data, loading, error }] = useUpdateExerciseCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      comment: // value for 'comment'
 *      contributors: // value for 'contributors'
 *   },
 * });
 */
export function useUpdateExerciseCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseCommentMutation, UpdateExerciseCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseCommentMutation, UpdateExerciseCommentMutationVariables>(UpdateExerciseCommentDocument, options);
      }
export type UpdateExerciseCommentMutationHookResult = ReturnType<typeof useUpdateExerciseCommentMutation>;
export type UpdateExerciseCommentMutationResult = Apollo.MutationResult<UpdateExerciseCommentMutation>;
export type UpdateExerciseCommentMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseCommentMutation, UpdateExerciseCommentMutationVariables>;
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
export const UpdateExerciseTagDocument = gql`
    mutation UpdateExerciseTag($updateExerciseTagId: ID!, $name: String!) {
  updateExerciseTag(id: $updateExerciseTagId, name: $name) {
    id
  }
}
    `;
export type UpdateExerciseTagMutationFn = Apollo.MutationFunction<UpdateExerciseTagMutation, UpdateExerciseTagMutationVariables>;

/**
 * __useUpdateExerciseTagMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseTagMutation, { data, loading, error }] = useUpdateExerciseTagMutation({
 *   variables: {
 *      updateExerciseTagId: // value for 'updateExerciseTagId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateExerciseTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseTagMutation, UpdateExerciseTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseTagMutation, UpdateExerciseTagMutationVariables>(UpdateExerciseTagDocument, options);
      }
export type UpdateExerciseTagMutationHookResult = ReturnType<typeof useUpdateExerciseTagMutation>;
export type UpdateExerciseTagMutationResult = Apollo.MutationResult<UpdateExerciseTagMutation>;
export type UpdateExerciseTagMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseTagMutation, UpdateExerciseTagMutationVariables>;
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
export const UserDocument = gql`
    query user($userId: ID!) {
  user(id: $userId) {
    id
    name
    avatarUrl
    email
    stats {
      checkedExerciseCount
      totalExerciseCount
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const SelectUserExercisesDocument = gql`
    query selectUserExercises($userId: ID!, $skip: Int = 0, $take: Int = 10) {
  user(id: $userId) {
    id
    exercises(skip: $skip, take: $take) {
      ...UserExercise
    }
  }
}
    ${UserExerciseFragmentDoc}`;

/**
 * __useSelectUserExercisesQuery__
 *
 * To run a query within a React component, call `useSelectUserExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectUserExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectUserExercisesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSelectUserExercisesQuery(baseOptions: Apollo.QueryHookOptions<SelectUserExercisesQuery, SelectUserExercisesQueryVariables> & ({ variables: SelectUserExercisesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectUserExercisesQuery, SelectUserExercisesQueryVariables>(SelectUserExercisesDocument, options);
      }
export function useSelectUserExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectUserExercisesQuery, SelectUserExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectUserExercisesQuery, SelectUserExercisesQueryVariables>(SelectUserExercisesDocument, options);
        }
export function useSelectUserExercisesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SelectUserExercisesQuery, SelectUserExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SelectUserExercisesQuery, SelectUserExercisesQueryVariables>(SelectUserExercisesDocument, options);
        }
export type SelectUserExercisesQueryHookResult = ReturnType<typeof useSelectUserExercisesQuery>;
export type SelectUserExercisesLazyQueryHookResult = ReturnType<typeof useSelectUserExercisesLazyQuery>;
export type SelectUserExercisesSuspenseQueryHookResult = ReturnType<typeof useSelectUserExercisesSuspenseQuery>;
export type SelectUserExercisesQueryResult = Apollo.QueryResult<SelectUserExercisesQuery, SelectUserExercisesQueryVariables>;
export const SelectUserCommentsDocument = gql`
    query selectUserComments($userId: ID!, $skip: Int = 0, $take: Int = 10) {
  user(id: $userId) {
    id
    comments(skip: $skip, take: $take) {
      ...UserComment
    }
  }
}
    ${UserCommentFragmentDoc}`;

/**
 * __useSelectUserCommentsQuery__
 *
 * To run a query within a React component, call `useSelectUserCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectUserCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectUserCommentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSelectUserCommentsQuery(baseOptions: Apollo.QueryHookOptions<SelectUserCommentsQuery, SelectUserCommentsQueryVariables> & ({ variables: SelectUserCommentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectUserCommentsQuery, SelectUserCommentsQueryVariables>(SelectUserCommentsDocument, options);
      }
export function useSelectUserCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectUserCommentsQuery, SelectUserCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectUserCommentsQuery, SelectUserCommentsQueryVariables>(SelectUserCommentsDocument, options);
        }
export function useSelectUserCommentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SelectUserCommentsQuery, SelectUserCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SelectUserCommentsQuery, SelectUserCommentsQueryVariables>(SelectUserCommentsDocument, options);
        }
export type SelectUserCommentsQueryHookResult = ReturnType<typeof useSelectUserCommentsQuery>;
export type SelectUserCommentsLazyQueryHookResult = ReturnType<typeof useSelectUserCommentsLazyQuery>;
export type SelectUserCommentsSuspenseQueryHookResult = ReturnType<typeof useSelectUserCommentsSuspenseQuery>;
export type SelectUserCommentsQueryResult = Apollo.QueryResult<SelectUserCommentsQuery, SelectUserCommentsQueryVariables>;
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
export const VoteOnDeveloperDocument = gql`
    mutation VoteOnDeveloper($voteOnDeveloperId: ID!) {
  voteOnDeveloper(id: $voteOnDeveloperId) {
    id
  }
}
    `;
export type VoteOnDeveloperMutationFn = Apollo.MutationFunction<VoteOnDeveloperMutation, VoteOnDeveloperMutationVariables>;

/**
 * __useVoteOnDeveloperMutation__
 *
 * To run a mutation, you first call `useVoteOnDeveloperMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteOnDeveloperMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteOnDeveloperMutation, { data, loading, error }] = useVoteOnDeveloperMutation({
 *   variables: {
 *      voteOnDeveloperId: // value for 'voteOnDeveloperId'
 *   },
 * });
 */
export function useVoteOnDeveloperMutation(baseOptions?: Apollo.MutationHookOptions<VoteOnDeveloperMutation, VoteOnDeveloperMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteOnDeveloperMutation, VoteOnDeveloperMutationVariables>(VoteOnDeveloperDocument, options);
      }
export type VoteOnDeveloperMutationHookResult = ReturnType<typeof useVoteOnDeveloperMutation>;
export type VoteOnDeveloperMutationResult = Apollo.MutationResult<VoteOnDeveloperMutation>;
export type VoteOnDeveloperMutationOptions = Apollo.BaseMutationOptions<VoteOnDeveloperMutation, VoteOnDeveloperMutationVariables>;