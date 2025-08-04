"use client"
import { X, CheckCircle, AlertTriangle } from "lucide-react"

const ResultModal = ({ result, onClose }) => {
  if (!result) {
    return null
  }

  const isDiabetic = result.prediction === "Diabetic"
  const confidenceScore = Number.parseFloat(result.confidence_score)
  const confidencePercentage = Math.round(confidenceScore)

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-lg w-full h-[600px] p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Prediction Result</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="mb-4">
            {isDiabetic ? (
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            ) : (
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            )}
          </div>

          <div className={`inline-block px-4 py-2 rounded-md font-semibold text-lg ${
            isDiabetic ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}>
            {result.prediction.toUpperCase()}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Confidence Score</span>
              <span className="font-bold text-gray-800">{confidencePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${isDiabetic ? "bg-red-500" : "bg-green-500"}`}
                style={{ width: `${confidencePercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Risk Level</span>
              <span className={`font-bold ${
                confidenceScore >= 0.8 ? "text-red-600" : 
                confidenceScore >= 0.6 ? "text-yellow-600" : "text-green-600"
              }`}>
                {confidenceScore >= 0.8 ? "HIGH" : confidenceScore >= 0.6 ? "MODERATE" : "LOW"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md mb-4 mt-16">
          <p className="text-sm text-black">
            <strong>Disclaimer:</strong> This prediction is for informational purposes only. 
            Please consult with a healthcare professional for proper medical advice.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black mt-8"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ResultModal
