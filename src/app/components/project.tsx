import React from "react";
import Image from "next/image";

interface ProjectProps {
  description: string;
  imgUrl: string;
  title: string;
  url: string;
}

const Project = ({ imgUrl, title, description, url }: ProjectProps) => {
  return (
    <div className="flex flex-col w-52 hover:-translate-y-0.5">
      <Image width={200} height={200} src={imgUrl} alt="project" />
      <div className="container">
        <span>{title}</span>
        <p>
          <a href={url}>{description}</a>
        </p>
      </div>
    </div>
  );
};

export default Project;
