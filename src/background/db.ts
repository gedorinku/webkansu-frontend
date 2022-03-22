import Dexie, { Table } from 'dexie';

export interface Header {
  key: string;
  value: string;
}

export class WebkansuDB extends Dexie {
  headers!: Table<Header>;

  constructor() {
    super('webkansu-db');
    this.version(1).stores({
      headers: 'key, value'
    });
  }
}

export const db = new WebkansuDB();
