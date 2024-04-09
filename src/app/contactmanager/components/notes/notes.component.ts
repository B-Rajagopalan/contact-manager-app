import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '../../models/note';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort;

    
    @Input() notes!: Note[]
    displayedColumns: string[] = ['position', 'title', 'date'];
    dataSource!: MatTableDataSource<Note> //used to easily access some mat features (filter, sort, etc.)

    //executes after component loads
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
        // placing paginator in this lifecycle hook to access the rendered notes object
        // that is done in ngOnInit
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Note>(this.notes);
    }

    applyFilter(event: Event) {
        let filter = (event.target as HTMLInputElement).value.trim().toLowerCase()
        this.dataSource.filter = filter;
    }
}
