import { Card, AreaChart, Title } from "@tremor/react";



const TestLine = (props) => {
  
  const dataWithDisplayNames = props.data.map((entry) => {
    const newDataEntry = {};
    for (const key in entry) {
      if (key === "time") {
        newDataEntry[key] = entry[key];
      } else {
        newDataEntry[props.sectionNames[key]] = entry[key];
      }
    }
    return newDataEntry;
  });

  return (
    <Card>
      <Title>Hourly Footfall </Title>
      <AreaChart
        className="mt-6"
        data={dataWithDisplayNames}
        index="time"
        categories={Object.values(props.sectionNames)} 
        colors={["neutral", "indigo", "rose", "orange", "emerald"]}
        yAxisWidth={100}
      />
    </Card>
  );
};

export default TestLine;
