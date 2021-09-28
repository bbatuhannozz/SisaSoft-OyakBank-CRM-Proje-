import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.css']
})
export class LeftsideComponent implements OnInit {

  imagePath = "../../assets/oyak.png"

  constructor() { }

  ngOnInit(): void {
  }

}
