
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GeneratePayload } from '../types'
import { TextField, Stack, Button, MenuItem, InputAdornment, LinearProgress } from '@mui/material'
import { generateBlog } from '../services/api'
import { useState } from 'react'

const schema = z.object({
  topic: z.string().min(3, 'Enter a topic (min 3 chars)'),
  keywords: z.string().min(0).default(''),
  tone: z.enum(['informative','casual','professional','friendly','persuasive']).default('informative'),
  audience: z.string().min(2, 'Specify audience'),
  word_count: z.coerce.number().int().min(200).max(2000)
})

type FormValues = z.infer<typeof schema>

export default function BlogForm({ onGenerated, onError }:{ onGenerated:(s:string)=>void, onError:(m:string)=>void }) {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { tone:'informative', word_count: 800 } })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      const res = await generateBlog(data as GeneratePayload)
      onGenerated(res.content)
    } catch (e:any) {
      onError(e?.response?.data?.detail || e.message || 'Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller name="topic" control={control} render={({ field }) => (
          <TextField label="Topic" placeholder="e.g., Edge AI in healthcare" {...field} error={!!errors.topic} helperText={errors.topic?.message} fullWidth />
        )} />
        <Controller name="keywords" control={control} render={({ field }) => (
          <TextField label="Keywords (comma-separated)" placeholder="AI, edge computing, patient monitoring" {...field} fullWidth />
        )} />
        <Controller name="tone" control={control} render={({ field }) => (
          <TextField select label="Tone" {...field} fullWidth>
            {['informative','casual','professional','friendly','persuasive'].map(t => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>
        )} />
        <Controller name="audience" control={control} render={({ field }) => (
          <TextField label="Audience" placeholder="CTOs, product managers, beginners" {...field} error={!!errors.audience} helperText={errors.audience?.message} fullWidth />
        )} />
        <Controller name="word_count" control={control} render={({ field }) => (
          <TextField type="number" label="Word Count" {...field} error={!!errors.word_count} helperText={errors.word_count?.message} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">words</InputAdornment> }} />
        )} />
        {loading && <LinearProgress />}
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={loading}>Generate with AI</Button>
          <Button type="button" variant="outlined" disabled={loading} onClick={()=>reset()}>Reset</Button>
        </Stack>
      </Stack>
    </form>
  )
}
