import React from "react";

export default function Index() {
  return (
    <main className="p-12">
      <h1 className="text-5xl mb-4">Hello!</h1>
      <div className="*:text-lg *:mb-3">
        <p>I&apos;m Dan.</p>
        <p>
          I&apos;m a full stack developer at{" "}
          <a href="https://commerce.nearform.com/">NearForm</a>(formerly
          Formidable) based in Conshohocken.
        </p>
        <p>
          I have a diverse background ranging from embedded systems to front end
          development.
        </p>
        <p>I most enjoy working with React, Typescript, and NodeJS.</p>
        <p>
          Checkout my <a href="https://github.com/djm158">GitHub</a> for some of
          my work!
        </p>
      </div>
    </main>
  );
}
