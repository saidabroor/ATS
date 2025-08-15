import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface PredictionResult {
  passed: boolean;
  formData: any;
}

const ResultsPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("predictionResult");
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult({
        passed: parsedResult.prediction === "PASS",
        formData: parsedResult.formData,
      });
    } else {
      navigate("/prediction");
    }
  }, [navigate]);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("resultsTitle")}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            {result.passed ? (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            )}

            <h2
              className={`text-3xl font-bold mb-4 ${
                result.passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.passed ? t("passed") : t("failed")}
            </h2>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {result.passed ? t("passMessage") : t("failMessage")}
            </p>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Profile Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Age</div>
                <div className="font-semibold">{result.formData.age} years</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Education</div>
                <div className="font-semibold capitalize">
                  {result.formData.education}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Experience</div>
                <div className="font-semibold">
                  {result.formData.experience} years
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">TOPIK Level</div>
                <div className="font-semibold">
                  {result.formData.topik_level}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Highest Degree</div>
                <div className="font-semibold capitalize">
                  {result.formData.highest_degree}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Experience Years</div>
                <div className="font-semibold">
                  {result.formData.experience_years} years
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">English Level</div>
                <div className="font-semibold capitalize">
                  {result.formData.english_level}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Job Field</div>
                <div className="font-semibold capitalize">
                  {result.formData.job_field}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">GPA</div>
                <div className="font-semibold">{result.formData.gpa}/4.0</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Projects</div>
                <div className="font-semibold">
                  {result.formData.num_projects} projects
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Portfolio</div>
                <div className="font-semibold capitalize">
                  {result.formData.has_portfolio}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/prediction"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="mr-2" size={20} />
            {t("tryAgain")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
