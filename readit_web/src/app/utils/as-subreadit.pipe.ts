import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "asSubreadit",
})
export class AsSubreaditPipe implements PipeTransform {
    transform(value: string): string {
        return `r/${value}`;
    }
}
