import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-selection',
  template: '<h1></h1>'
})
export class SelectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    d3.select('h1')
      .style('color', 'blue')
      .attr('id', 'heading')
      .text('hello D3');

    const bodyElement = d3.select('body');

    bodyElement.append('p').text('paragraph');
    bodyElement.append('p').text('pizza');
    bodyElement.append('p').text('banana');

    d3.selectAll('p').style('color', 'orange');
  }
}
