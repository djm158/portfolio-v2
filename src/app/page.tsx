import React from "react";

export default function Index() {
  return (
    <>
      {/* <SEO
        title="Daniel McGrath | Portfolio"
        keywords={[`developer`, `software`, `engineer`]}
      /> */}
      <div data-sal="slide-up" data-sal-easing="ease" data-sal-duration="400">
        <h1>Hello!</h1>
        <p>I&apos;m Dan.</p>
        <p>
          I&apos;m a full stack developer at{" "}
          <a href="https://formidable.com/">NearForm (formerly Formidable)</a>{" "}
          based in Conshohocken.
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
    </>
  );
}
