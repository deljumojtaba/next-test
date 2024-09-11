import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GanttChartProps {
  data: Array<{
    deleted: boolean;
    dimensionId: string;
    endDate: string;
    id: string;
    impactRunId: string;
    importance: number;
    index: number;
    scoreGap: number;
    sessionGap: number;
    startDate: string; 
    topicBenchmark: number;
    topicRecommendation: TopicRecommendation;
    topicScore: number;
    urgency: number;
  }>;
}

interface TopicRecommendation {
  capex: boolean;
  condition: string;
  description: string;
  dimension: string;
  dimensionId: string;
  displayOrder: number;
  id: string;
  importance: string;
  initiativeSize: string;
  opex: boolean;
  product: string;
  recommendation: string;
  recommendationType: string;
  section: string;
  topic: string;
  urgency: number;
}

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous chart

      // Define dimensions and margins
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 30, left: 70 };

      // Set up SVG canvas
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Define current date and start of current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      // Create x-scale based on time (current month to end date)
      const xScale = d3.scaleTime()
        .domain([startOfMonth, d3.max(data, d => new Date(d.endDate)) as Date])
        .range([0, width]);
        

      // Create y-scale based on task names
      const yScale = d3.scaleBand()
        .domain(data.map(d => d.topicRecommendation.dimension))
        .range([0, height])
        .padding(0.1);

      // Add x-axis
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      // Add y-axis
      g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

      // Add vertical separators for each month
      const months = d3.timeMonth.range(startOfMonth, d3.max(data, d => new Date(d.endDate)) as Date);
      g.selectAll(".month-separator")
        .data(months)
        .enter()
        .append("line")
        .attr("class", "month-separator")
        .attr("x1", d => xScale(d))
        .attr("x2", d => xScale(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1);

      // Add bars for Gantt chart
      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(new Date(d.startDate)))
        .attr("y", d => yScale(d.topicRecommendation.topic) || 0)
        .attr("width", d => xScale(new Date(d.endDate)) - xScale(new Date(d.startDate)))
        .attr("height", yScale.bandwidth())
        .attr("fill", d3.schemeCategory10[Math.floor(Math.random() * 10)]);
    }
  }, [data]);

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default GanttChart;
