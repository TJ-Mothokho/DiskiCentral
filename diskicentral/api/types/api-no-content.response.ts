export interface ApiNoContentResponse<
  Endpoint extends string,
  Report extends string = Endpoint,
  Parameters = [],
> {
  get: Endpoint;
  parameters: Parameters;
  errors: {
    time: string;
    bug: string;
    report: Report;
  };
  results: 0;
  paging: {
    current: number;
    total: number;
  };
  response: [];
}
