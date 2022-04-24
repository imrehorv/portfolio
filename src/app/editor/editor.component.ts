import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  assetForm = this.formBuilder.group({
    id: ['', Validators.required],
    quantity: [
      '',
      Validators.compose([Validators.required, Validators.min(0)]),
    ],
  });
  assets: Asset[] = [];
  label = 'Add';
  displayedColumns: string[] = ['id', 'quantity', 'edit', 'delete'];
  constructor(
    private assetService: AssetService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.load();
  }

  load() {
    this.assets = this.assetService.load();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.assetForm.valid) {
      return;
    }
    this.assetService.add(this.assetForm.value);
    this.assetForm.reset();
    this.load();
  }

  edit(id: string) {
    let asset = this.assetService.find(id);
    if (asset === undefined) {
      return;
    }
    this.assetForm.controls['id'].setValue(asset.id);
    this.assetForm.controls['quantity'].setValue(asset.quantity);
    this.label = 'Update';
  }

  delete(id: string) {
    let asset = this.assetService.find(id);
    if (asset === undefined) {
      return;
    }
    this.assetService.delete(asset);
    this.load();
  }

  deleteAll() {
    const dialogRef = this.dialog.open(DeletedialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        this.assetService.deleteAll();
        this.load();
      }
    });
  }
}
