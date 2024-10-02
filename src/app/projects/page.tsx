import React from "react";

import Project from "@/app/components/project";
import { getAllProjects } from "@/lib/api";

export default function Index() {
  const projects = getAllProjects();
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-x-20 gap-y-12 p-8 sm:p-12 2xl:justify-normal">
      {projects.map((project) => (
        <Project key={`${project.title}-${project.url}`} {...project} />
      ))}
    </div>
  );
}
