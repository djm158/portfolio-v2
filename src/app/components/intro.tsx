import { getAllPosts } from "@/lib/api";

export function Intro() {
  const allPosts = getAllPosts();
  return (
    <section className="mb-16 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
      <h1 className="text-5xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
        {allPosts.length} posts
      </h1>
    </section>
  );
}
