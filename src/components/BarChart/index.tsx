import { useEffect } from "react";
import "./index.scss";
import * as d3 from "d3";
import { Forcast } from "../../types/shared";

type Props = {
  forcast: Forcast;
  width?: number;
  height?: number;
};
const BarChart = ({ forcast, width = 1200, height = 500 }: Props) => {
  useEffect(() => {
    const svg = d3
      .select("svg")
      .attr("width", width)
      .attr("height", height)
      .style("color", "white");

    svg.selectAll("*").remove();

    const maxX = Math.max(...forcast.data.map(({ x }) => x));

    const scaleX = d3
      .scaleBand()
      .domain(forcast.data.map(({ x }) => String(x)))
      .range([0, maxX])
      .padding(0.2);

    const maxY = Math.max(...forcast.data.map(({ y }) => y));

    const scaleY = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "14px")
      .call(d3.axisBottom(scaleX));

    g.append("g").style("font-size", "14px").call(d3.axisLeft(scaleY));

    g.selectAll(".bar")
      .data(forcast.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return Number(scaleX(String(d.x)));
      })
      .attr("y", function (d) {
        return Math.abs(maxY - scaleY(d.y));
      })
      .attr("width", scaleX.bandwidth())
      .attr("height", function (d) {
        return height - Math.abs(maxY - scaleY(d.y));
      })
      .attr("fill", function (d, i) {
        if (i === 0) return "green";

        if (d.y < forcast.data[i - 1].y) return "green";

        return "red";
      });

    // return () => {
    //   svg.selectAll("*").remove();
    // };
  }, [forcast, height, width]);

  return <svg className="bar_chart_container"></svg>;
};

export default BarChart;
