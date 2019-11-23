import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Item, DataService } from '../data.service';

import * as d3 from 'd3';
// https://github.com/d3/d3/blob/master/API.md
// https://medium.com/@admiquel/add-interactivity-to-your-charts-in-angular-2-applications-with-d3-js-78fd3718e6fb

@Component({
  selector: 'app-pie-chart',
  template: '<div id="pie"><svg></svg></div>',
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {
  get height(): number {
    return parseInt(d3.select('body').style('height'), 10);
  }
  get width(): number {
    return parseInt(d3.select('body').style('width'), 10);
  }

  radius: number;
  // Arcs & pie
  private arc: any;
  private pie: any;
  private slices: any;
  private color: any;
  // Drawing containers
  private svg: any;
  private mainContainer: any;
  // Data
  dataSource: Item[];

  constructor(private service: DataService) {
    this.dataSource = this.service.getData();
  }

  ngOnInit() {
    this.svg = d3.select('#pie').select('svg');
    this.setSVGDimensions();
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.mainContainer = this.svg.append('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
    this.pie = d3
      .pie()
      .sort(null)
      .value((d: any) => d.abs);
    this.draw();
    // ...
    window.addEventListener('resize', this.resize.bind(this));
  }

  private setSVGDimensions() {
    this.radius = Math.min(this.width, this.height) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
  }

  private setArcs() {
    this.arc = d3
      .arc()
      .outerRadius(this.radius)
      .innerRadius(this.radius * 0.75);
  }

  private drawSlices() {
    this.slices = this.mainContainer
      .selectAll('path')
      .remove()
      .exit()
      .data(this.pie(this.dataSource))
      .enter()
      .append('g')
      .append('path')
      .attr('d', this.arc);

    this.slices.attr('fill', (d, i) => this.color(i));
  }

  private resize() {
    this.setSVGDimensions();
    this.setArcs();
    this.repaint();
  }

  private repaint() {
    this.drawSlices();
  }
}
