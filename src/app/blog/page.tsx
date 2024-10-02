import Container from "@/app/components/container";
import { Intro } from "@/app/components/intro";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  console.log(Object.keys(allPosts[0]));
  return (
    <main>
      <Container>
        <Intro />
        {allPosts.map((post) => (
          <div key={`${post.slug}-${post.title}-${post.date}`}>
            <h4>
              {post.title} <span>{post.date}</span>
            </h4>
            {post.excerpt}
          </div>
        ))}
      </Container>
    </main>
  );
}
