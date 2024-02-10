import { FaTshirt } from "react-icons/fa";
import { PiPants } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { PiHoodieDuotone } from "react-icons/pi";

import { Select, SelectItem } from "@tremor/react";


export function TestSelect({props, value, setValue }) {
  return (
    <>
      <div className="">
        <Select value={value} onValueChange={setValue}>
          <SelectItem value={props.Section1Data} icon={FaTshirt}>
            Tshirts
          </SelectItem>
          <SelectItem value={props.Section2Data} icon={PiPants}>
            Jeans
          </SelectItem>
          <SelectItem value={props.Section3Data} icon={GiConverseShoe}>
            Shoes
          </SelectItem>
          <SelectItem value={props.Section4Data} icon={IoBag}>
            Bags
          </SelectItem>
          <SelectItem value={props.Section5Data} icon={PiHoodieDuotone}>
            Jackets
          </SelectItem>
        </Select>
      </div>
    </>
  );
}
