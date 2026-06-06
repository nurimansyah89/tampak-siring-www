import { Component, input, output, signal, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  imports: [DecimalPipe],
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  readonly accept = input<string>('image/*');
  readonly label = input<string>('Unggah Foto (Opsional)');
  readonly hint = input<string>('Klik atau seret gambar ke sini');

  readonly fileChange = output<File | null>();

  protected isDragOver = signal(false);
  protected selectedFile = signal<File | null>(null);

  @HostListener('dragover', ['$event'])
  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  @HostListener('dragleave', ['$event'])
  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  @HostListener('drop', ['$event'])
  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    const file = event.dataTransfer?.files[0] ?? null;
    this.setFile(file);
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.setFile(file);
  }

  protected removeFile(): void {
    this.selectedFile.set(null);
    this.fileChange.emit(null);
  }

  protected openFilePicker(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = this.accept();
    input.onchange = (event) => this.onFileSelected(event);
    input.click();
  }

  private setFile(file: File | null): void {
    this.selectedFile.set(file);
    this.fileChange.emit(file);
  }
}
