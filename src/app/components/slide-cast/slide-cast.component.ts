import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { CastElement } from '../../interfaces/credits-response';

@Component({
  selector: 'app-slide-cast',
  templateUrl: './slide-cast.component.html',
  styleUrls: ['./slide-cast.component.css']
})
export class SlideCastComponent implements OnInit, AfterViewInit {

  @Input() casting: CastElement[];

  constructor() {}
  
  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 5.3,
        freeMode: true,
        spaceBetween: 15
      }
    );
  }
  
  ngOnInit(): void {
    console.log("imprimiendo desde el slide del casting ");
    console.log(this.casting);
  }
  
}
