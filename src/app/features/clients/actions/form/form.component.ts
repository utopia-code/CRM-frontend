import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { CreateClientDto } from '../../dtos/create-client.dto';
import { UpdateClientDto } from '../../dtos/update-client.dto';
import { ClientStatus } from '../../enums/clientStatus.enum';
import { Client } from '../../models/client.model';
import { Contact } from '../../models/contact.model';
import { ClientsService } from '../../services/clients.service';

type ContactForm = FormGroup<{
  id: FormControl<number | null>;
  name: FormControl<string>;
  role: FormControl<string>;
  email: FormControl<string>;
  telephone: FormControl<string>;
}>;

type ClientForm = FormGroup<{
  organization: FormControl<string>;
  subject: FormControl<string>;
  status: FormControl<ClientStatus>;
  notes: FormControl<string>;
  contacts: FormArray<ContactForm>;
}>;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class CreateFormComponent {
  // private fb = inject(FormBuilder);
  private fb = inject(NonNullableFormBuilder);
  private clientsService = inject(ClientsService);

  client = input<Client | null>(null);

  saved = output<void>();
  cancelled = output<void>();

  form: ClientForm = this.fb.group({
    organization: this.fb.control('', Validators.required),
    subject: this.fb.control(''),
    status: this.fb.control(ClientStatus.ACTIVE),
    notes: this.fb.control(''),
    contacts: this.fb.array([this.createContact()]),
  });

  constructor() {
    effect(() => {
      const client = this.client();

      if (!client) {
        return;
      }

      this.form.patchValue({
        organization: client.organization,
        subject: client.subject ?? '',
        status: client.status,
        notes: client.notes ?? '',
      });

      this.contacts.clear();

      if (client.contacts.length) {
        client.contacts.forEach((contact) => this.contacts.push(this.createContact(contact)));
      } else {
        this.contacts.push(this.createContact());
      }
    });
  }

  get contacts() {
    return this.form.controls.contacts;
  }

  private createContact(contact?: Contact): ContactForm {
    return new FormGroup({
      id: new FormControl<number | null>(contact?.id ?? null),
      name: new FormControl(contact?.name ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      role: new FormControl(contact?.role ?? '', { nonNullable: true }),
      email: new FormControl(contact?.email ?? '', { nonNullable: true }),
      telephone: new FormControl(contact?.telephone ?? '', { nonNullable: true }),
    });
  }

  addContact() {
    this.contacts.push(this.createContact());
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const contacts = raw.contacts.map(({ id, ...contact }) => ({
      ...contact,
      ...(id != null ? { id } : {}),
    }));

    if (this.client()) {
      const dto: UpdateClientDto = {
        ...raw,
        contacts,
      };

      this.clientsService.updateClient(this.client()!.id, dto).subscribe({
        next: () => this.saved.emit(),
        error: console.error,
      });
    } else {
      const dto: CreateClientDto = {
        ...raw,
        contacts,
      };

      this.clientsService.createClient(dto).subscribe({
        next: () => {
          this.saved.emit();

          this.form.reset({
            organization: '',
            subject: '',
            status: ClientStatus.ACTIVE,
            notes: '',
          });

          this.contacts.clear();
          this.contacts.push(this.createContact());
        },
        error: console.error,
      });
    }
  }
}
