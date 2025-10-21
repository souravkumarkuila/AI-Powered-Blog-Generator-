
import axios from 'axios'
import type { GeneratePayload, Draft } from '../types'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' })

export async function generateBlog(payload: GeneratePayload): Promise<{content:string}> {
  const { data } = await api.post('/api/generate', payload)
  return data
}

export async function saveDraft(payload: Partial<Draft> & { content: string }): Promise<Draft> {
  const { data } = await api.post('/api/drafts', payload)
  return data
}

export async function listDrafts(): Promise<Draft[]> {
  const { data } = await api.get('/api/drafts')
  return data
}

export async function deleteDraft(id: number): Promise<void> {
  await api.delete(`/api/drafts/${id}`)
}
