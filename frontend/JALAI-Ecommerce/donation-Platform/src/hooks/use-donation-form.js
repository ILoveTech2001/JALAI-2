import { useState, useCallback } from "react"
import apiService from "../services/apiService"

export function useDonationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    // Donor Information
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    donorAddress: "",

    // Orphanage Information
    orphanageId: "",
    orphanageName: "",
    orphanageContact: "",
    location: "",

    // Donation Details
    donationType: "", // 'monetary' or 'items'
    monetaryAmount: "",
    itemCategory: "",
    itemDescription: "",
    itemQuantity: "",
    itemCondition: "",

    // Additional Information
    urgencyLevel: "",
    deliveryMethod: "",
    preferredDate: "",
    message: "",

    // Agreements
    agreeToTerms: false,
    allowContact: false,
    isAnonymous: false,
  })

  const updateFormData = useCallback(
    (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))

      // Clear error for this field when it's updated
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }))
      }
    },
    [errors],
  )

  // Validation function for each step
  const validateStep = useCallback((step, data) => {
    const stepErrors = {}

    switch (step) {
      case 1: // Donor Information
        if (!data.donorName.trim()) stepErrors.donorName = "Full name is required"
        if (!data.donorEmail.trim()) stepErrors.donorEmail = "Email is required"
        if (!data.donorPhone.trim()) stepErrors.donorPhone = "Phone number is required"
        break

      case 2: // Donation Details
        if (!data.donationType) stepErrors.donationType = "Please select a donation type"
        if (data.donationType === "monetary" && !data.monetaryAmount) {
          stepErrors.monetaryAmount = "Please enter a donation amount"
        }
        if (data.donationType === "items") {
          if (!data.itemCategory) stepErrors.itemCategory = "Please select an item category"
          if (!data.itemDescription.trim()) stepErrors.itemDescription = "Please describe the items"
        }
        break

      case 3: // Review & Submit
        if (!data.agreeToTerms) stepErrors.agreeToTerms = "You must agree to the terms and conditions"
        break
    }

    return stepErrors
  }, [])

  const nextStep = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    setErrors({})
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }, [currentStep, formData, validateStep])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setErrors({})
  }, [])

  const isStepValid = useCallback((step) => {
    const stepErrors = validateStep(step, formData)
    return Object.keys(stepErrors).length === 0
  }, [formData, validateStep])

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault()

      const stepErrors = validateStep(3, formData)
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors)
        return
      }

      setIsLoading(true)

      try {
        // Submit donation to API
        console.log("Submitting donation:", formData)
        const response = await apiService.submitDonation(formData)

        console.log("Donation submitted successfully:", response)

        // Set submission success
        setIsSubmitted(true)
      } catch (error) {
        console.error("Donation submission failed:", error)
        setErrors({ submit: "There was an error submitting your donation. Please try again." })
      } finally {
        setIsLoading(false)
      }
    },
    [formData, validateStep],
  )

  const resetForm = useCallback(() => {
    setFormData({
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      donorAddress: "",
      orphanageId: "",
      orphanageName: "",
      orphanageContact: "",
      location: "",
      donationType: "",
      monetaryAmount: "",
      itemCategory: "",
      itemDescription: "",
      itemQuantity: "",
      itemCondition: "",
      urgencyLevel: "",
      deliveryMethod: "",
      preferredDate: "",
      message: "",
      agreeToTerms: false,
      allowContact: false,
      isAnonymous: false,
    })
    setCurrentStep(1)
    setErrors({})
    setIsSubmitted(false)
  }, [])



  return {
    isLoading,
    isSubmitted,
    currentStep,
    formData,
    errors,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    resetForm,
    isStepValid,
  }
}
