import { Box, Grid, Stack, Typography } from '@mui/material'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { MESSAGES } from '../../constants/messages'
import ReceptionistMessage from '../common/ReceptionistMessage'
import SelectableCard from '../common/SelectableCard'

const OPTIONS = [
  { id: 'principal', name: 'Equipe geral', description: 'Escolha entre os profissionais da equipe da Sky Barbearia.', icon: GroupsRoundedIcon },
  { id: 'suzane', name: 'Suzane', description: 'Agende diretamente com a unidade e os serviços da Suzane.', icon: PersonRoundedIcon },
]

export default function UnitChoiceStep({ selected, onSelect }) {
  return (
    <Box>
      <ReceptionistMessage title={MESSAGES.unitPrompt} />
      <Grid container spacing={2.5}>
        {OPTIONS.map((option) => {
          const Icon = option.icon
          const isSelected = selected?.id === option.id
          return (
            <Grid size={{ xs: 12, sm: 6 }} key={option.id}>
              <SelectableCard selected={isSelected} onClick={() => onSelect(option)}>
                <Stack spacing={1.5}>
                  <Box sx={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px', bgcolor: 'rgba(198,161,91,0.1)', border: '1px solid rgba(198,161,91,0.25)' }}>
                    <Icon sx={{ fontSize: 28, color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="h6">{option.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 42 }}>{option.description}</Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', justifyContent: 'flex-end', color: isSelected ? 'secondary.main' : 'text.disabled' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{isSelected ? 'Selecionado' : 'Escolher'}</Typography>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
                  </Stack>
                </Stack>
              </SelectableCard>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
