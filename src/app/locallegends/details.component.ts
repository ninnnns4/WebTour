import { Component, OnInit } from '@angular/core';
import { LegendService } from '@app/_services';
import { Legend } from '@app/_models';

@Component({
  templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {
  legends: Legend[] = [];

  constructor(private legendService: LegendService) { }

  ngOnInit() {
    this.loadLegends();
  }

  loadLegends() {
    this.legendService.getAll().subscribe(
      legends => {
        this.legends = legends;
      },
      error => {
        console.error('Error fetching legends:', error);
      }
    );
  }
}
