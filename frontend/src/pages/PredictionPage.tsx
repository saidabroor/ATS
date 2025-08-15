import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Target,
} from "lucide-react";

type PredictionResponse = { prediction?: string; error?: string };

interface FormData {
  age: string;
  gender: string;
  topik_level: string;
  highest_degree: string;
  major_field: string;
  university_type: string;
  gpa: string;
  experience_years: string;
  num_projects: string;
  internships: string;
  certifications: string;
  has_portfolio: string;
  github_level: string;
  job_field: string;
  resume_length: string;
  cover_letter_score: string;
  tailored_resume: string;
  english_level: string;
  leadership_experience: string;
  military_status: string;
}

const numericRegex = /^[0-9]*\.?[0-9]*$/; // allow "", integers, decimals

const PredictionPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    topik_level: "",
    highest_degree: "",
    major_field: "",
    university_type: "",
    gpa: "",
    experience_years: "",
    num_projects: "",
    internships: "",
    certifications: "",
    has_portfolio: "",
    github_level: "",
    job_field: "",
    resume_length: "",
    cover_letter_score: "",
    tailored_resume: "",
    english_level: "",
    leadership_experience: "",
    military_status: "",
  });

  // Stable handlers (don’t change identity across renders)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleNumericChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (value === "" || numericRegex.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  // Simple submit-time validation (no HTML required => no auto-scroll)
  const validate = (data: FormData): string[] => {
    const keys: (keyof FormData)[] = [
      "age",
      "gender",
      "topik_level",
      "highest_degree",
      "major_field",
      "university_type",
      "gpa",
      "experience_years",
      "num_projects",
      "internships",
      "certifications",
      "has_portfolio",
      "github_level",
      "job_field",
      "resume_length",
      "cover_letter_score",
      "tailored_resume",
      "english_level",
      "leadership_experience",
      "military_status",
    ];
    return keys.filter((k) => data[k] === "" || data[k] == null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing = validate(formData);
    if (missing.length) {
      alert(
        `${t("predictionError")}\n\nMissing: ${missing.join(", ")}\n${
          t("pleaseFillAllFields") || ""
        }`
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        alert(`Prediction API error: ${response.status}\n${text}`);
        return;
      }

      const data: PredictionResponse = await response.json();
      if (!data || typeof data.prediction !== "string") {
        alert("Prediction API error: invalid response");
        return;
      }

      sessionStorage.setItem(
        "predictionResult",
        JSON.stringify({ prediction: data.prediction, formData })
      );

      navigate("/results");
    } catch (err) {
      alert(`Prediction API fetch error:\n${err}`);
    }
  };

  // Presentational section wrapper
  const FormSection: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-blue-50 p-2 rounded-lg mr-3">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  // Memoized fields: DOM nodes aren’t recreated => focus stays put
  const NumberField = React.memo<{
    label: string;
    name: keyof FormData;
    value: string;
    placeholder?: string;
    min?: string;
    max?: string;
    step?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>(({ label, name, value, placeholder, min, max, step, onChange }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
        autoComplete="off"
        data-min={min}
        data-max={max}
        data-step={step}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
      />
    </div>
  ));
  NumberField.displayName = "NumberField";

  const InputField = React.memo<{
    label: string;
    name: keyof FormData;
    type?: "text";
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>(({ label, name, type = "text", value, placeholder, onChange }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
      />
    </div>
  ));
  InputField.displayName = "InputField";

  const SelectField = React.memo<{
    label: string;
    name: keyof FormData;
    value: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }>(
    ({
      label,
      name,
      value,
      options,
      placeholder = "Select an option",
      onChange,
    }) => (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    )
  );
  SelectField.displayName = "SelectField";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("predictionTitle")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("predictionSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <FormSection
            icon={<User className="w-5 h-5 text-blue-600" />}
            title={t("personalInfo")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NumberField
                label={t("age")}
                name="age"
                value={formData.age}
                placeholder="24"
                min="18"
                max="65"
                step="1"
                onChange={handleNumericChange}
              />
              <SelectField
                label={t("gender")}
                name="gender"
                value={formData.gender}
                options={[
                  { value: "male", label: t("male") },
                  { value: "female", label: t("female") },
                ]}
                onChange={handleInputChange}
              />
              <SelectField
                label={t("militaryStatus")}
                name="military_status"
                value={formData.military_status}
                options={[
                  { value: "completed", label: t("completed") },
                  { value: "exempt", label: t("exempt") },
                  { value: "notApplicable", label: t("notApplicable") },
                ]}
                onChange={handleInputChange}
              />
            </div>
          </FormSection>

          {/* Education Background */}
          <FormSection
            icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
            title={t("educationBackground")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectField
                label={t("highestDegree")}
                name="highest_degree"
                value={formData.highest_degree}
                options={[
                  { value: "highSchool", label: t("highSchool") },
                  { value: "bachelor", label: t("bachelor") },
                  { value: "master", label: t("master") },
                  { value: "phd", label: t("phd") },
                ]}
                onChange={handleInputChange}
              />
              <SelectField
                label={t("majorField")}
                name="major_field"
                value={formData.major_field}
                options={[
                  { value: "computerScience", label: t("computerScience") },
                  { value: "engineering", label: t("engineering") },
                  { value: "businessAdmin", label: t("businessAdmin") },
                  { value: "economics", label: t("economics") },
                  { value: "languages", label: t("languages") },
                  { value: "socialSciences", label: t("socialSciences") },
                  { value: "naturalSciences", label: t("naturalSciences") },
                  { value: "arts", label: t("arts") },
                ]}
                onChange={handleInputChange}
              />
              <SelectField
                label={t("universityType")}
                name="university_type"
                value={formData.university_type}
                options={[
                  { value: "sky", label: t("sky") },
                  { value: "top10", label: t("top10") },
                  { value: "national", label: t("national") },
                  { value: "private", label: t("private") },
                  { value: "international", label: t("international") },
                ]}
                onChange={handleInputChange}
              />
              <NumberField
                label={t("gpa")}
                name="gpa"
                value={formData.gpa}
                placeholder="3.50"
                min="0"
                max="4.0"
                step="0.01"
                onChange={handleNumericChange}
              />
            </div>
          </FormSection>

          {/* Professional Experience */}
          <FormSection
            icon={<Briefcase className="w-5 h-5 text-blue-600" />}
            title={t("professionalExperience")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NumberField
                label={t("experienceYears")}
                name="experience_years"
                value={formData.experience_years}
                placeholder="2"
                min="0"
                max="30"
                step="1"
                onChange={handleNumericChange}
              />
              <NumberField
                label={t("numProjects")}
                name="num_projects"
                value={formData.num_projects}
                placeholder="5"
                min="0"
                max="50"
                step="1"
                onChange={handleNumericChange}
              />
              <SelectField
                label={t("internships")}
                name="internships"
                value={formData.internships}
                options={[
                  { value: "noInternships", label: t("noInternships") },
                  { value: "oneInternship", label: t("oneInternship") },
                  { value: "twoInternships", label: t("twoInternships") },
                  { value: "threeOrMore", label: t("threeOrMore") },
                ]}
                onChange={handleInputChange}
              />
              <SelectField
                label={t("leadershipExperience")}
                name="leadership_experience"
                value={formData.leadership_experience}
                options={[
                  { value: "noLeadership", label: t("noLeadership") },
                  { value: "someLeadership", label: t("someLeadership") },
                  {
                    value: "significantLeadership",
                    label: t("significantLeadership"),
                  },
                ]}
                onChange={handleInputChange}
              />
            </div>
          </FormSection>

          {/* Skills & Qualifications */}
          <FormSection
            icon={<Award className="w-5 h-5 text-blue-600" />}
            title={t("skills")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectField
                label={t("topikLevel")}
                name="topik_level"
                value={formData.topik_level}
                options={[
                  { value: "none", label: t("noTopic") },
                  { value: "1", label: "TOPIK 1" },
                  { value: "2", label: "TOPIK 2" },
                  { value: "3", label: "TOPIK 3" },
                  { value: "4", label: "TOPIK 4" },
                  { value: "5", label: "TOPIK 5" },
                  { value: "6", label: "TOPIK 6" },
                ]}
                onChange={handleInputChange}
              />
              <SelectField
                label={t("englishLevel")}
                name="english_level"
                value={formData.english_level}
                options={[
                  { value: "beginner", label: t("beginner") },
                  { value: "intermediate", label: t("intermediate") },
                  { value: "advanced", label: t("advanced") },
                  { value: "expert", label: t("expert") },
                ]}
                onChange={handleInputChange}
              />
              <SelectField
                label={t("certifications")}
                name="certifications"
                value={formData.certifications}
                options={[
                  { value: "noCertifications", label: t("noCertifications") },
                  { value: "oneCertification", label: t("oneCertification") },
                  { value: "twoCertifications", label: t("twoCertifications") },
                  { value: "threePlus", label: t("threePlus") },
                ]}
                onChange={handleInputChange}
              />
            </div>
          </FormSection>

          {/* Technical Skills & Portfolio */}
          <FormSection
            icon={<Target className="w-5 h-5 text-blue-600" />}
            title={t("technicalSkills")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectField
                label={t("hasPortfolio")}
                name="has_portfolio"
                value={formData.has_portfolio}
                options={[
                  { value: "yes", label: t("yes") },
                  { value: "no", label: t("no") },
                ]}
                onChange={handleInputChange}
              />
              <SelectField
                label={t("githubLevel")}
                name="github_level"
                value={formData.github_level}
                options={[
                  { value: "noGithub", label: t("noGithub") },
                  { value: "basicGithub", label: t("basicGithub") },
                  { value: "activeGithub", label: t("activeGithub") },
                  { value: "veryActiveGithub", label: t("veryActiveGithub") },
                ]}
                onChange={handleInputChange}
              />
              <div className="hidden md:block" />
            </div>
          </FormSection>

          {/* Job Preferences & Application Materials */}
          <FormSection
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            title={t("applicationMaterials")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectField
                label={t("jobField")}
                name="job_field"
                value={formData.job_field}
                options={[
                  { value: "software", label: t("software") },
                  { value: "dataScience", label: t("dataScience") },
                  { value: "finance", label: t("finance") },
                  { value: "consulting", label: t("consulting") },
                  { value: "marketing", label: t("marketing") },
                  { value: "hr", label: t("hr") },
                  { value: "operations", label: t("operations") },
                  { value: "research", label: t("research") },
                ]}
                onChange={handleInputChange}
              />
              <NumberField
                label={t("resumeLength")}
                name="resume_length"
                value={formData.resume_length}
                placeholder="2"
                min="1"
                max="10"
                step="1"
                onChange={handleNumericChange}
              />
              <NumberField
                label={t("coverLetterScore")}
                name="cover_letter_score"
                value={formData.cover_letter_score}
                placeholder="8"
                min="1"
                max="10"
                step="1"
                onChange={handleNumericChange}
              />
              <SelectField
                label={t("tailoredResume")}
                name="tailored_resume"
                value={formData.tailored_resume}
                options={[
                  { value: "yes", label: t("yes") },
                  { value: "no", label: t("no") },
                ]}
                onChange={handleInputChange}
              />
            </div>
          </FormSection>

          <div className="text-center pt-8">
            <button
              type="submit"
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <Target className="mr-3" size={24} />
              {t("predict")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionPage;
