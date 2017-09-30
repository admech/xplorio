import { Component, OnInit, Output } from '@angular/core';

import { SolutionService } from '../solution.service';

import { XSolution, AvailableData, SelectedItems } from '../solution-data';

@Component({
  selector: 'data-selector',
  templateUrl: './data-selector.component.html',
  styleUrls: ['./data-selector.component.css']
})
export class DataSelectorComponent implements OnInit {

  private availableData: AvailableData;
  private selectedItems: SelectedItems = {
    variable: null,
    solutions: []
  };

  constructor(
    private solutionService: SolutionService
  ) { }

  ngOnInit() {
    this.availableData = this.solutionService.getAvailableData();
  }

  isSelected(solution: string, variable: string): boolean {
    return this.selectedItems.variable === variable && this.selectedItems.solutions.indexOf(solution) >= 0;
  }

  select(solution: string, variable: string) {
    if (this.selectedItems.variable !== variable) {
      this.selectedItems.solutions = [];
    }
    this.selectedItems.variable = variable;
    this.selectedItems.solutions.push(solution);

    this.solutionService.setSelectedItems(this.selectedItems);
  }

  deselect(solution: string, variable: string) {
    this.selectedItems.solutions = this.selectedItems.solutions.filter((sol, i, sols) => sol !== solution)

    this.solutionService.setSelectedItems(this.selectedItems);
  }

}
