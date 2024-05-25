import dayjs from 'dayjs';
import { ICompany } from 'app/shared/model/company.model';

export interface ICustomer {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  contact?: string | null;
  address?: string | null;
  createDate?: dayjs.Dayjs | null;
  company?: ICompany;
}

export const defaultValue: Readonly<ICustomer> = {};
