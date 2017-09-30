import { Injectable } from '@angular/core';

import { XSolution, AvailableData, SelectedItems } from './solution-data';

import { NewChartData } from './chart-types';

const SOLUTIONS: XSolution[] = [
  {
    name: 'long self rot',
    variables: [
      {
        name: 'energy', x: 'time', y: 'kin en',
        series: [[0, 100], [1, 99], [2, 98], [3, 97], [4, 96], [5, 95], [6, 94], [7, 93]]
      },
      {
        name: 'trajectory', x: 'x', y: 'y',
        series: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      },
      {
        name: 'theta', x: 'time', y: 'theta',
        series: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
      },
    ]
  },
  {
    name: 'long diag',
    variables: [
      {
        name: 'energy', x: 'time', y: 'kin en',
        series: [[0, 100], [1, 50], [2, 25], [3, 15], [4, 7], [5, 3], [6, 2], [7, 1.5]]
      },
      {
        name: 'trajectory', x: 'x', y: 'y',
        series: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]]
      },
      {
        name: 'theta', x: 'time', y: 'theta',
        series: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]
      },
    ]
  },
];

@Injectable()
export class SolutionService {

  private selectedItems: SelectedItems = { variable: null, solutions: [] };

  getAvailableData(): AvailableData {
    return {
      solutions: SOLUTIONS.map(sol => sol.name),
      variables: SOLUTIONS[0].variables.map(v => v.name)
    }
  }

  setSelectedItems(items: SelectedItems) {
    this.selectedItems = items;
  }

  getSelectedItems(): SelectedItems {
    return this.selectedItems;
  }

  getDataForSelectedItems(): NewChartData {
    return {
      name: this.selectedItems.variable,
      listOfSeries: this.selectedItems.solutions
        .map(name => SOLUTIONS.find(sol => sol.name === name))
        .map(sol => sol.variables.find(v => v.name === this.selectedItems.variable).series),
      solutions: this.selectedItems.solutions,
      x: SOLUTIONS[0].variables.find(v => v.name === this.selectedItems.variable).x,
      y: SOLUTIONS[0].variables.find(v => v.name === this.selectedItems.variable).y
    };
  }

}


