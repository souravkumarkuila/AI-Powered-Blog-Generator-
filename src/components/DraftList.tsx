
import { useEffect, useState } from 'react'
import { Draft } from '../types'
import { deleteDraft, listDrafts } from '../services/api'
import { List, ListItem, ListItemText, IconButton, Tooltip, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export default function DraftList({ onLoadDraft, onToast }:{ onLoadDraft:(c:string)=>void, onToast:(m:string, s:'success'|'error'|'info')=>void }) {
  const [items, setItems] = useState<Draft[]>([])

  const refresh = async () => {
    try { const data = await listDrafts(); setItems(data) } catch { /* ignore */ }
  }

  useEffect(()=>{ refresh() },[])

  if (!items.length) return <Typography variant="body2" sx={{opacity:0.7}}>No drafts yet.</Typography>

  return (
    <List>
      {items.map(d => (
        <ListItem key={d.id} secondaryAction={
          <Stack direction="row" spacing={1}>
            <Tooltip title="Copy">
              <IconButton edge="end" onClick={async ()=>{ await navigator.clipboard.writeText(d.content); onToast('Draft copied','success') }}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton edge="end" onClick={async ()=>{ await deleteDraft(d.id); onToast('Draft deleted','success'); refresh() }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        }>
          <ListItemText primary={d.topic || 'Untitled draft'} secondary={new Date(d.updated_at).toLocaleString()} onClick={()=>onLoadDraft(d.content)} sx={{ cursor: 'pointer' }} />
        </ListItem>
      ))}
    </List>
  )
}
