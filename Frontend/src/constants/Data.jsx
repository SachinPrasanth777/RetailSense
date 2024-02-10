const samplefoot = [
  {
    time: 0,
    Section1: 0,
    Section2: 0,
    Section3: 0,
    Section4: 0,
    Section5: 0,
  },
];

// const footfalldata = [
//   {
//     time: "1PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "2PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "3PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "4PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "5PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
// ];

// const saledata = [
//   {
//     time: "1PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "2PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "3PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "4PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
//   {
//     time: "5PM",
//     id: Math.random(),
//     date: Math.random(),
//     Tshirts: Math.floor(Math.random() * 10),
//     Jeans: Math.floor(Math.random() * 10),
//     Shoes: Math.floor(Math.random() * 10),
//     Bags: Math.floor(Math.random() * 10),
//     Jackets: Math.floor(Math.random() * 10),
//   },
// ];

export function calculateItemAverage(footfallData) {
  const itemSum = {
    Section1: 0,
    Section2: 0,
    Section3: 0,
    Section4: 0,
    Section5: 0,
  };


  footfallData.forEach((timeSlot) => {
    itemSum.Section1 += parseInt(timeSlot.Section1);
    itemSum.Section2 += parseInt(timeSlot.Section2);
    itemSum.Section3 += parseInt(timeSlot.Section3);
    itemSum.Section4 += parseInt(timeSlot.Section4);
    itemSum.Section5 += parseInt(timeSlot.Section5);
  });


  const totalSlots = footfallData.length;
  const itemAverage = {
    Section1: itemSum.Section1 / totalSlots,
    Section2: itemSum.Section2 / totalSlots,
    Section3: itemSum.Section3 / totalSlots,
    Section4: itemSum.Section4 / totalSlots,
    Section5: itemSum.Section5 / totalSlots,
  };

  return itemAverage;
}

export function calculateMaxAverage(itemAverage) {
  let maxAverage = Number.MIN_VALUE;
  let maxAverageItem = "";

  for (const item in itemAverage) {
    if (itemAverage.hasOwnProperty(item)) {
      if (itemAverage[item] > maxAverage) {
        maxAverage = itemAverage[item];
        maxAverageItem = item;
      }
    }
  }

  maxAverage = Math.floor(maxAverage);

  return { maxAverage, maxAverageItem };
}

export { samplefoot };
