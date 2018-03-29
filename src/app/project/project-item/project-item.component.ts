import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onInviteClick() {
    this.onInvite.emit();
  }

}
