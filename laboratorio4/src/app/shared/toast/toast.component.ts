import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' = 'success';
  isVisible: boolean = false;

  ngOnInit(): void {
    this.showToast();
  }

  showToast() {
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 3000); // Oculta el toast después de 3 segundos
  }
}
