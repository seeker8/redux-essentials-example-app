import { createSlice, nanoid } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: string,
  title: string,
  content: string
}

const initialState: Post[] = [
  { id: '1', title: 'First Post', content: 'Hello' },
  { id: '2', title: 'Second Post', content: 'More text' }
];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content }
        };
      }
    },
    postUpdated(state, action: PayloadAction<Post>) {
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