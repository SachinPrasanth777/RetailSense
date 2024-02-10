import { BarChart, Card, Title } from "@tremor/react";
import { useState } from "react";
import { Select, SelectItem } from "@tremor/react";

const valueFormatter = (number) =>
  ` ${new Intl.NumberFormat("us").format(number).toString()}`;

const TestBar = (props) => {
  const Section1Data = props.Section1Data;
  const Section2Data = props.Section2Data;
  const Section3Data = props.Section3Data;
  const Section4Data = props.Section4Data;
  const Section5Data = props.Section5Data;

  const [value, setValue] = useState(); 

  console.log(value);
  return (
    <Card className="flex flex-col mt-8">
      <div className="flex justify-between p-2 w-full">
        <Title>Footfall Vs Sales</Title>
        <div className="">
          <Select value={value} onValueChange={setValue}>
            <SelectItem value={Section1Data}>
              {props.sectionNames["Section1"]}
            </SelectItem>
            <SelectItem value={Section2Data}>
              {props.sectionNames["Section2"]}
            </SelectItem>
            <SelectItem value={Section3Data}>
              {props.sectionNames["Section3"]}
            </SelectItem>
            <SelectItem value={Section5Data}>
              {props.sectionNames["Section4"]}
            </SelectItem>
            <SelectItem value={Section4Data}>
              {props.sectionNames["Section5"]}
            </SelectItem>

          </Select>
        </div>
      </div>
      <BarChart
        className="mt-6 rounded-tremor-full"
        data={value}
        index="time"
        categories={["Footfall", "Sale"]}
        colors={["blue", "emerald"]}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default TestBar;
