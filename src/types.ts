
export type GeneratePayload = {
  topic: string
  keywords: string
  tone: 'informative' | 'casual' | 'professional' | 'friendly' | 'persuasive'
  audience: string
  word_count: number
}

export type Draft = {
  id: number
  topic: string
  keywords: string
  tone: string
  audience: string
  word_count: number
  content: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}
