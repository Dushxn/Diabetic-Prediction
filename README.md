# Diabetic Prediction Web Application

This project is a full-stack web application designed to predict the likelihood of a patient having diabetes based on several diagnostic health metrics. It utilizes a machine learning model trained on the PIMA Indians Diabetes Database, served via a FastAPI backend, and consumed by a React frontend.

## Features
- **User-Friendly Interface:** A clean and simple web form for users to input patient data.
- **Real-Time Prediction:** Leverages a trained Random Forest Classifier to provide instant predictions.
- **Clear Results:** Displays the prediction ("Diabetic" or "Not Diabetic") along with a confidence score in a custom modal.
- **Modern Tech Stack:** Built with FastAPI for a high-performance backend and React with Tailwind CSS for a responsive frontend.

---

## Machine Learning Model Details

The core of this application is a `RandomForestClassifier` model, which was selected after comparing its performance against other models like XGBoost and Logistic Regression.

### Dataset
The model was trained on the **PIMA Indians Diabetes Database**.

### Preprocessing and Training Workflow
1.  **Handling Missing Values:** `0` values in key diagnostic columns (`Glucose`, `BloodPressure`, `SkinThickness`, `Insulin`, `BMI`) were treated as missing data and imputed using the median of each respective column.
2.  **Feature Engineering:** Two new features were created to capture potential interaction effects:
    - `BMI_Age`: `BMI` * `Age`
    - `Glucose_Insulin`: `Glucose` / `Insulin` + 1
3.  **Data Scaling:** All features were scaled using `StandardScaler` to normalize their distribution.
4.  **Handling Class Imbalance:** The `SMOTE` (Synthetic Minority Over-sampling Technique) was applied to the training data to address the imbalance between diabetic and non-diabetic cases.
5.  **Hyperparameter Tuning:** `GridSearchCV` was used to find the optimal hyperparameters for the Random Forest model, optimizing for the `f1-score`.

### Model Performance
The final selected model achieved the following performance on the test set:

| Class          | Precision | Recall | F1-Score | Support |
| -------------- | :-------: | :----: | :------: | :-----: |
| **0 (Non-Diabetic)** |   0.90    |  0.74  |   0.82   |   101   |
| **1 (Diabetic)** |   0.63    |  0.85  |   0.73   |   53    |
|                |           |        |          |         |
| **Accuracy** |           |        | **0.78** | **154** |
| **Macro Avg** |   0.77    |  0.80  |   0.77   |   154   |
| **Weighted Avg** |   0.81    |  0.78  |   0.78   |   154   |

The model shows a strong **recall of 0.85** for the "Diabetic" class, making it effective at its primary goal of identifying potential diabetic cases.

---

## Tech Stack

- **Backend:** FastAPI, Uvicorn
- **Frontend:** React, Axios, Tailwind CSS
- **Machine Learning:** Scikit-learn, Pandas, NumPy, imblearn, Joblib

---

## Setup and Installation

To run this project locally, follow these steps:

### Backend (FastAPI)

1.  **Navigate to the backend directory:**
    ```bash
    cd Backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # Create
    python -m venv venv
    # Activate (Windows)
    .\venv\Scripts\activate
    # Activate (macOS/Linux)
    source venv/bin/activate
    ```

3.  **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be available at `http://127.0.0.1:8000`.

### Frontend (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the React development server:**
    ```bash
    npm start
    ```
    The frontend will be available at `http://localhost:3000`.

---

## API Endpoint

### Predict Diabetes

- **URL:** `/predict`
- **Method:** `POST`
- **Description:** Receives patient data and returns a prediction.

**Request Body (JSON):**
```json
{
  "Pregnancies": 6,
  "Glucose": 148.0,
  "BloodPressure": 72.0,
  "SkinThickness": 35.0,
  "Insulin": 125.0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50,
  "BMI_Age": 1680.0,
  "Glucose_Insulin": 2.184
}

Success Response (JSON):

{
  "prediction": "Diabetic",
  "confidence_score": "88.45%"
}
