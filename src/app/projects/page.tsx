import React from "react";

import Project from "@/app/components/project";
import { getAllProjects } from "@/lib/api";

export default function Index() {
  const projects = getAllProjects();
  return (
    <div className="md:p-6 lg:p-12 container m-auto grid gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {projects.map((project) => (
        <Project key={`${project.title}-${project.url}`} {...project} />
      ))}
    </div>
  );
}
