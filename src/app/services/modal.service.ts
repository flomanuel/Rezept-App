import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  openModal(id: string) {
    const modal = this.modals.find(x => x.id === id);
    modal.openModal();
  }

  closeModal(id: string) {
    const modal = this.modals.find(x => x.id === id);
    modal.closeModal();
  }

  get(id: string) {
    return this.modals.find(x => x.id === id);
  }
}
