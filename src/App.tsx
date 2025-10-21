
import { Container, Grid, Paper, Typography, Snackbar, Alert } from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import GeneratedContent from './components/GeneratedContent'
import DraftList from './components/DraftList'
import { useState } from 'react'

export default function App() {
  const [content, setContent] = useState('')
  const [toast, setToast] = useState<{open: boolean; message: string; severity: 'success'|'error'|'info'}>({open:false, message:'', severity:'success'})

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} className="card-blur" sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom className="white">📄 Generate Blog</Typography>
              <BlogForm onGenerated={setContent} onError={(m)=>setToast({open:true,message:m,severity:'error'})} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={0} className="card-blur" sx={{ p: 3, minHeight: 420 }}>
              <Typography variant="h5" gutterBottom className="white">🧠 AI Output</Typography>
              <GeneratedContent content={content} onToast={(m,s)=>setToast({open:true,message:m,severity:s})} />
            </Paper>
            <Paper elevation={0} className="card-blur" sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom className="white">📚 Drafts</Typography>
              <DraftList onLoadDraft={(c)=>setContent(c)} onToast={(m,s)=>setToast({open:true,message:m,severity:s})} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={()=>setToast({...toast, open:false})}>
        <Alert onClose={()=>setToast({...toast, open:false})} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}
