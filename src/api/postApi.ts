import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../interface/IPost';
import { IComment } from '../interface/IComment';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['Post', 'Comments'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => '/posts',
      providesTags: () => [{ type: 'Post' }],
    }),
    getPostById: builder.query<any, any>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation<IPost, any>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body: {
          title: body.title,
          content: body.content,
          user: {
            name: body.username,
          },
        },
      }),
      invalidatesTags: [{ type: 'Post' }],
    }),
    addComment: builder.mutation<
      IComment,
      {
        id: number;
        content: string;
      }
    >({
      query: (body) => ({
        url: `/comments`,
        method: 'POST',
        body: {
          content: body.content,
          post: body.id,
          user: 4, // const variable, because we don't have system to create users at the moment
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    updatePostById: builder.mutation<
      IPost,
      {
        id: number;
        title: string;
        content: string;
      }
    >({
      query: (body) => ({
        url: `/posts/${body.id}`,
        method: 'PUT',
        body: {
          title: body.title,
          content: body.content,
          id: body.id,
        },
      }),
      invalidatesTags: [{ type: 'Post' }],
    }),
    deletePostById: builder.mutation<IPost, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Post' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddCommentMutation,
  useUpdatePostByIdMutation,
  useDeletePostByIdMutation,
  useCreatePostMutation,
} = postApi;
