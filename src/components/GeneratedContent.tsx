
import { Button, Stack, TextField } from '@mui/material'
import { saveDraft } from '../services/api'
import { useState } from 'react'

export default function GeneratedContent({ content, onToast }:{ content:string, onToast:(m:string, s:'success'|'error'|'info')=>void }) {
  const [value, setValue] = useState(content)

  // Keep local state in sync when parent updates content
  if (content !== value) setValue(content)

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(value); onToast('Copied to clipboard','success') } catch { onToast('Copy failed','error') }
  }

  const handleSave = async () => {
    try {
      const payload = { topic: '', keywords: '', tone: 'informative', audience: '', word_count: value.split(/\s+/).length, content: value }
      await saveDraft(payload)
      onToast('Draft saved','success')
    } catch (e:any) {
      onToast(e?.response?.data?.detail || 'Failed to save draft','error')
    }
  }

  return (
    <Stack spacing={2}>
      <TextField value={value} onChange={e=>setValue(e.target.value)} placeholder="Generated content will appear here" fullWidth multiline minRows={14} />
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={handleCopy}>Copy</Button>
        <Button variant="contained" onClick={handleSave} disabled={!value?.trim()}>Save as Draft</Button>
      </Stack>
    </Stack>
  )
}
