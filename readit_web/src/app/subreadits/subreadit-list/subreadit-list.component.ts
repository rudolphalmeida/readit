import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Subreadit} from "../subreadit";

@Component({
  selector: 'readit-subreadit-list',
  templateUrl: './subreadit-list.component.html',
  styleUrls: ['./subreadit-list.component.less']
})
export class SubreaditListComponent {
    @Input()
    subreadits: BehaviorSubject<Subreadit[]> = new BehaviorSubject<Subreadit[]>([]);

    @Output("loadPreviousPage")
    loadPreviousPage: EventEmitter<unknown> = new EventEmitter<unknown>();

    @Output("loadNextPage")
    loadNextPage: EventEmitter<unknown> = new EventEmitter<unknown>();
}
