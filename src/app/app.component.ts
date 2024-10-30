import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Habit } from '../models/habit';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public adding = false; // для добавления привычки
  public editing = false; // для редима редактирования
  public editingIndex: number | null = null; // индекс редактируемой привычки

  public habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
  });

  public habits: Habit[] = [
    {
      name: '15 Minute Walk',
      frequency: 'Daily',
      description: 'This habit makes my kitchen look nice and makes my day better the next morning.',
    },
    {
      name: 'Weed the Garden',
      frequency: 'Weekly',
      description: 'The weeds get so out of hand if they wait any longer, and I like how nice our home looks with a clean lawn.',
    }
  ];

  // мктод отправки формы
  public onSubmit() {
    const habit = this.habitForm.value as Habit;

    if (this.editing && this.editingIndex !== null) {
      this.habits[this.editingIndex] = habit; // заменяет привычку на обновленные данные
    }
    else {
      this.habits.push(habit); // добавляет новую привычку
    }

    this.resetFormState();
  }
  // метод удаления
  public onDelete(index: number) {
    this.habits.splice(index, 1);
  }

  public setEditForm(habit: Habit, index: number) {
    this.habitForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description
    });

    this.editing = true;
    this.adding = true;
    this.editingIndex = index;
  }

  public cancelEditing() {
    this.habitForm.reset();
    this.resetFormState();
  }

  private resetFormState() {
    this.adding = false;
    this.editing = false;
    this.editingIndex = null;
    this.habitForm.reset();
  }
}
