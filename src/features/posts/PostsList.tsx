import { useAppSelector } from "@/app/hooks";
import { Link } from "react-router-dom";
import { selectAllPosts } from "./postsSlice";
import { PostAuthor } from "../users/PostAuthor";
import { TimeAgo } from "@/components/TimeAgo";

export const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);
  const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}