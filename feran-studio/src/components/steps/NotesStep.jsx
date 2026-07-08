import { useState } from 'react'
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import { MESSAGES } from '../../constants/messages'
import ReceptionistMessage from '../common/ReceptionistMessage'

export default function NotesStep({ initialValue, onSubmit }) {
  const [notes, setNotes] = useState(initialValue || '')

  return (
    <Box>
      <ReceptionistMessage title={MESSAGES.notesPrompt} />
      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="Ex.: tenho preferência por um corte mais curto nas laterais..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.75 }}>
                <EditNoteRoundedIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />
      <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text" color="inherit" onClick={() => onSubmit('')}>
          Pular esta etapa
        </Button>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<SendRoundedIcon />}
          onClick={() => onSubmit(notes)}
        >
          Continuar
        </Button>
      </Stack>
    </Box>
  )
}
