import os
import sys
import pandas as pd
from src.exception import CustomException
from src.utils import load_object


class PredictPipeline:
    def __init__(self):
        pass

    def predict(self, features):
        try:
            model_path = os.path.join("artifacts", "model.pkl")
            preprocessor_path = os.path.join("artifacts", "preprocessor.pkl")
            print("Before Loading")
            model = load_object(file_path=model_path)
            preprocessor = load_object(file_path=preprocessor_path)
            print("After Loading")
            data_scaled = preprocessor.transform(features)
            preds = model.predict(data_scaled)
            return preds

        except Exception as e:
            raise CustomException(e, sys)


class CustomData:
    def __init__(
        self,
        age: float,
        gender: str,
        topik_level: float,
        highest_degree: str,
        major_field: str,
        university_type: str,
        gpa: float,
        experience_years: float,
        num_projects: float,
        internships: float,
        certifications: float,
        has_portfolio: float,
        github_level: str,
        job_field: str,
        resume_length: float,
        cover_letter_score: float,
        tailored_resume: float,
        english_level: str,
        leadership_experience: float,
        military_status: str
    ):
        self.age = age
        self.gender = gender
        self.topik_level = topik_level
        self.highest_degree = highest_degree
        self.major_field = major_field
        self.university_type = university_type
        self.gpa = gpa
        self.experience_years = experience_years
        self.num_projects = num_projects
        self.internships = internships
        self.certifications = certifications
        self.has_portfolio = has_portfolio
        self.github_level = github_level
        self.job_field = job_field
        self.resume_length = resume_length
        self.cover_letter_score = cover_letter_score
        self.tailored_resume = tailored_resume
        self.english_level = english_level
        self.leadership_experience = leadership_experience
        self.military_status = military_status

    def get_data_as_data_frame(self):
        try:
            data_dict = {
                "age": [self.age],
                "gender": [self.gender],
                "topik_level": [self.topik_level],
                "highest_degree": [self.highest_degree],
                "major_field": [self.major_field],
                "university_type": [self.university_type],
                "gpa": [self.gpa],
                "experience_years": [self.experience_years],
                "num_projects": [self.num_projects],
                "internships": [self.internships],
                "certifications": [self.certifications],
                "has_portfolio": [self.has_portfolio],
                "github_level": [self.github_level],
                "job_field": [self.job_field],
                "resume_length": [self.resume_length],
                "cover_letter_score": [self.cover_letter_score],
                "tailored_resume": [self.tailored_resume],
                "english_level": [self.english_level],
                "leadership_experience": [self.leadership_experience],
                "military_status": [self.military_status]
            }

            return pd.DataFrame(data_dict)

        except Exception as e:
            raise CustomException(e, sys)
