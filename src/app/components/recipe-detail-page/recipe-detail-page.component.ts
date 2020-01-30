import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recipedetailpage',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.css']
})
export class RecipedetailpageComponent implements OnInit {

  public index: number;

  constructor(private dataService: DataService) {
    this.index = 0;
  }

  ngOnInit() {
  }


}
