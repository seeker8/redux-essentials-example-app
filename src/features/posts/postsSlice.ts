import { createSlice, nanoid } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
export interface Post {
  id: string,
  user: string,
  title: string,
  content: string
}

const initialState: Post[] = [
  { id: '1', title: 'First Post', content: 'Hello', user: '0' },
  { id: '2', title: 'Second Post', content: 'More text', user: '1' }
];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, user: userId }
        };
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const existingPost = state.find(post => post.id === action.payload.id);
      if (existingPost) {
        existingPost.content = action.payload.content;
        existingPost.title = action.payload.title;
      }
    }
  }
});

export const { postAdded, postUpdated } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

// selector functions
export const selectAllPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, postId: string) => state.posts.find(post => post.id === postId)