import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Post } from "../posts/post";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "readit-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.less"],
})
export class PostListComponent {
    @Input()
    posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

    @Output("loadPreviousPage")
    loadPreviousPage: EventEmitter<unknown> = new EventEmitter<unknown>();

    @Output("loadNextPage")
    loadNextPage: EventEmitter<unknown> = new EventEmitter<unknown>();
}
