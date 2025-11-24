import { Post } from '@features/posts/model';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="border-border bg-card/80 flex h-full flex-col gap-2 rounded-xl border p-4 shadow-sm">
      <h2 className="text-base font-semibold tracking-tight">{post.title}</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {post.body}
      </p>
    </article>
  );
};

export default PostCard;
