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
import ServicesStrip from './components/marketing/ServicesStrip'
import BrandNav from './components/layout/BrandNav'

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
            date={flow.bookingData.date}
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
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BrandNav />
          <BookingHeader />
          <ServicesStrip />
          <Box
            component="section"
            id="agendamento"
            sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 6, md: 7 }, scrollMarginTop: 72 }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
              <Box component="span" sx={{ color: 'secondary.main', fontSize: '.72rem', fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase' }}>
                Escolha onde cuidar do seu estilo
              </Box>
              <Box component="h2" sx={{ m: 0, mt: 1, fontFamily: '"Playfair Display", serif', fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, color: 'text.primary' }}>
                — Escolha sua unidade —
              </Box>
            </Box>
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
