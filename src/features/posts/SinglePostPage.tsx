import { Link } from 'react-router-dom';
import { useAppSelector } from "@/app/hooks";
import { useParams } from "react-router-dom"
import { selectPostById } from './postsSlice';
import { PostAuthor } from '../users/PostAuthor';
import { TimeAgo } from '@/components/TimeAgo';

export const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useAppSelector((state) => selectPostById(state, postId!));

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <br />
        <Link to={`/editPost/${post.id}`}>Edit Post</Link>
      </article>
    </section>
  )

}