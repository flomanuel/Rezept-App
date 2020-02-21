import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Image } from '../../../entity/image.class';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.less'],
})
export class ImageGalleryComponent implements AfterViewInit {

  @Input() 'images': Image[];
  @Input() 'width' = '100vw';
  @Input() 'height' = '100vh';

  private gallery: HTMLElement;
  private wrapperWidth: number;
  private galleryChildren;
  private pointer: number;
  private buttonLeft: HTMLElement;
  private buttonRight: HTMLElement;
  private sliderAvailable: boolean;

  constructor() {
  }

  ngAfterViewInit() {
    this.initGallery();
  }

  initGallery() {
    this.sliderAvailable = false;
    this.gallery = document.querySelector('.image-gallery-wrapper');
    this.calculateWrapperWidth();
    this.styleWrapperElement();
    this.styleChildElements();
    this.pointer = 0;
    this.initControlButtons();
    // todo: add pan-left / pan-right touch implementation (using HAMMER.JS)
    this.sliderAvailable = true;
  }

  private calculateWrapperWidth() {
    this.wrapperWidth = 100 * this.gallery.childElementCount;
  }

  private styleWrapperElement() {
    this.gallery.style.width = this.wrapperWidth.toString() + '%';
    this.gallery.style.marginLeft = '0';
  }

  private styleChildElements() {
    this.galleryChildren = this.gallery.children;
    const childAmount = this.galleryChildren.length;
    for (let i = 0; i < this.galleryChildren.length; i++) {
      this.galleryChildren[i].style.width = 100 / childAmount + '%';
    }
  }

  private slideLeft() {
    this.sliderAvailable = false;
    this.pointer--;
    this.gallery.style.marginLeft = (100 * this.pointer).toString() + '%';
    this.sliderAvailable = true;
  }

  private slideRight() {
    this.sliderAvailable = false;
    this.pointer++;
    this.gallery.style.marginLeft = (100 * this.pointer).toString() + '%';
    this.sliderAvailable = true;
  }

  private initControlButtons() {
    this.buttonLeft = document.querySelector('.sliderButton--left');
    this.buttonRight = document.querySelector('.sliderButton--right');

    this.buttonLeft.onclick = () => {
      if (this.sliderAvailable && this.pointer < 0) {
        this.slideRight();
      }
    };

    this.buttonRight.onclick = () => {
      if (this.sliderAvailable && this.pointer > ((this.galleryChildren.length - 1) * -1)) {
        this.slideLeft();
      }
    };
  }
}
