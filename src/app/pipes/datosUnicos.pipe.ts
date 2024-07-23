import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unique'
})
export class UniquePipe implements PipeTransform {
    transform(items: any[], property: string): any[] {
        if (!items || !property) {
            return items;
        }

        return items.filter((item, index, self) =>
            index === self.findIndex(t => t[property] === item[property])
        );
    }
}