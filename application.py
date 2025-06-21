from flask import Flask, request, render_template
import pandas as pd
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

application = Flask(__name__)
app = application

@app.route('/')
def index():
    return render_template('index.html') 

@app.route('/predictdata', methods=['GET', 'POST'])
def predict_datapoint():
    if request.method == 'GET':
        return render_template('home.html')
    else:
        data = CustomData(
            age=float(request.form.get('age')),
            gender=request.form.get('gender'),
            topik_level=float(request.form.get('topik_level')),
            highest_degree=request.form.get('highest_degree'),
            major_field=request.form.get('major_field'),
            university_type=request.form.get('university_type'),
            gpa=float(request.form.get('gpa')),
            experience_years=float(request.form.get('experience_years')),
            num_projects=float(request.form.get('num_projects')),
            internships=float(request.form.get('internships')),
            certifications=float(request.form.get('certifications')),
            has_portfolio=float(request.form.get('has_portfolio')),
            github_level=request.form.get('github_level'),
            job_field=request.form.get('job_field'),
            resume_length=float(request.form.get('resume_length')),
            cover_letter_score=float(request.form.get('cover_letter_score')),
            tailored_resume=float(request.form.get('tailored_resume')),
            english_level=request.form.get('english_level'),
            leadership_experience=float(request.form.get('leadership_experience')),
            military_status=request.form.get('military_status')
        )

        pred_df = data.get_data_as_data_frame()
        print(pred_df)
        print("Before Prediction")

        predict_pipeline = PredictPipeline()
        print("Mid Prediction")
        results = predict_pipeline.predict(pred_df)
        print("After Prediction")

        language = request.form.get('lang', 'en')
        if results[0] == 1.0:
            result_text = "PASS" if language == 'en' else "합격"
        else:
            result_text = "FAIL" if language == 'en' else "불합격"

        return render_template("home.html", prediction=result_text)

if __name__ == "__main__":
    application.run(host="0.0.0.0")

