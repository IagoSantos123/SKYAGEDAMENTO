import { useState } from 'react'
import dayjs from 'dayjs'
import { Box, Container } from '@mui/material'
import { STEPS } from './constants/steps'
import { useBookingFlow } from './hooks/useBookingFlow'
import { createBooking } from './services/bookingApi'
import BookingHeader from './components/layout/BookingHeader'
import BookingCard from './components/layout/BookingCard'
import StepTransition from './components/common/StepTransition'
import SuccessDialog from './components/common/SuccessDialog'
import WelcomeStep from './components/steps/WelcomeStep'
import ProfessionalStep from './components/steps/ProfessionalStep'
import ServiceStep from './components/steps/ServiceStep'
import DateStep from './components/steps/DateStep'
import TimeStep from './components/steps/TimeStep'
import NotesStep from './components/steps/NotesStep'
import IdentifyStep from './components/steps/IdentifyStep'
import ExistingClientStep from './components/steps/ExistingClientStep'
import NewClientStep from './components/steps/NewClientStep'
import SummaryStep from './components/steps/SummaryStep'

export default function App() {
  const flow = useBookingFlow()
  const [successOpen, setSuccessOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleConfirmBooking = async () => {
    const { professional, service, date, time, notes, client, clientType } = flow.bookingData

    setSubmitError(null)
    setSubmitting(true)
    try {
      await createBooking({
        colaboradorId: professional?.id,
        servicoId: service?.id,
        servicoNome: service?.name,
        data: dayjs(date).format('YYYY-MM-DD'),
        horario: time,
        clienteId: clientType === 'existing' ? client?.id : undefined,
        clienteNome: client?.name,
        clienteTelefone: client?.phone,
        clienteEmail: client?.email || undefined,
        clienteNascimento: client?.birthDate ? dayjs(client.birthDate).format('YYYY-MM-DD') : undefined,
        observacao: notes || undefined,
      })
      setSuccessOpen(true)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNewBooking = () => {
    setSuccessOpen(false)
    setSubmitError(null)
    flow.restart()
  }

  const renderStep = () => {
    switch (flow.step) {
      case STEPS.WELCOME:
        return <WelcomeStep onStart={flow.start} />

      case STEPS.PROFESSIONAL:
        return (
          <ProfessionalStep
            selected={flow.bookingData.professional}
            onSelect={flow.selectProfessional}
          />
        )

      case STEPS.SERVICE:
        return (
          <ServiceStep
            selected={flow.bookingData.service}
            onSelect={flow.selectService}
          />
        )

      case STEPS.DATE:
        return (
          <DateStep
            selected={flow.bookingData.date}
            onSelect={flow.selectDate}
          />
        )

      case STEPS.TIME:
        return (
          <TimeStep
            professionalId={flow.bookingData.professional?.id}
            serviceId={flow.bookingData.service?.id}
            date={flow.bookingData.date}
            selected={flow.bookingData.time}
            onSelect={flow.selectTime}
          />
        )

      case STEPS.NOTES:
        return (
          <NotesStep
            initialValue={flow.bookingData.notes}
            onSubmit={flow.submitNotes}
          />
        )

      case STEPS.IDENTIFY:
        return (
          <IdentifyStep
            onExisting={flow.chooseExistingClient}
            onNew={flow.chooseNewClient}
          />
        )

      case STEPS.EXISTING_CLIENT:
        return (
          <ExistingClientStep
            onConfirm={flow.confirmExistingClient}
            onNotFound={flow.chooseNewClient}
          />
        )

      case STEPS.NEW_CLIENT:
        return <NewClientStep onSubmit={flow.registerNewClient} />

      case STEPS.SUMMARY:
        return (
          <SummaryStep
            bookingData={flow.bookingData}
            onConfirm={handleConfirmBooking}
            submitting={submitting}
            error={submitError}
          />
        )

      default:
        return null
    }
  }

  const showProgress = flow.step !== STEPS.WELCOME

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, sm: 6 },
        px: 2,
      }}
    >
      <Container maxWidth="sm" disableGutters sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BookingHeader />
          <BookingCard
            progress={flow.progress}
            showProgress={showProgress}
            canGoBack={flow.canGoBack}
            onBack={flow.goBack}
          >
            <StepTransition stepKey={flow.step}>{renderStep()}</StepTransition>
          </BookingCard>
        </Box>
      </Container>

      <SuccessDialog open={successOpen} onNewBooking={handleNewBooking} />
    </Box>
  )
}
