import React, { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "AIzaSyAeJ9mC7RlBHpPN-P_qoh3uM8N9RNQ2u4Q";
const MODEL_NAME = "gemini-pro";

const ChatComponent = ({ salesData, footfallData }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [chat, setChat] = useState(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const initializeChat = async () => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chatInstance = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [
              {
                text: "you are RetailSenseAI, u give insights on the inventory management of any retail store, u ask data of Footfall and SalesData to the user,explain youself in 1 SENTENCE WHICH INCLUDES YOUR NAME at the starting  dont answer any other questions if proper footfall and salesdata are not give to u. so ask for proper data alone, ASK FOOTFALL DATA AND SALES DATA TO THE USER",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "I am RetailSenseAI, a retail inventory management assistant, help me optimize your inventory by providing accurate Footfall and SalesData.",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: "You ask for sales and footfall data untill the user gives it to you, dont give dialogues. ASK FOR FOOTFALL DATA AND SALESDATA, DO NOT PROCEED OR ANSWER OTHER PROMPTS",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Provide accurate Sales and Footfall data to optimize your inventory management with RetailSenseAI.",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: "GIve, section wise name\n1. Footfall Analysis like Footfall Analysis: Moderate footfall, consistent over time, Consistent footfall due to its location., Moderate footfall, with fluctuations.\n2. Sales Analysis: Varied sales, indicating potential areas for improvement.Moderate to high sales, indicating active transactions.\nand give suggestions at last like\nMaintain a well-stocked checkout area with fast-selling items.Implement efficient checkout processes to minimize wait times and enhance customer satisfaction.Ensure sufficient stock of items typically purchased near the entrance.Consider placing high-margin or promotional items near the entrance to encourage impulse purchases.Analyze sales data to identify popular products and ensure their availability.Consider rearranging products to optimize visibility and encourage sales.Monitor inventory levels closely for fast-selling items.Implement cross-merchandising strategies to boost sales of complementary products.",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "**Footfall Analysis:**\n\n1. Moderate footfall, consistent over time: Consistent customer base, focus on maintaining product availability and customer satisfaction.\n2. Consistent footfall due to location: Leverage location advantage, optimize product selection and promotions to drive sales.\n3. Moderate footfall with fluctuations: Analyze patterns, adjust inventory levels accordingly, consider targeted marketing campaigns.\n\n**Sales Analysis:**\n\n1. Varied sales, indicating potential areas for improvement: Identify underperforming sections, optimize product mix, consider promotions and targeted marketing.\n2. Moderate to high sales, indicating active transactions: Maintain adequate stock levels, monitor customer preferences, consider expanding product range.\n\n**Suggestions:**\n\n1. Maintain a well-stocked checkout area with fast-selling items.\n2. Implement efficient checkout processes to minimize wait times and enhance customer satisfaction.\n3. Ensure sufficient stock of items typically purchased near the entrance.\n4. Consider placing high-margin or promotional items near the entrance to encourage impulse purchases.\n5. Analyze sales data to identify popular products and ensure their availability.\n6. Consider rearranging products to optimize visibility and encourage sales.\n7. Monitor inventory levels closely for fast",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: "hi" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Hello there! I'm RetailSenseAI, your AI-powered retail inventory management assistant. I'm here to help you optimize your inventory, boost sales, and improve customer satisfaction. How can I assist you today?",
              },
            ],
          },
        ],
      });

      setChat(chatInstance);
    };

    initializeChat();
  }, []);

  const handleSendMessage = async (userInput) => {
    if (!chat) return;

    const result = await chat.sendMessage(userInput);
    const response = result.response.text();
    setChatHistory([
      ...chatHistory,
      { role: "user", parts: [{ text: userInput }] },
      { role: "model", parts: [{ text: response }] },
    ]);
  };

  const combineDataAndSendMessage = () => {
  
    const combinedData = {
      salesData: salesData,
      footfallData: footfallData,
    };

    setUserInput(JSON.stringify(combinedData));

    
    handleSendMessage(JSON.stringify(combinedData));
  };


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-10">
      <div className="bg-gray-100 p-10 rounded-lg shadow-md">
     
        <div className="space-y-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`${message.role === "user" ? "text-right" : ""} ${
                message.role === "user"
                  ? "bg-blue-500 text-white "
                  : "bg-gray-200 text-gray-800"
              } p-3 rounded-lg inline-block`}
            >
              <p>{message.parts[0].text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={combineDataAndSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Inject Combined Data
        </button>

     
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(userInput);
            setUserInput("");
          }}
          className="mt-4 flex flex-col gap-4"
        >
          <input
            type="text"
            name="userInput"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2  rounded-md ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;