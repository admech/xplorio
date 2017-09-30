import { Injectable } from '@angular/core';

import { XSolution, AvailableData, SelectedItems } from './solution-data';

const SOLUTIONS: XSolution[] = [
  {
    name: 'long self rot',
    variables: [
      {
        name: 'energy', x: 'time', y: 'kin en',
        series: [[0, 100], [0, 99], [0, 98], [0, 97], [0, 96], [0, 95], [0, 94], [0, 93]]
      },
      {
        name: 'trajectory', x: 'x', y: 'y',
        series: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      },
      {
        name: 'theta', x: 'time', y: 'theta',
        series: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]]
      },
    ]
  } as XSolution,
  {
    name: 'long diag',
    variables: [
      {
        name: 'energy', x: 'time', y: 'kin en',
        series: [[0, 100], [0, 50], [0, 25], [0, 15], [0, 7], [0, 3], [0, 2], [0, 1.5]]
      },
      {
        name: 'trajectory', x: 'x', y: 'y',
        series: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]]
      },
      {
        name: 'theta', x: 'time', y: 'theta',
        series: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      },
    ]
  } as XSolution,
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

}


