export const typeDefs = `#graphql
type Query{
    me: User
    posts: [Post]
    profile: Profile
    allUsers: [User]
}

type Mutation{
    signUp(name: String!, email: String!, password: String!, bio: String):SignUpResponse
    signIn(email: String!, password: String!): SingIn
}

type SignUpResponse{
   token: String
   errorMessage: String
}

type SingIn{
   errorMessage: String
   token: String
}

 type Post {
    id: ID!
    title: String!
    content: String!
    author: User
    createdAt: String!
    isPublished: Boolean!
 }
 type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
 }

 type Profile {
    id: ID!
    bio: String!
    createdAt: String!
    user: User!
 }

`;
