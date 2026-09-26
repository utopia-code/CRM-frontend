import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ClientName } from '../../../clients/models/clients-name.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { CreateTaskDto } from '../../dtos/create-task.dto';
import { TaskPriority } from '../../enums/task-priority.enum';
import { TaskStatus } from '../../enums/task-status.enum';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';

type TaskFormGroup = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string | null>;
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
  clientId: FormControl<number | null>;
  endDate: FormControl<string | null>;
  reminderDate: FormControl<string | null>;
}>;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  readonly TaskStatus = TaskStatus;
  readonly TaskPriority = TaskPriority;

  private fb = inject(NonNullableFormBuilder);
  private tasksService = inject(TasksService);
  private clientsService = inject(ClientsService);

  task = input<Task | null>(null);

  saved = output<void>();
  cancelled = output<void>();

  isSubmitting = false;

  clients: ClientName[] = [];

  form: TaskFormGroup = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control<string | null>(null),
    status: this.fb.control(TaskStatus.PENDING),
    priority: this.fb.control(TaskPriority.MEDIUM),
    clientId: this.fb.control<number | null>(null),
    endDate: this.fb.control<string | null>(null),
    reminderDate: this.fb.control<string | null>(null),
  });

  constructor() {
    effect(() => {
      const task = this.task();

      if (!task) {
        this.resetForm();
        return;
      }

      this.form.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        clientId: task.client?.id ?? null,
        endDate: this.toDateInput(task.scheduleEntry?.endDate),
        reminderDate: this.toDateTimeLocal(task.scheduleEntry?.reminderDate),
      });
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.clientsService.getClientsName().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      },
    });
  }

  private toDateInput(value: Date | string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private toDateTimeLocal(value: Date | string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private dateToEndOfDay(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(`${value}T23:59:59`);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString();
  }

  private dateTimeLocalToISOString(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString();
  }

  private resetForm(): void {
    this.form.reset({
      title: '',
      description: null,
      status: TaskStatus.ACTIVE,
      priority: TaskPriority.LOW,
      clientId: null,
      endDate: null,
      reminderDate: null,
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const raw = this.form.getRawValue();

    const dto: CreateTaskDto = {
      title: raw.title,
      description: raw.description,
      status: raw.status,
      priority: raw.priority,
      clientId: raw.clientId,
      endDate: this.dateToEndOfDay(raw.endDate),
      reminderDate: this.dateTimeLocalToISOString(raw.reminderDate),
    };

    const task = this.task();

    if (task) {
      this.tasksService.updateTask(task.id, dto).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.saved.emit();
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.isSubmitting = false;
        },
      });

      return;
    }

    this.tasksService.createTask(dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.saved.emit();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.isSubmitting = false;
      },
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
