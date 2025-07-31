import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Heart,
  DollarSign,
  Package,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Home,
  Truck,
  Clock,
  AlertCircle,
} from "lucide-react"

import { EnhancedLogo } from "./enhanced-logo"
import { FormField } from "./form-field"
import { SelectField } from "./select-field"
import { BackgroundElements } from "./background-elements"
import { DonationSummary } from "./donation-summary"
import { SuccessMessage } from "./success-message"
import { OrphanageInfoCard } from "./orphanage-info-card"
import { useDonationForm } from "@/hooks/use-donation-form"
import { useAuth } from "../contexts/AuthContext"
import apiService from "../services/apiService"

export default function DonationForm() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [orphanage, setOrphanage] = useState(null)
  const [loadingOrphanage, setLoadingOrphanage] = useState(false)

  const {
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
  } = useDonationForm()

  const stepTitles = ["Your Information", "Donation Details", "Review & Submit"]

  // Auto-fill user information and get orphanage from URL
  useEffect(() => {
    // Auto-fill user information if logged in
    if (user && user.firstName && user.email) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim()
      if (fullName && !formData.donorName) {
        updateFormData('donorName', fullName)
      }
      if (user.email && !formData.donorEmail) {
        updateFormData('donorEmail', user.email)
      }
      if (user.phoneNumber && !formData.donorPhone) {
        updateFormData('donorPhone', user.phoneNumber)
      }
    }

    // Get orphanage from URL parameters
    const orphanageId = searchParams.get('orphanage')
    if (orphanageId && !orphanage) {
      fetchOrphanageDetails(orphanageId)
    }
  }, [user, searchParams, updateFormData, formData.donorName, formData.donorEmail, formData.donorPhone, orphanage])

  const fetchOrphanageDetails = async (orphanageId) => {
    try {
      setLoadingOrphanage(true)
      const response = await apiService.getOrphanage(orphanageId)
      const orphanageData = response?.data || response

      if (orphanageData) {
        setOrphanage(orphanageData)
        updateFormData('orphanageId', orphanageData.id)
        updateFormData('orphanageName', orphanageData.name)
        updateFormData('location', orphanageData.location)
      }
    } catch (error) {
      console.error('Error fetching orphanage details:', error)
    } finally {
      setLoadingOrphanage(false)
    }
  }

  // If form is successfully submitted, show success message
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 via-teal-50 to-white relative overflow-hidden">
        <BackgroundElements />
        <SuccessMessage formData={formData} onReset={resetForm} />
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DonorInformationStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 2:
        return <DonationDetailsStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 3:
        return (
          <ReviewStep
            formData={formData}
            updateFormData={updateFormData}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            errors={errors}
            orphanage={orphanage}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 via-teal-50 to-white relative overflow-hidden">
      <BackgroundElements />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-2xl border border-white/50 bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-green-50/30 to-emerald-50/30 rounded-3xl"></div>

            <CardHeader className="space-y-6 text-center pb-8 relative z-10">
              <EnhancedLogo />

              <div className="space-y-3">
                <CardTitle className="text-2xl font-light text-green-800">Make a Donation</CardTitle>
                <CardDescription className="text-green-600 text-sm leading-relaxed">
                  Help us support orphanages and make a difference in children's lives
                </CardDescription>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-green-600">
                  {stepTitles.map((title, index) => (
                    <span
                      key={index}
                      className={`${
                        index + 1 <= currentStep ? "text-green-700 font-medium" : "text-green-400"
                      }`}
                    >
                      {title}
                    </span>
                  ))}
                </div>
                <Progress value={(currentStep / stepTitles.length) * 100} className="h-2" />
              </div>
            </CardHeader>

            <CardContent className="space-y-8 px-8 pb-8 relative z-10">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                {currentStep < stepTitles.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !isStepValid(currentStep)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4" />
                        <span>Submit Donation</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orphanage Info & Donation Summary Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Orphanage Information Card */}
          {loadingOrphanage ? (
            <Card className="shadow-xl border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ) : orphanage ? (
            <Card className="shadow-xl border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={orphanage.images?.[0] || orphanage.imageUrl || '/assets/orphanage-default.jpg'}
                  alt={orphanage.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white">
                  <h3 className="font-semibold text-sm">{orphanage.name}</h3>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{orphanage.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{orphanage.currentChildren} children</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{orphanage.description}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl">
              <CardContent className="p-6 text-center">
                <Building className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No orphanage selected</p>
              </CardContent>
            </Card>
          )}

          {/* Donation Summary */}
          <DonationSummary formData={formData} />
        </div>
      </div>
    </div>
  )
}

// Step Components
function DonorInformationStep({ formData, updateFormData, errors }) {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-800 mb-4">Tell us about yourself</h3>

      {user && (
        <div className="bg-blue-50/50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-blue-700 leading-relaxed">
            <strong>✨ Welcome back, {user.firstName}!</strong> We've pre-filled your information to make donating easier. You can edit any details below.
          </p>
        </div>
      )}

      <FormField
        id="donorName"
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        icon={User}
        required
        value={formData.donorName}
        onChange={(e) => updateFormData("donorName", e.target.value)}
        error={errors.donorName}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="donorEmail"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          icon={Mail}
          required
          value={formData.donorEmail}
          onChange={(e) => updateFormData("donorEmail", e.target.value)}
          error={errors.donorEmail}
        />

        <FormField
          id="donorPhone"
          label="Phone Number"
          type="tel"
          placeholder="+237 6XX XXX XXX"
          icon={Phone}
          required
          value={formData.donorPhone}
          onChange={(e) => updateFormData("donorPhone", e.target.value)}
          error={errors.donorPhone}
        />
      </div>

      <FormField
        id="donorAddress"
        label="Address"
        type="text"
        placeholder="Your full address"
        icon={Home}
        value={formData.donorAddress}
        onChange={(e) => updateFormData("donorAddress", e.target.value)}
      />

      <div className="flex items-center space-x-3 p-4 bg-green-50/50 rounded-2xl">
        <input
          type="checkbox"
          id="isAnonymous"
          checked={formData.isAnonymous}
          onChange={(e) => updateFormData("isAnonymous", e.target.checked)}
          className="w-4 h-4 text-green-500 border-green-300 rounded focus:ring-green-200 focus:ring-2"
        />
        <Label htmlFor="isAnonymous" className="text-sm text-green-700">
          Make this donation anonymous
        </Label>
      </div>
    </div>
  )
}



function DonationDetailsStep({ formData, updateFormData, errors }) {
  const itemCategories = [
    { value: "clothing", label: "Clothing & Shoes" },
    { value: "toys", label: "Toys & Games" },
    { value: "books", label: "Books & Educational Materials" },
    { value: "food", label: "Food & Nutrition" },
    { value: "medical", label: "Medical Supplies" },
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "other", label: "Other" },
  ]

  const itemConditions = [
    { value: "new", label: "New" },
    { value: "like-new", label: "Like New" },
    { value: "good", label: "Good Condition" },
    { value: "fair", label: "Fair Condition" },
  ]

  const urgencyLevels = [
    { value: "low", label: "Low - No rush" },
    { value: "medium", label: "Medium - Within a month" },
    { value: "high", label: "High - Within a week" },
    { value: "urgent", label: "Urgent - ASAP" },
  ]

  const deliveryMethods = [
    { value: "pickup", label: "I'll arrange pickup" },
    { value: "delivery", label: "I'll deliver personally" },
    { value: "shipping", label: "Ship via courier" },
    { value: "jalai-pickup", label: "JALAI pickup service" },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-800 mb-4">What would you like to donate?</h3>

      {/* Donation Type Selection */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-green-700 flex items-center gap-2">
          <Heart className="h-4 w-4 text-green-500" />
          Donation Type *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
              formData.donationType === "monetary"
                ? "border-green-400 bg-green-50/50"
                : "border-green-200/60 hover:border-green-300/60"
            }`}
            onClick={() => updateFormData("donationType", "monetary")}
          >
            <div className="flex items-center space-x-3">
              <DollarSign className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="font-medium text-green-800">Monetary Donation</h4>
                <p className="text-sm text-green-600">Donate money directly</p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
              formData.donationType === "items"
                ? "border-green-400 bg-green-50/50"
                : "border-green-200/60 hover:border-green-300/60"
            }`}
            onClick={() => updateFormData("donationType", "items")}
          >
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="font-medium text-green-800">Item Donation</h4>
                <p className="text-sm text-green-600">Donate physical items</p>
              </div>
            </div>
          </div>
        </div>
        {errors.donationType && <p className="text-xs text-red-500 mt-1">{errors.donationType}</p>}
      </div>

      {/* Monetary Donation Fields */}
      {formData.donationType === "monetary" && (
        <FormField
          id="monetaryAmount"
          label="Donation Amount (CFA Francs)"
          type="number"
          placeholder="0"
          icon={DollarSign}
          required
          value={formData.monetaryAmount}
          onChange={(e) => updateFormData("monetaryAmount", e.target.value)}
          error={errors.monetaryAmount}
        />
      )}

      {/* Item Donation Fields */}
      {formData.donationType === "items" && (
        <div className="space-y-4">
          <SelectField
            id="itemCategory"
            label="Item Category"
            placeholder="Select category"
            icon={Package}
            required
            options={itemCategories}
            value={formData.itemCategory}
            onValueChange={(value) => updateFormData("itemCategory", value)}
            error={errors.itemCategory}
          />

          <FormField
            id="itemDescription"
            label="Item Description"
            type="textarea"
            placeholder="Describe the items you want to donate..."
            icon={MessageSquare}
            required
            value={formData.itemDescription}
            onChange={(e) => updateFormData("itemDescription", e.target.value)}
            error={errors.itemDescription}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="itemQuantity"
              label="Quantity"
              type="text"
              placeholder="e.g., 5 shirts, 2 bags"
              icon={Package}
              value={formData.itemQuantity}
              onChange={(e) => updateFormData("itemQuantity", e.target.value)}
              error={errors.itemQuantity}
            />

            <SelectField
              id="itemCondition"
              label="Condition"
              placeholder="Select condition"
              icon={Package}
              options={itemConditions}
              value={formData.itemCondition}
              onValueChange={(value) => updateFormData("itemCondition", value)}
              error={errors.itemCondition}
            />
          </div>
        </div>
      )}

      {/* Common Fields for Both Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          id="urgencyLevel"
          label="Urgency Level"
          placeholder="How urgent is this?"
          icon={Clock}
          options={urgencyLevels}
          value={formData.urgencyLevel}
          onValueChange={(value) => updateFormData("urgencyLevel", value)}
          error={errors.urgencyLevel}
        />

        <SelectField
          id="deliveryMethod"
          label="Delivery Method"
          placeholder="How will you deliver?"
          icon={Truck}
          options={deliveryMethods}
          value={formData.deliveryMethod}
          onValueChange={(value) => updateFormData("deliveryMethod", value)}
          error={errors.deliveryMethod}
        />
      </div>

      {/* Optional Message */}
      <FormField
        id="message"
        label="Message (Optional)"
        type="textarea"
        placeholder="Any special message for the orphanage..."
        icon={MessageSquare}
        value={formData.message}
        onChange={(e) => updateFormData("message", e.target.value)}
        error={errors.message}
      />
    </div>
  )
}

function ReviewStep({ formData, updateFormData, handleSubmit, isLoading, errors, orphanage }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-800 mb-4">Review & Submit</h3>

      {/* Orphanage Information */}
      {orphanage && (
        <div className="bg-green-50/50 rounded-2xl p-4 space-y-3">
          <h4 className="font-medium text-green-800">Donating to:</h4>
          <div className="flex items-center gap-3">
            <img
              src={orphanage.images?.[0] || orphanage.imageUrl || '/assets/orphanage-default.jpg'}
              alt={orphanage.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-green-900">{orphanage.name}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {orphanage.location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Donor Information Summary */}
      <div className="bg-blue-50/50 rounded-2xl p-4 space-y-2">
        <h4 className="font-medium text-blue-800">Your Information:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Name:</strong> {formData.donorName}</p>
          <p><strong>Email:</strong> {formData.donorEmail}</p>
          <p><strong>Phone:</strong> {formData.donorPhone}</p>
          {formData.donorAddress && <p><strong>Address:</strong> {formData.donorAddress}</p>}
        </div>
      </div>

      {/* Donation Details Summary */}
      <div className="bg-purple-50/50 rounded-2xl p-4 space-y-2">
        <h4 className="font-medium text-purple-800">Donation Details:</h4>
        <div className="text-sm text-purple-700 space-y-1">
          <p><strong>Type:</strong> {formData.donationType === 'monetary' ? 'Monetary Donation' : 'Item Donation'}</p>
          {formData.donationType === 'monetary' && (
            <p><strong>Amount:</strong> {formData.monetaryAmount} CFA Francs</p>
          )}
          {formData.donationType === 'items' && (
            <>
              <p><strong>Category:</strong> {formData.itemCategory}</p>
              <p><strong>Description:</strong> {formData.itemDescription}</p>
              {formData.itemQuantity && <p><strong>Quantity:</strong> {formData.itemQuantity}</p>}
              {formData.itemCondition && <p><strong>Condition:</strong> {formData.itemCondition}</p>}
            </>
          )}
          {formData.urgencyLevel && <p><strong>Urgency:</strong> {formData.urgencyLevel}</p>}
          {formData.deliveryMethod && <p><strong>Delivery:</strong> {formData.deliveryMethod}</p>}
        </div>
      </div>

      {/* Message */}
      {formData.message && (
        <div className="bg-gray-50/50 rounded-2xl p-4">
          <h4 className="font-medium text-gray-800 mb-2">Your Message:</h4>
          <p className="text-sm text-gray-700">{formData.message}</p>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-green-700">
            I agree to the <span className="font-medium">Terms and Conditions</span> and confirm that all information provided is accurate.
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-xs text-red-500 ml-7">{errors.agreeToTerms}</p>}

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="allowContact"
            checked={formData.allowContact}
            onChange={(e) => updateFormData("allowContact", e.target.checked)}
            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
          />
          <label htmlFor="allowContact" className="text-sm text-green-700">
            Allow the orphanage to contact me for updates and thank you messages.
          </label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="isAnonymous"
            checked={formData.isAnonymous}
            onChange={(e) => updateFormData("isAnonymous", e.target.checked)}
            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
          />
          <label htmlFor="isAnonymous" className="text-sm text-green-700">
            Make this donation anonymous (your name will not be shared with the orphanage).
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !formData.agreeToTerms}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Heart className="h-5 w-5" />
              <span>Submit Donation</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
