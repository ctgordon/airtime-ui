import {Aircraft} from "./aircraft";
import {ReportType} from "./report.type";

export class CustomReport {
  id!: number;
  reportType!: ReportType;
  reportName!: string;
  startDate!: string;
  endDate!: string;
  aircraft!: Aircraft;
  inUse!: boolean;
}
