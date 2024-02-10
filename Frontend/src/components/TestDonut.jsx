import React from "react";
import { Card, DonutChart, Title } from "@tremor/react";


const valueFormatter = (number) => {
  if (isNaN(number)) {
    return ""; 
  } else {
    return ` ${new Intl.NumberFormat("us").format(number).toString()}`;
  }
};

const TestDonut = (props) => {
  const itemAveragesArray = Object.keys(props.itemAverage).map((itemName) => ({
    name: props.sectionNames[itemName], 
    average: props.itemAverage[itemName],
  }));

  return (
    <Card className="max-w-lg">
      <Title>Section Wise Footfall Average</Title>
      <DonutChart
        className="mt-6"
        data={itemAveragesArray}
        category="average"
        index="name"
        valueFormatter={valueFormatter}
        colors={["neutral", "indigo", "rose", "orange", "emerald"]}
      />
    </Card>
  );
};

export default TestDonut;
