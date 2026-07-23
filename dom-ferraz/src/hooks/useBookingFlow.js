import { useCallback, useMemo, useState } from 'react'
import { STEPS, PROGRESS_STEPS } from '../constants/steps'

const initialBookingData = {
  unit: null,
  professional: null,
  service: null,
  date: null,
  time: null,
  notes: '',
  clientType: null, // 'existing' | 'new'
  client: null, // { name, phone, email, birthDate }
}

export function useBookingFlow() {
  const [step, setStep] = useState(STEPS.UNIT)
  const [history, setHistory] = useState([])
  const [bookingData, setBookingData] = useState(initialBookingData)

  const goTo = useCallback(
    (nextStep) => {
      setHistory((prev) => [...prev, step])
      setStep(nextStep)
    },
    [step]
  )

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev
      const copy = [...prev]
      const previousStep = copy.pop()
      setStep(previousStep)
      return copy
    })
  }, [])

  const updateBooking = useCallback((patch) => {
    setBookingData((prev) => ({ ...prev, ...patch }))
  }, [])

  const selectUnit = useCallback(
    (unit) => {
      updateBooking({ unit, professional: null, service: null, date: null, time: null })
      goTo(STEPS.PROFESSIONAL)
    },
    [goTo, updateBooking]
  )

  const selectProfessional = useCallback(
    (professional) => {
      updateBooking({ professional })
      goTo(STEPS.SERVICE)
    },
    [goTo, updateBooking]
  )

  const selectService = useCallback(
    (service) => {
      updateBooking({ service })
      goTo(STEPS.DATE)
    },
    [goTo, updateBooking]
  )

  const selectDate = useCallback(
    (date) => {
      updateBooking({ date, time: null })
      goTo(STEPS.TIME)
    },
    [goTo, updateBooking]
  )

  const selectTime = useCallback(
    (time) => {
      updateBooking({ time })
      goTo(STEPS.NOTES)
    },
    [goTo, updateBooking]
  )

  const submitNotes = useCallback(
    (notes) => {
      updateBooking({ notes: notes || '' })
      goTo(STEPS.IDENTIFY)
    },
    [goTo, updateBooking]
  )

  const chooseExistingClient = useCallback(() => {
    updateBooking({ clientType: 'existing' })
    goTo(STEPS.EXISTING_CLIENT)
  }, [goTo, updateBooking])

  const chooseNewClient = useCallback(() => {
    updateBooking({ clientType: 'new' })
    goTo(STEPS.NEW_CLIENT)
  }, [goTo, updateBooking])

  const confirmExistingClient = useCallback(
    (client) => {
      updateBooking({ client })
      goTo(STEPS.SUMMARY)
    },
    [goTo, updateBooking]
  )

  const registerNewClient = useCallback(
    (client) => {
      updateBooking({ client })
      goTo(STEPS.SUMMARY)
    },
    [goTo, updateBooking]
  )

  const restart = useCallback(() => {
    setBookingData(initialBookingData)
    setHistory([])
    setStep(STEPS.UNIT)
  }, [])

  const progress = useMemo(() => {
    const normalizedStep =
      step === STEPS.EXISTING_CLIENT || step === STEPS.NEW_CLIENT
        ? STEPS.IDENTIFY
        : step
    const index = PROGRESS_STEPS.indexOf(normalizedStep)
    if (index === -1) return 0
    return Math.round(((index + 1) / PROGRESS_STEPS.length) * 100)
  }, [step])

  return {
    step,
    bookingData,
    progress,
    canGoBack: history.length > 0,
    goBack,
    goTo,
    selectUnit,
    selectProfessional,
    selectService,
    selectDate,
    selectTime,
    submitNotes,
    chooseExistingClient,
    chooseNewClient,
    confirmExistingClient,
    registerNewClient,
    restart,
  }
}
