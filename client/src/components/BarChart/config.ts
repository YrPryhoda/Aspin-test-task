import { IValue } from "../../../types";
import { formatDate } from "../../helpers/formatDate";

interface yAxisItem {
  value: number;
  itemStyle: {
    color: string;
  };
}

export const getOptions = (data: IValue[], title: string) => {
  const xAxis: string[] = [];
  const yAxis: yAxisItem[] = [];

  const red = "red";
  const green = "green";

  data.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  data.forEach((el, index) => {
    xAxis.push(formatDate(el.date));

    const item = {
      value: el.amount,
      itemStyle: {
        color: green,
      },
    };

    if (index < 1) {
      yAxis.push(item);
      return;
    }

    const prev = data[index - 1];
    item.itemStyle.color = prev.amount <= el.amount ? green : red;

    yAxis.push(item);
  });

  return {
    grid: { top: 8, right: 2, bottom: 24, left: 50 },

    xAxis: {
      type: "category",
      data: xAxis,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: title,
        barMaxWidth: 150,
        data: yAxis,
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
};
