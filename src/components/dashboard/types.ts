// types.ts
export interface IncidentData {
  day: string;
  shift: string;
  incidents_processed: number;
  title_accuracy: number;
  body_relevance: number;
  address_accuracy: number;
  category_accuracy: number;
  click_through_rate: number;
  response_time: number;
  critical_incidents: number;
}

export interface AnalystData {
  name: string;
  overall_accuracy: number;
  incidents_processed: number;
  click_through_rate: number;
  avg_response_time: number;
  critical_accuracy: number;
  quality_score: number;
}
