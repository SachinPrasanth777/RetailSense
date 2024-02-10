export function Combined(footfalldata, saledata, itemName) {
  return footfalldata.map((chartItem) => {
    const saleItem = saledata.find((sale) => sale.time === chartItem.time);

    let saleValue = saleItem ? saleItem[itemName] : 0;


    saleValue = Math.min(saleValue, chartItem[itemName]);

    return {
      time: chartItem.time,
      Footfall: chartItem[itemName] || 0,
      Sale: saleValue,
    };
  });
}
