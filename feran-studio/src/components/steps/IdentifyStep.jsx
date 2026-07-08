import { Box, Grid, Stack, Typography } from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { MESSAGES } from '../../constants/messages'
import ReceptionistMessage from '../common/ReceptionistMessage'
import SelectableCard from '../common/SelectableCard'

function IdentifyIcon({ icon: Icon }) {
  return (
    <Box
      sx={{
        width: 52,
        height: 52,
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(198,161,91,0.1)',
        border: '1px solid rgba(198,161,91,0.25)',
      }}
    >
      <Icon sx={{ fontSize: 24, color: 'secondary.main' }} />
    </Box>
  )
}

export default function IdentifyStep({ onExisting, onNew }) {
  return (
    <Box>
      <ReceptionistMessage title={MESSAGES.identifyPrompt} />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectableCard onClick={onExisting}>
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', py: 1.5 }}>
              <IdentifyIcon icon={PersonRoundedIcon} />
              <Typography variant="h6">Já sou cliente</Typography>
              <Typography variant="body2" color="text.secondary">
                Vamos localizar seu cadastro pelo telefone.
              </Typography>
            </Stack>
          </SelectableCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectableCard onClick={onNew}>
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', py: 1.5 }}>
              <IdentifyIcon icon={EditRoundedIcon} />
              <Typography variant="h6">Ainda não tenho cadastro</Typography>
              <Typography variant="body2" color="text.secondary">
                Leva menos de 30 segundos para criar o seu.
              </Typography>
            </Stack>
          </SelectableCard>
        </Grid>
      </Grid>
    </Box>
  )
}
