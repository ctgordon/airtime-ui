export class TableConfig {
  headers!: Array<string>
  data!: Array<{
    obj: any,
    values: any[],
  }>
  editable!: boolean;
}
