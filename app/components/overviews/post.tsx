import type { Post } from "~/db/schemas";
import { formatedDate } from "~/lib/date";

type PostOverviewProps = {
  post: Post;
};

export function PostOverview({ post }: PostOverviewProps) {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold">Tittel:</p>
        <p className="text-lg">{post.title}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Slug:</p>
        <p className="text-lg">{post.id}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Brødtekst:</p>
        <article className="text-lg space-y-2">
          {post.body
            ? post.body.split("\n").map((p, i) => <p key={i}>{p}</p>)
            : "Ingen brødtekst"}
        </article>
      </div>
      <div>
        <p className="text-sm font-bold">Laget:</p>
        <p className="text-lg">{formatedDate(post.createdAt)}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Publisert av:</p>
        <p className="text-lg">{post.publishedBy}</p>
      </div>
    </div>
  );
}
