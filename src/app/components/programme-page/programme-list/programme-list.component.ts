import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programme-list',
  templateUrl: './programme-list.component.html',
  styleUrls: ['./programme-list.component.css']
})
export class ProgrammeListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public isCollapsed = false;
}
