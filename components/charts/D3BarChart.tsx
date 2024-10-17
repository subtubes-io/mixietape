import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

import { PartitionRepository } from '@/repositories/PartitionRepository';

import type { Partition } from '@/repositories/PartitionRepository';

// eslint-disable-next-line import/prefer-default-export
export const D3BarChart = function () {
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
        setError('Failed to fetch partitions.');
      } finally {
        setLoading(false);
      }
    };

    fetchPartitions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const width = 1000;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

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

    // Create a tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background-color', 'rgba(0, 0, 0, 0.75)')
      .style('padding', '8px')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    // Append X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('color', 'white')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '0.15em'); // Translate the text labels slightly upwards

    // Append Y axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Create bars with tooltip
    svg
      .selectAll('.bar')
      .data(partitions)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.tablename)!)
      .attr('y', (d) => yScale(d.rowcount))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d.rowcount))
      .attr('fill', 'rgba(128 232 255)')
      .on('mouseover', (event, d) => {
        tooltip
          .style('display', 'block')
          .html(
            `<strong>Partition:</strong> ${d.tablename}<br/>
             <strong>Parent Table:</strong> ${d.parenttable}<br/>
             <strong>Size:</strong> ${d.tablesize}<br/>
             <strong>Rows:</strong> ${d.rowcount}`,
          )
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
    svg.selectAll('text').style('color', 'white').style('font-size', '12px');
    // Cleanup tooltips when component unmounts
    return () => {
      tooltip.remove();
    };
  }, [partitions]);

  return (
    <>
      {loading && !error && <Loader />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <svg
          ref={svgRef}
          style={{ width: '100%', height: '500px' }}
          viewBox="0 0 1000 350"
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </>
  );
};
