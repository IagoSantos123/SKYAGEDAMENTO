import { Box } from '@mui/material'
import { DateCalendar, PickerDay } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { MESSAGES } from '../../constants/messages'
import { isDayUnavailable } from '../../mocks/unavailableDays'
import ReceptionistMessage from '../common/ReceptionistMessage'

const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function formatWeekdayLabel(date) {
  return WEEKDAY_LABELS[dayjs(date).day()]
}

function AvailabilityDay(props) {
  const { day, outsideCurrentMonth, ...other } = props
  const unavailable = isDayUnavailable(day)
  const isToday = day.isSame(dayjs(), 'day')

  return (
    <PickerDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      disabled={unavailable || outsideCurrentMonth}
      sx={{
        fontWeight: isToday ? 700 : 500,
        color: unavailable ? 'text.disabled' : 'text.primary',
        border: isToday ? '1.5px solid' : '1px solid transparent',
        borderColor: isToday ? 'secondary.main' : 'transparent',
        '&:hover': !unavailable
          ? { bgcolor: 'rgba(198,161,91,0.14)' }
          : undefined,
        '&.Mui-selected': {
          background: 'linear-gradient(150deg, #D9BC85 0%, #A3813F 100%)',
          color: '#161104',
          fontWeight: 700,
          '&:hover': {
            background: 'linear-gradient(150deg, #E4CC9C 0%, #A3813F 100%)',
          },
        },
      }}
    />
  )
}

export default function DateStep({ selected, onSelect }) {
  return (
    <Box>
      <ReceptionistMessage
        title={MESSAGES.datePraise}
        subtitle={MESSAGES.datePrompt}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.02)',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          py: 1,
        }}
      >
        <DateCalendar
          value={selected}
          onChange={(value) => onSelect(value)}
          disablePast
          shouldDisableDate={(date) => isDayUnavailable(date)}
          dayOfWeekFormatter={formatWeekdayLabel}
          slots={{ day: AvailabilityDay }}
          sx={{
            width: '100%',
            maxWidth: 380,
            '& .MuiDayCalendar-weekDayLabel': {
              color: 'text.disabled',
              fontWeight: 600,
              fontSize: '0.75rem',
            },
            '& .MuiPickersCalendarHeader-label': {
              fontWeight: 600,
            },
          }}
        />
      </Box>
    </Box>
  )
}
