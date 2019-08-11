import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as React from "react";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DateTime */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  signup: AuthPayload;
  login: AuthPayload;
  createDraft: Post;
  deleteOnePost?: Maybe<Post>;
  publish?: Maybe<Post>;
};

export type MutationSignupArgs = {
  name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type MutationLoginArgs = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type MutationCreateDraftArgs = {
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
};

export type MutationDeleteOnePostArgs = {
  where: PostWhereUniqueInput;
};

export type MutationPublishArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  published: Scalars["Boolean"];
  title: Scalars["String"];
  content?: Maybe<Scalars["String"]>;
  author?: Maybe<User>;
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  users: Array<User>;
  feed: Array<Post>;
  filterPosts: Array<Post>;
  post?: Maybe<Post>;
};

export type QueryFeedArgs = {
  published?: Maybe<Scalars["Boolean"]>;
};

export type QueryFilterPostsArgs = {
  searchString?: Maybe<Scalars["String"]>;
};

export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  posts?: Maybe<Array<Post>>;
};

export type UserPostsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};
export type AuthPayloadFragmentFragment = { __typename?: "AuthPayload" } & Pick<
  AuthPayload,
  "token"
> & { user: { __typename?: "User" } & UserFragmentFragment };

export type PostFragmentFragment = { __typename?: "Post" } & Pick<
  Post,
  "id" | "published" | "title" | "content" | "published"
> & { author: Maybe<{ __typename?: "User" } & UserFragmentFragment> };

export type UserFragmentFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "name" | "email"
>;

export type CreateDraftMutationMutationVariables = {
  title: Scalars["String"];
  content: Scalars["String"];
};

export type CreateDraftMutationMutation = { __typename?: "Mutation" } & {
  createDraft: { __typename?: "Post" } & PostFragmentFragment;
};

export type DeleteOnePostMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteOnePostMutation = { __typename?: "Mutation" } & {
  deleteOnePost: Maybe<{ __typename?: "Post" } & PostFragmentFragment>;
};

export type LoginUserMutationMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginUserMutationMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthPayload" } & AuthPayloadFragmentFragment;
};

export type PublishMutationMutationVariables = {
  id: Scalars["ID"];
};

export type PublishMutationMutation = { __typename?: "Mutation" } & {
  publish: Maybe<{ __typename?: "Post" } & PostFragmentFragment>;
};

export type SignupUserMutationMutationVariables = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SignupUserMutationMutation = { __typename?: "Mutation" } & {
  signup: { __typename?: "AuthPayload" } & AuthPayloadFragmentFragment;
};

export type FeedQueryQueryVariables = {
  published: Scalars["Boolean"];
};

export type FeedQueryQuery = { __typename?: "Query" } & {
  feed: Array<{ __typename?: "Post" } & PostFragmentFragment>;
};

export type MeQueryQueryVariables = {};

export type MeQueryQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserFragmentFragment>;
};

export type PostQueryQueryVariables = {
  id: Scalars["ID"];
};

export type PostQueryQuery = { __typename?: "Query" } & {
  post: Maybe<{ __typename?: "Post" } & PostFragmentFragment>;
};

export type UsersQueryQueryVariables = {};

export type UsersQueryQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & UserFragmentFragment>;
};
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    name
    email
  }
`;
export const AuthPayloadFragmentFragmentDoc = gql`
  fragment AuthPayloadFragment on AuthPayload {
    token
    user {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on Post {
    id
    published
    title
    content
    published
    author {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export const CreateDraftMutationDocument = gql`
  mutation createDraftMutation($title: String!, $content: String!) {
    createDraft(title: $title, content: $content) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;
export type CreateDraftMutationMutationFn = ReactApollo.MutationFn<
  CreateDraftMutationMutation,
  CreateDraftMutationMutationVariables
>;
export type CreateDraftMutationComponentProps = Omit<
  ReactApollo.MutationProps<
    CreateDraftMutationMutation,
    CreateDraftMutationMutationVariables
  >,
  "mutation"
>;

export const CreateDraftMutationComponent = (
  props: CreateDraftMutationComponentProps
) => (
  <ReactApollo.Mutation<
    CreateDraftMutationMutation,
    CreateDraftMutationMutationVariables
  >
    mutation={CreateDraftMutationDocument}
    {...props}
  />
);

export const DeleteOnePostDocument = gql`
  mutation deleteOnePost($id: ID!) {
    deleteOnePost(where: { id: $id }) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;
export type DeleteOnePostMutationFn = ReactApollo.MutationFn<
  DeleteOnePostMutation,
  DeleteOnePostMutationVariables
>;
export type DeleteOnePostComponentProps = Omit<
  ReactApollo.MutationProps<
    DeleteOnePostMutation,
    DeleteOnePostMutationVariables
  >,
  "mutation"
>;

export const DeleteOnePostComponent = (props: DeleteOnePostComponentProps) => (
  <ReactApollo.Mutation<DeleteOnePostMutation, DeleteOnePostMutationVariables>
    mutation={DeleteOnePostDocument}
    {...props}
  />
);

export const LoginUserMutationDocument = gql`
  mutation loginUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...AuthPayloadFragment
    }
  }
  ${AuthPayloadFragmentFragmentDoc}
`;
export type LoginUserMutationMutationFn = ReactApollo.MutationFn<
  LoginUserMutationMutation,
  LoginUserMutationMutationVariables
>;
export type LoginUserMutationComponentProps = Omit<
  ReactApollo.MutationProps<
    LoginUserMutationMutation,
    LoginUserMutationMutationVariables
  >,
  "mutation"
>;

export const LoginUserMutationComponent = (
  props: LoginUserMutationComponentProps
) => (
  <ReactApollo.Mutation<
    LoginUserMutationMutation,
    LoginUserMutationMutationVariables
  >
    mutation={LoginUserMutationDocument}
    {...props}
  />
);

export const PublishMutationDocument = gql`
  mutation publishMutation($id: ID!) {
    publish(id: $id) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;
export type PublishMutationMutationFn = ReactApollo.MutationFn<
  PublishMutationMutation,
  PublishMutationMutationVariables
>;
export type PublishMutationComponentProps = Omit<
  ReactApollo.MutationProps<
    PublishMutationMutation,
    PublishMutationMutationVariables
  >,
  "mutation"
>;

export const PublishMutationComponent = (
  props: PublishMutationComponentProps
) => (
  <ReactApollo.Mutation<
    PublishMutationMutation,
    PublishMutationMutationVariables
  >
    mutation={PublishMutationDocument}
    {...props}
  />
);

export const SignupUserMutationDocument = gql`
  mutation signupUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      ...AuthPayloadFragment
    }
  }
  ${AuthPayloadFragmentFragmentDoc}
`;
export type SignupUserMutationMutationFn = ReactApollo.MutationFn<
  SignupUserMutationMutation,
  SignupUserMutationMutationVariables
>;
export type SignupUserMutationComponentProps = Omit<
  ReactApollo.MutationProps<
    SignupUserMutationMutation,
    SignupUserMutationMutationVariables
  >,
  "mutation"
>;

export const SignupUserMutationComponent = (
  props: SignupUserMutationComponentProps
) => (
  <ReactApollo.Mutation<
    SignupUserMutationMutation,
    SignupUserMutationMutationVariables
  >
    mutation={SignupUserMutationDocument}
    {...props}
  />
);

export const FeedQueryDocument = gql`
  query feedQuery($published: Boolean!) {
    feed(published: $published) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;
export type FeedQueryComponentProps = Omit<
  ReactApollo.QueryProps<FeedQueryQuery, FeedQueryQueryVariables>,
  "query"
> &
  ({ variables: FeedQueryQueryVariables; skip?: false } | { skip: true });

export const FeedQueryComponent = (props: FeedQueryComponentProps) => (
  <ReactApollo.Query<FeedQueryQuery, FeedQueryQueryVariables>
    query={FeedQueryDocument}
    {...props}
  />
);

export const MeQueryDocument = gql`
  query meQuery {
    me {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type MeQueryComponentProps = Omit<
  ReactApollo.QueryProps<MeQueryQuery, MeQueryQueryVariables>,
  "query"
>;

export const MeQueryComponent = (props: MeQueryComponentProps) => (
  <ReactApollo.Query<MeQueryQuery, MeQueryQueryVariables>
    query={MeQueryDocument}
    {...props}
  />
);

export const PostQueryDocument = gql`
  query postQuery($id: ID!) {
    post(where: { id: $id }) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;
export type PostQueryComponentProps = Omit<
  ReactApollo.QueryProps<PostQueryQuery, PostQueryQueryVariables>,
  "query"
> &
  ({ variables: PostQueryQueryVariables; skip?: false } | { skip: true });

export const PostQueryComponent = (props: PostQueryComponentProps) => (
  <ReactApollo.Query<PostQueryQuery, PostQueryQueryVariables>
    query={PostQueryDocument}
    {...props}
  />
);

export const UsersQueryDocument = gql`
  query usersQuery {
    users {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type UsersQueryComponentProps = Omit<
  ReactApollo.QueryProps<UsersQueryQuery, UsersQueryQueryVariables>,
  "query"
>;

export const UsersQueryComponent = (props: UsersQueryComponentProps) => (
  <ReactApollo.Query<UsersQueryQuery, UsersQueryQueryVariables>
    query={UsersQueryDocument}
    {...props}
  />
);
