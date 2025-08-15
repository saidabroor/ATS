from flask import Flask, request, jsonify
from flask_cors import CORS
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

app = Flask(__name__)
CORS(app)  # Allow React frontend to access

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data_json = request.get_json()
        print("Received JSON:", data_json)  # Debug logging

        # Safely extract numeric fields; default to 0 if missing or invalid
        def to_float(key):
            try:
                return float(data_json.get(key, 0))
            except (TypeError, ValueError):
                return 0

        data = CustomData(
            age=to_float('age'),
            gender=data_json.get('gender', ''),
            topik_level=to_float('topik_level'),
            highest_degree=data_json.get('highest_degree', ''),
            major_field=data_json.get('major_field', ''),
            university_type=data_json.get('university_type', ''),
            gpa=to_float('gpa'),
            experience_years=to_float('experience_years'),
            num_projects=to_float('num_projects'),
            internships=to_float('internships'),
            certifications=to_float('certifications'),
            has_portfolio=to_float('has_portfolio'),
            github_level=data_json.get('github_level', ''),
            job_field=data_json.get('job_field', ''),
            resume_length=to_float('resume_length'),
            cover_letter_score=to_float('cover_letter_score'),
            tailored_resume=to_float('tailored_resume'),
            english_level=data_json.get('english_level', ''),
            leadership_experience=to_float('leadership_experience'),
            military_status=data_json.get('military_status', '')
        )

        pred_df = data.get_data_as_data_frame()
        predict_pipeline = PredictPipeline()
        results = predict_pipeline.predict(pred_df)

        result_text = "PASS" if results[0] == 1.0 else "FAIL"
        return jsonify({"prediction": result_text})

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
