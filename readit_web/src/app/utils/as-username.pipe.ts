import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'asUsername'
})
export class AsUsernamePipe implements PipeTransform {
    transform(value: string): string {
        return `u/${value}`;
    }
}
