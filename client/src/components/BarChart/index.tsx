import React from "react";
import ReactECharts from "echarts-for-react";

import { IValue } from "../../../types";
import { getOptions } from "./config";

interface IProps {
  values: IValue[];
  title: string
}

const BarChart = ({ values, title }: IProps) => {
  return <ReactECharts option={getOptions(values, title)} />;
};

export default BarChart;
