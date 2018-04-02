import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragDropService} from '../drag-drop.service';

@Directive({
  selector: '[appDraggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {

  private _isDraggable = false;


  get isDraggable(): boolean {
    return this._isDraggable;
  }

  @Input('appDraggable')
  set isDraggable(draggable: boolean) {
    this._isDraggable = draggable;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${draggable}`);
  }

  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input() dragData: string;

  constructor(private el: ElementRef, private rd: Renderer2, private service: DragDropService) {
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData})
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }

}
