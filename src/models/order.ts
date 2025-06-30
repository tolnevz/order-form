export enum Status {
  Draft = 'Черновик',
  Published = 'Опубликован',
  InProgress = 'Выполняется',
  Completed = 'Завершён',
}

export interface Order {
  photo: string;
  photoName: string;
  attachedFiles: File[];
  title: string;
  description: string;
  manufacturer: Manufacturer;
  organization: Organization;
  status: string;
}

export interface File {
  name: string;
  type: string;
  size: number;
}

export interface Manufacturer {
  name: string;
  contact: string;
}

export interface Organization {
  name: string;
  address: string;
}
