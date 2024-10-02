import React from "react";

export default function Index(props: any) {
  console.log(props);
  return <div>{props.params.id}</div>;
}
