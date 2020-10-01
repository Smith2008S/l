export interface DataGPS {
  channel: object;
  feeds: Array<DataGPSColumns>;
}

export interface DataGPSColumns {
  created_at: string;
  entry_id: number;
  field1: string;
  field2: string;
}