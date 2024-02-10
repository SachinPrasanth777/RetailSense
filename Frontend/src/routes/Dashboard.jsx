"use client";

import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from "@tremor/react";

import Video from "../components/Video";
import TestLine from "../components/TestLine";
import TestDonut from "../components/TestDonut";
import TestMax from "../components/TestMax";
import TestBar from "../components/TestBar";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { Combined } from "../constants/CombinedData";
import ChatComponent from "../components/Chat";

import {
  calculateMaxAverage,
  calculateItemAverage,
  samplefoot,
} from "../constants/Data";

import { useEffect, useState } from "react";

export default function Dashboard(props) {
  const [data, setData] = useState([]);
  const [saledata, setSaledata] = useState([]);
  const [sectionNames, setSectionNames] = useState({});
  const { link } = useParams();

  console.log(link);

  const getData = async () => {
    try {
      const call = await fetch(`http://localhost:8000/dashboard/${link}`, {
        mode: 'cors',
      });
      let response = await call.json();
      console.log(response);
  
      if (response.length === 0) {
     
        setTimeout(async () => {
          const alternativeCall = await fetch("https://65c5c2d9e5b94dfca2e040d7.mockapi.io/footfalldata", {
            mode: 'cors',
          });
          response = await alternativeCall.json();
          setData(response);
          extractSectionNames(response);
        },)  
      } else {
        setData(response);
        extractSectionNames(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  const getSaleData = async () => {
    try {
      const call = await fetch(
        "https://65c5c2d9e5b94dfca2e040d7.mockapi.io/saledata"
      );
      const response = await call.json();
      setSaledata(response);
    } catch (e) {
      console.log(e);
    }
  };
  

  const extractSectionNames = (data) => {
    if (data.length > 0) {
      const firstDataItem = data[0];
      setSectionNames(firstDataItem.SectionNames);
    }
  };

  useEffect(() => {
    getData();
    getSaleData();
  }, [link]); 

  console.log(saledata);
  const itemAverage = calculateItemAverage(data);
  const { maxAverage, maxAverageItem } = calculateMaxAverage(itemAverage);

  const Section1Data = Combined(data, saledata, "Section1");
  const Section2Data = Combined(data, saledata, "Section2");
  const Section3Data = Combined(data, saledata, "Section3");
  const Section4Data = Combined(data, saledata, "Section4");
  const Section5Data = Combined(data, saledata, "Section5");


  return (
    <>
      <Navbar />
      <main className="px-36 py-5">
        <h1 className="text-5xl font-semibold">Dashboard</h1>

        <TabGroup className="mt-6">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Footage</Tab>
            <Tab>Sales</Tab>
            <Tab>Chat</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="flex flex-col mt-8 gap-6">

                <div className="flex gap-6">
                  <TestMax
                    maxItem={maxAverageItem}
                    maxAverage={maxAverage}
                    sectionNames={sectionNames}
                  ></TestMax>
                  <TestDonut
                    itemAverage={itemAverage}
                    className="w-96 m-2"
                    sectionNames={sectionNames}
                  ></TestDonut>
                </div>

      

                <TestLine
                  className="w-5 m-2"
                  data={data}
                  sectionNames={sectionNames}
                ></TestLine>
              </div>
            </TabPanel>

 

            <TabPanel>
              <Video videoname={link} />
            </TabPanel>

      

            <TabPanel>
              {" "}
              <TestBar
                Section1Data={Section1Data}
                Section2Data={Section2Data}
                Section3Data={Section3Data}
                Section4Data={Section4Data}
                Section5Data={Section5Data}
                sectionNames={sectionNames}
              />{" "}
            </TabPanel>

            <TabPanel>
              <ChatComponent 
                salesData={saledata} 
                footfallData={data}>
              </ChatComponent>            
            </TabPanel>

          </TabPanels>
        </TabGroup>
      </main>
    </>
  );
}


