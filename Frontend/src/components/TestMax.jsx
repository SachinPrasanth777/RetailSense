import React from "react";
import { Card } from "@tremor/react";

const TestMax = (props) => {
  const maxItemDisplayName = props.sectionNames[props.maxItem] || props.maxItem;

  return (
    <>
      <Card className="w-full mx-auto flex flex-col gap-6">
        <h1 className="text-4xl font-extralight"> Most Active Section</h1>
        <div className="flex flex-col gap-2 text-2xl">
          <p className="font-medium">{maxItemDisplayName}</p>
          <p>{props.maxAverage} Customers per minute</p>
        </div>
      </Card>
    </>
  );
};

export default TestMax;
