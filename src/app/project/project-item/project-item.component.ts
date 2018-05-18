import {Component, EventEmitter, Input, OnInit, Output, HostBinding, HostListener, ChangeDetectionStrategy} from '@angular/core';
import {cardAnim} from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
  animations: [cardAnim],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDel = new EventEmitter();
  @Output() onSelected = new EventEmitter();
  @HostBinding('@card') cardState = 'out';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  constructor() {
  }

  ngOnInit() {
  }

  onInviteClick(ev: Event) {
    ev.stopPropagation();
    this.onInvite.emit();
  }

  onEditClick(ev: Event) {
    ev.stopPropagation();
    this.onEdit.emit();
  }

  onDelClick(ev: Event) {
    ev.stopPropagation();
    this.onDel.emit();
  }

  onClick() {
    this.onSelected.emit();
  }
}
