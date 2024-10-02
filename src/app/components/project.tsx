// "use client";

import React from "react";
import Image from "next/image";
import styles from "./project.module.css";
import cs from "classnames";
import Link from "next/link";

interface ProjectProps {
  description: string;
  imgUrl: string;
  title: string;
  url: string;
  slug: string;
}

const Project = ({ imgUrl, title, description, url, slug }: ProjectProps) => {
  return (
    <div
      className={cs(
        "flex flex-col items-center w-52 h-80 hover:-translate-y-0.5 p-3 cursor-pointer",
        styles.project
      )}
    >
      <div className="basis-2/3 flex flex-col justify-center items-center">
        <Image width={150} height={200} src={imgUrl} alt="project" />
      </div>
      <div className="container basis-1/3">
        <span>{title}</span>
        <p>
          {/* <a href={url}>{description}</a> */}
          <Link className="text-brown" href={`/projects/${slug}`}>
            {description}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Project;
