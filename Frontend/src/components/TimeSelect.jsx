import { Select, SelectItem } from "@tremor/react";

const TimeSelect = () => {
  const options = Array.from(Array(30), (_, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
  }));

  return (
    <>
      <div className="max-w-sm mx-auto space-y-6">
        
        <Select>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
};

export default TimeSelect;
