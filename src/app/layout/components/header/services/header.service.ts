import { Injectable, signal } from '@angular/core';

export interface HeaderAction {
  label: string;
  icon?: string;
  action: () => void;
}

export interface HeaderConfig {
  title: string;
  actions: HeaderAction[];
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private _config = signal<HeaderConfig>({
    title: '',
    actions: [],
  });

  readonly config = this._config.asReadonly();

  set(config: HeaderConfig) {
    this._config.set(config);
  }

  clear() {
    this._config.set({
      title: '',
      actions: [],
    });
  }
}
