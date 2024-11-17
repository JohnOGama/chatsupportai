export interface Message {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: 'assistant' | 'user' | 'agent';
  content: ContentItem[];
  metadata: Record<string, any>;
}

interface ContentItem {
  type: string;
  text: {
    value: string;
    annotations: any[];
  };
}
