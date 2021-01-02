import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/billboard-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() moviesSlide: Movie[];
  private mySwiper: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      grabCursor: true
    });
  }


  onSlideNext(): void {
    this.mySwiper.slideNext();
  }

  onSlideBack(): void {
    this.mySwiper.slidePrev();
  }

}
