import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {SubreaditService} from "../subreadit.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'readit-new-subreadit',
    templateUrl: './new-subreadit.component.html',
    styleUrls: ['./new-subreadit.component.less']
})
export class NewSubreaditComponent {
    name = new FormControl('', [Validators.required]);

    constructor(
        private dialogRef: MatDialogRef<NewSubreaditComponent>,
        private subreaditService: SubreaditService,
        private snackBar: MatSnackBar,
    ) {
    }

    async createNewSubreadit() {
        if (!this.name.value) {
            return;
        }

        try {
            const subreadit = await this.subreaditService.createSubreaditWithName(this.name.value);
            this.snackBar.open('Created Subreadit', undefined, {
                duration: 3000
            });
            this.dialogRef.close();
        } catch (e: any) {
            console.log(e)
            this.snackBar.open(`Error: ${e.error.name[0]}`, undefined, {duration: 3000});
        }
    }
}
