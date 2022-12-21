import {Aircraft} from "./aircraft";

export class CustomReport {
  id!: number;
  reportType!: { id: string, name: string };
  reportName!: {};
  startDate!: string;
  endDate!: string;
  aircraft!: Aircraft;
  inUse!: boolean;
}
