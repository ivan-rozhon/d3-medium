import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-data-binding',
  template: '<div class="main-container"></div>'
})
export class DataBindingComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const dataSet = [...Array(5)].map((v, i) => i);

    const mainContainer = d3.select('.main-container');

    mainContainer
      .selectAll('p')
      .data(dataSet)
      .enter()
      .append('p')
      .text(text => text);
  }
}
