import React from "react";

import Project from "@/app/components/project";
import { getAllProjects } from "@/lib/api";

export default function Index() {
  const projects = getAllProjects();
  return (
    <div>
      {projects.map((project) => (
        <Project
          key={`${project.title}-${project.url}`}
          title={project.title}
          description={project.description}
          imgUrl={project.imgUrl}
          url={project.url}
        />
      ))}
    </div>
  );
}
