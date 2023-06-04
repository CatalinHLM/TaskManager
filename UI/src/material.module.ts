import { NgModule } from "@angular/core";
import { MatInputModule} from "@angular/material/input";
import { MatSelectModule} from "@angular/material/select";
import { MatRadioModule} from "@angular/material/radio";
import { MatCardModule} from "@angular/material/card";
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatTableModule} from "@angular/material/table";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatSortModule} from "@angular/material/sort";
import { MatDialogModule} from "@angular/material/dialog";
import { MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
    exports:[
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})
export class MaterialModule{

}