import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-data-visualization',
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
export class DataVisualizationComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const dataset = [30, 12, 103, 170, 45, 95, 190, 75];
    const svgHeight = 200;
    const svgWidth = 500;
    const barSpacing = 5;
    const totalBarWidth = svgWidth / dataset.length;
    const barWidth = totalBarWidth - barSpacing;

    const svg = d3
      .select('.bar-chart')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Scaling
    const scale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, svgHeight / 2]);

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
        const translate = [totalBarWidth * i, 0];
        return `translate(${translate})`;
      });
  }
}
