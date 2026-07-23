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
import UnitStep from './components/steps/UnitStep'
import ProfessionalStep from './components/steps/ProfessionalStep'
import ServiceStep from './components/steps/ServiceStep'
import DateStep from './components/steps/DateStep'
import TimeStep from './components/steps/TimeStep'
import NotesStep from './components/steps/NotesStep'
import IdentifyStep from './components/steps/IdentifyStep'
import ExistingClientStep from './components/steps/ExistingClientStep'
import NewClientStep from './components/steps/NewClientStep'
import SummaryStep from './components/steps/SummaryStep'
import MarketingSections from './components/marketing/MarketingSections'
import BrandNav from './components/layout/BrandNav'
import experienciaImage from './assets/experiencia-dom-ferraz.jpeg'

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
      case STEPS.UNIT:
        return (
          <UnitStep
            selected={flow.bookingData.unit}
            onSelect={flow.selectUnit}
          />
        )

      case STEPS.PROFESSIONAL:
        return (
          <ProfessionalStep
            selected={flow.bookingData.professional}
            unit={flow.bookingData.unit}
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

  const showProgress = flow.step !== STEPS.UNIT

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 3, sm: 6, md: 8 },
        px: { xs: 1.5, sm: 3 },
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(180deg, rgba(15,9,7,.82) 0%, #140D0A 42%), url(${experienciaImage})`,
        backgroundSize: '100% 780px',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'fixed',
          width: { xs: 280, md: 520 },
          height: { xs: 280, md: 520 },
          borderRadius: '50%',
          top: { xs: -150, md: -260 },
          right: { xs: -140, md: -180 },
          background: 'rgba(199,148,93,.12)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'fixed',
          width: { xs: 240, md: 440 },
          height: { xs: 240, md: 440 },
          borderRadius: '50%',
          bottom: { xs: -140, md: -250 },
          left: { xs: -130, md: -170 },
          background: 'rgba(92,47,31,.2)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BrandNav />
          <BookingHeader />
          <Box id="agendamento" sx={{ width: '100%', display: 'flex', justifyContent: 'center', scrollMarginTop: 24 }}>
            <BookingCard
              progress={flow.progress}
              showProgress={showProgress}
              canGoBack={flow.canGoBack}
              onBack={flow.goBack}
            >
              <StepTransition stepKey={flow.step}>{renderStep()}</StepTransition>
            </BookingCard>
          </Box>
          <MarketingSections />
        </Box>
      </Container>

      <SuccessDialog open={successOpen} onNewBooking={handleNewBooking} />
    </Box>
  )
}
