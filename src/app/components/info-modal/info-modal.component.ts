import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.less'],
})
export class InfoModalComponent implements OnInit, OnDestroy {
  private readonly element: any;
  @Input() id!: string;
  @Input() title!: string;
  @Input() message!: string;
  @Input() opacity?: number;

  constructor(private readonly modalService: ModalService, private readonly el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    if (!this.id) {
      throw new Error('Modal must have an id');
    }

    this.element.style.display = 'none';

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  openModal(): void {
    if (this.opacity) {
      this.element.style.opacity = this.opacity;
    }
    this.element.style.display = 'block';
  }

  closeModal(): void {
    this.element.style.display = 'none';
  }
}
