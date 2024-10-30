import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

export default function WordCloud({ wordData }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Remove any existing SVG elements to prevent duplicates on re-render
    d3.select(svgRef.current).select('svg').remove();

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const layout = d3Cloud()
      .size([width, height])
      .words(wordData)
      .padding(5)
      .rotate(() => Math.floor(Math.random() * 2) * 90)
      .fontSize((d) => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      svg
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d) => `${d.size}px`)
        .style('fill', () => `hsl(${Math.random() * 360}, 100%, 50%)`)
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  }, [wordData]);

  return <div ref={svgRef}></div>;
}
