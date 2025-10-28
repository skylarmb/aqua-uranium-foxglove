export interface LLMResponse {
  id: string;
  timestamp: string;
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  response_time_ms: number;
  status: string;
  cost_usd: number;
  temperature: number;
  max_tokens: number;
  prompt_template: string;
  output: string;
  evaluation_metrics: {
    relevance_score: number;
    factual_accuracy: number;
    coherence_score: number;
    response_quality: number;
  };
  error: null | {
    type: string;
    message: string;
  }; // Assumption here, TODO to test
}

export interface DataSet {
  id: string;
  name: string;
  responses: LLMResponse[];
  createdAt: number;
}
