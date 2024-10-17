"use client";

import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

import { PartitionRepository } from "@/repositories/PartitionRepository";

import type { Partition } from "@/repositories/PartitionRepository";

interface D3BarChartProps {
  // data: Partition[];
}

export const D3BarChart: React.FC<D3BarChartProps> = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [partitions, setPartitions] = useState<Partition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const partitionRepo = new PartitionRepository();

  useEffect(() => {
    const fetchPartitions = async () => {
      try {
        const data = await partitionRepo.getPartitions();
        setPartitions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch partitions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartitions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const width = 1000;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    // Create a tooltip div element
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "black")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("display", "none")
      .style("pointer-events", "none");

    // Select the SVG and clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(partitions.map((d) => d.tablename))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(partitions, (d) => d.rowcount) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Append X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Append Y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Create bars with tooltip functionality
    svg
      .selectAll(".bar")
      .data(partitions)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.tablename)!)
      .attr("y", (d) => yScale(d.rowcount))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d.rowcount))
      .attr("fill", "rgba(128 232 255)")
      .on("mouseover", (event, d) => {
        console.log(d);
        tooltip
          .style("display", "block")
          .html(
            `<strong>Partition:</strong> ${d.tablename}<br/>
             <strong>Parent Table:</strong> ${d.parenttable}<br/>
             <strong>Size:</strong> ${d.tablesize}<br/>
             <strong>Rows:</strong> ${d.rowcount}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });

    // Cleanup the tooltip when the component unmounts
    return () => {
      tooltip.remove();
    };
  }, [partitions]);

  return (
    <svg
      ref={svgRef}
      width={1000}
      height={300}
      preserveAspectRatio="xMidYMid meet"
    />
  );
};
