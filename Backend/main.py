import joblib
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Initialize the Fast API application
app = FastAPI()

# Allow CORS for all origins
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained Machine Learning Model and the Scaler
try:
    model = joblib.load("diabetes_model.joblib")
    scaler = joblib.load("scaler.joblib")
except FileNotFoundError:
    raise RuntimeError("Model or scaler file not found. Please ensure they are available in the working directory.")

# Define the input data model using pydantic library
class patientData(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int
    BMI_Age: float
    Glucose_Insulin: float
# Prediction Endpoint
@app.post("/predict")
async def predict(data : patientData):
    """
    Recieves patient data and returns the diabetes prediction.
    """
    try:
        input_dict = data.model_dump()

        # CORRECTED: The feature names here now match the Pydantic model exactly
        feature_order = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'BMI_Age', 
            'Glucose_Insulin'
        ]
        
        input_data = np.array([[input_dict[feature] for feature in feature_order]])

        #scale the input data using Scaler
        scaled_data = scaler.transform(input_data)

        #make prediction using the model and get prediction probability
        prediction_value = model.predict(scaled_data)[0]
        prediction_probability = model.predict_proba(scaled_data)[0]

        #Determine the prediction label and confidence score
        if prediction_value == 1:
            prediction_label = "Diabetic"
            confidence_score = prediction_probability[1]
        else:
            prediction_label = "Non-Diabetic"
            confidence_score = prediction_probability[0]

        # return the prediction result and confidence score as json format
        return {
            "prediction": prediction_label,
            "confidence_score": f"{confidence_score * 100:.2f}%",
        }
    

    except Exception as e:
        return {
            "error": str(e)
        }

#health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify if the API is running.
    """
    return {"status": "healthy"}