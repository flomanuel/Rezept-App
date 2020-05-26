import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-multiselect-modal',
  templateUrl: './multiselect-modal.component.html',
  styleUrls: ['./multiselect-modal.component.less'],
})
export class MultiselectModalComponent implements OnInit, OnDestroy {
  @Input() private id!: string;
  @Input() private options!: string[];
  @Input() private title!: string;
  @Input() private items!: string[];
  @Output() private optionsSelected: EventEmitter<string[]> = new EventEmitter<string[]>();
  private readonly element: any;

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
    this.element.style.display = 'block';
  }

  closeModal(): void {
    this.element.style.display = 'none';
    this.optionsSelected.emit(this.items);
  }

  addOption(option: string): boolean {
    if (this.items && option) {
      this.items.push(option);
      this.optionsSelected.emit(this.items);
      return true;
    }
    return false;
  }

  removeOption(option: string): boolean {
    if (this.items && option) {
      const index = this.items.indexOf(option);
      if (index >= 0) {
        this.items.splice(index, 1);
        this.optionsSelected.emit(this.items);
        return true;
      }
      return false;
    }
  }
}
