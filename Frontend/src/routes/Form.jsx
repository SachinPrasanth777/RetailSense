import React, { useEffect, useState } from "react";
import { Card } from "@tremor/react";
import { NumberInput } from "@tremor/react";
import TimeSelect from "../components/TimeSelect";
import Navbar from "../components/Navbar";
import { TextInput } from "@tremor/react";
import { useParams } from "react-router-dom";

const Form = ({video_url}) => {
  const [time, setTime] = useState(0); 
  const [Section1, setSection1] = useState(0); 
  const [Section2, setSection2] = useState(0); 
  const [Section3, setSection3] = useState(0); 
  const [Section4, setSection4] = useState(0); 
  const [Section5, setSection5] = useState(0); 
  const [Section6, setSection6] = useState(0); 

  const [data, setData] = useState([]);
  const [saledata, setSaledata] = useState([]);
  const [SectionNames, setSectionNames] = useState({});
  const { link } = useParams();



  const getData = async () => {
    try {
      const call = await fetch(`http://localhost:8000/dashboard/${link}`, {
        mode: 'cors',
      });
      let response = await call.json();
      console.log(response);
  
      if (response.length === 0) {
      k
        setTimeout(async () => {
          const alternativeCall = await fetch("https://65c5c2d9e5b94dfca2e040d7.mockapi.io/footfalldata", {
            mode: 'cors',
          });
          response = await alternativeCall.json();
          setData(response);
          extractSectionNames(response);
        }, ) 
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
      const call = await fetch("http://localhost:8000/");
      let response = await call.json();
  
      if (response.length === 0) {
        setTimeout(async () => {
          const alternativeCall = await fetch("https://65c5c2d9e5b94dfca2e040d7.mockapi.io/saledata", {
            mode: 'cors',
          });
          response = await alternativeCall.json();
          setSaledata(response);
        }, ) 
      } else {
        setSaledata(response);
      }
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

  console.log(SectionNames);


  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await fetch(`http://localhost:8000/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time,
         
          Section1,
          Section2,
          Section3,
          Section4,
          Section5,
          Section6,
          SectionNames
        }), 
      });
      const data = await response.json();
      console.log("Data submitted successfully:", data);
      
      setTime(0);
      setSection1(0);
      setSection2(0);
      setSection3(0);
      setSection4(0);
      setSection5(0);
      setSection6(0);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Navbar />
        <Card className="flex flex-col w-fit p-10 mx-auto gap-4">
          <h1>Sales Data</h1>
          <p>Time</p>
          <NumberInput
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value))}
            />

          <p>Section1</p>

          <NumberInput
            placeholder="Section1"
            value={Section1}
            onChange={(e) => setSection1(parseInt(e.target.value))}
            />
          <p>Section2</p>
          <NumberInput
            placeholder="Section2"
            value={Section2}
            onChange={(e) => setSection2(parseInt(e.target.value))}
            />
          <p>Section3</p>
          <NumberInput
            placeholder="Section3"
            value={Section3}
            onChange={(e) => setSection3(parseInt(e.target.value))}
            />
          <p>Section4</p>
          <NumberInput
            placeholder="Section4"
            value={Section4}
            onChange={(e) => setSection4(parseInt(e.target.value))}
            />
          <p>Section5</p>
          <NumberInput
            placeholder="Section5"
            value={Section5}
            onChange={(e) => setSection5(parseInt(e.target.value))}
            />
          <p>Section6</p>
          <NumberInput
            placeholder="Section6"
            value={Section6}
            onChange={(e) => setSection6(parseInt(e.target.value))}
            />

          <TextInput
          className="hidden"
            placeholder="Section Names"
            value={SectionNames}
            />

          <button type="submit">Submit</button>
        </Card>
      </form>
    </div>
  );
};

export default Form;
