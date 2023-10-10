import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.css'],
})
export class CodeBlockComponent implements OnInit {
  @Input() code!: string;

  constructor() {}

  ngOnInit() {}
}
