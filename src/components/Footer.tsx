
import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ textAlign: 'center', py: 3, opacity: 0.8 }}>
      <Typography variant="body2">© {new Date().getFullYear()} AI Blog Generator • Built with React + FastAPI</Typography>
    </Box>
  )
}
