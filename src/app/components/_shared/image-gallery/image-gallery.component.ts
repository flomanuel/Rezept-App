import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Image } from '../../../entity/image.class';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.less'],
})
export class ImageGalleryComponent implements AfterViewInit {

  @Input() 'images': Image[];

  private gallery: HTMLElement;
  private wrapperWdith: number;
  private galleryChildren;
  private pointer: number;

  constructor() {
  }

  ngAfterViewInit() {
    this.initGallery();
  }

  initGallery() {
    this.gallery = document.querySelector('.image-gallery-wrapper');
    this.calculateWrapperWidth();
    this.styleWrapperElement();
    this.styleChildElements();
    this.pointer = 0;
  }

  private calculateWrapperWidth() {
    this.wrapperWdith = 100 * this.gallery.childElementCount;
  }

  private styleWrapperElement() {
    this.gallery.style.width = this.wrapperWdith.toString() + '%';
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
    this.pointer--;
    this.gallery.style.margin = 100;
  }

  private slideRight() {
    this.pointer++;
    this.gallery;
  }
}
