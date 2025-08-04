"use client"

import { useState } from "react"
import axios from "axios"
import { Activity, Heart, User, Zap, TrendingUp, Clock, Scale, Droplets } from "lucide-react"
import ResultModal from "./ResultModal"

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  })
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setResult(null)

    try {
      const parsedData = {
        Pregnancies: Number.parseInt(formData.Pregnancies),
        Glucose: Number.parseFloat(formData.Glucose),
        BloodPressure: Number.parseFloat(formData.BloodPressure),
        SkinThickness: Number.parseFloat(formData.SkinThickness),
        Insulin: Number.parseFloat(formData.Insulin),
        BMI: Number.parseFloat(formData.BMI),
        DiabetesPedigreeFunction: Number.parseFloat(formData.DiabetesPedigreeFunction),
        Age: Number.parseInt(formData.Age),
      }

      const bmiAge = parsedData.BMI * parsedData.Age
      const glucoseInsulin = parsedData.Insulin > 0 ? parsedData.Glucose / parsedData.Insulin + 1 : 0
      const payload = { ...parsedData, BMI_Age: bmiAge, Glucose_Insulin: glucoseInsulin }

      const response = await axios.post("http://127.0.0.1:8000/predict", payload)
      setResult(response.data)
    } catch (err) {
      setError("Analysis failed. Please verify your inputs and try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const inputFields = [
    { name: "Pregnancies", icon: User, type: "number", label: "Pregnancies" },
    { name: "Glucose", icon: Droplets, type: "number", step: "0.1", label: "Glucose (mg/dL)" },
    { name: "BloodPressure", icon: Heart, type: "number", step: "0.1", label: "Blood Pressure" },
    { name: "SkinThickness", icon: Activity, type: "number", step: "0.1", label: "Skin Thickness" },
    { name: "Insulin", icon: Zap, type: "number", step: "0.1", label: "Insulin" },
    { name: "BMI", icon: Scale, type: "number", step: "0.1", label: "BMI" },
    { name: "DiabetesPedigreeFunction", icon: TrendingUp, type: "number", step: "0.001", label: "Pedigree Function" },
    { name: "Age", icon: Clock, type: "number", label: "Age (years)" },
  ]

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto flex flex-wrap justify-center items-center mt-40">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Diabetes Prediction</h1>
            <p className="text-gray-500">Enter your health information below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputFields.map((field) => {
                const IconComponent = field.icon
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type={field.type}
                        name={field.name}
                        step={field.step}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                      />
                      {/* <IconComponent className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" /> */}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Generate Prediction"}
            </button>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>

      <ResultModal result={result} onClose={() => setResult(null)} />
    </div>
  )
}

export default PredictionForm
