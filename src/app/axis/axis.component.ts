import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-axis',
  template: '<svg class="bar-chart"></svg>',
  styles: [
    `
      rect {
        fill: rgb(122, 2, 221);
      }
      svg {
        background: rgb(193, 216, 165);
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class AxisComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const dataset = [3, 12, 13, 7, 5, 9, 19, 7];
    const svgHeight = 400;
    const svgWidth = 500;
    const barSpacing = 5;
    const totalBarWidth = svgWidth / dataset.length;
    const barWidth = totalBarWidth - barSpacing;

    const svg = d3
      .select('.bar-chart')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, svgWidth]);

    const xAxis = d3.axisBottom(xScale);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([svgHeight - 30, 0]);

    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('transform', 'translate(50, 10)')
      .call(yAxis);

    const xAxisTranslate = svgHeight - 20;

    svg
      .append('g')
      .attr('transform', `translate(50,${xAxisTranslate})`)
      .call(xAxis);

    // Scaling
    const scale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, svgHeight - 30]);

    const barchart = svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      // .attr('y', d => svgHeight - d)
      .attr('y', d => svgHeight - scale(d))
      // .attr('height', d => d)
      .attr('height', d => scale(d))
      .attr('width', barWidth)
      .attr('transform', (d, i) => {
        const translate = [totalBarWidth * i + 50, -20];
        return `translate(${translate})`;
      });
  }
}
