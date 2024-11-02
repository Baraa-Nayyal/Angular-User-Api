import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalItems: number;
  @Output() pageChange = new EventEmitter<number>();

  pageSize: number = 6;

  constructor() {}

  ngOnInit() {}

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
