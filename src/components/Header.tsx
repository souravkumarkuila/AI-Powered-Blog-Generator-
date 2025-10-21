
import { AppBar, Toolbar, Typography, Box, Chip } from '@mui/material'

export default function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>AI-Powered Blog Generator</Typography>
        <Box>
          <Chip label="Azure OpenAI" color="primary" variant="outlined" />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
