import dayjs from 'dayjs';

export interface ICompany {
  id?: number;
  companyName?: string;
  companyAddress?: string;
  companyDescription?: string | null;
  createDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<ICompany> = {};
