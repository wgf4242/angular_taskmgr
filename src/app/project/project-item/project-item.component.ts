import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDel = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onDelClick() {
    this.onDel.emit();
  }
}
