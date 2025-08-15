JobPredict

How system works

Testing:
![alt text](<JobPredict .gif>)

A machine learning–powered web application that predicts PASS or FAIL for a candidate based on their profile data.
The core of this project is a custom-trained classification model that processes multiple candidate features and outputs a binary decision, deployed through a Python backend and connected to a React + TypeScript frontend.

Key Machine Learning Highlights

Custom Classification Model

Trained on domain-specific candidate datasets

Predicts binary outcome: "PASS" or "FAIL"

Designed for high interpretability and low latency predictions

Feature Engineering

Encoded categorical variables (e.g., education level, job field)

Scaled numerical features (e.g., GPA, work experience years)

Included language proficiency and project count as weighted features

Model Evaluation

Evaluated using accuracy, precision, recall, and F1-score

Tuned hyperparameters for optimal decision boundary

Validated on unseen test set to ensure generalization

Deployment Pipeline

Saved model as .pkl and loaded in backend API

API endpoint accepts JSON and returns prediction instantly

Fully integrated with frontend form submission

How the ML Flow Works

Data Input – User fills in candidate details in the frontend form.

Preprocessing – Backend applies same preprocessing steps as during training (encoding, scaling).

Model Inference – Trained classifier predicts "PASS" or "FAIL".

Response – Backend sends result to frontend as JSON.

Display – Results page highlights PASS/FAIL and shows submitted profile data.

Tech Stack

Machine Learning & Backend

Python (FastAPI or Flask)

scikit-learn / XGBoost / Pandas / NumPy

Pickled model for production deployment

Uvicorn server for fast async API responses

Frontend

React + TypeScript (Vite)

Tailwind CSS for styling

Context API for multi-language text handling
