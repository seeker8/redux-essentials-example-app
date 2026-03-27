import { createSlice, nanoid } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { RootState } from "@/app/store";

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

interface Reactions {
  thumbsUp: number,
  tada: number,
  heart: number,
  rocket: number,
  eyes: number
}

export type ReactionName = keyof Reactions;
export interface Post {
  id: string,
  user: string,
  title: string,
  content: string,
  date: string,
  reactions: Reactions
}

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

const initialState: Post[] = [
  {
    id: '1', title: 'First Post', content: 'Hello', user: '0', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: initialReactions
  },
  {
    id: '2', title: 'Second Post', content: 'More text', user: '1', date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: initialReactions
  }
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
          payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString(), reactions: initialReactions }
        };
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const existingPost = state.find(post => post.id === action.payload.id);
      if (existingPost) {
        existingPost.content = action.payload.content;
        existingPost.title = action.payload.title;
      }
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

// selector functions
export const selectAllPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, postId: string) => state.posts.find(post => post.id === postId)