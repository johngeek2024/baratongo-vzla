import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class Modal {
  // @Output permite al componente emitir eventos hacia su padre
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
