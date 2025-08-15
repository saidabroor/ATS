import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    landing: 'Home',
    prediction: 'Prediction',
    results: 'Results',
    
    // Landing Page
    landingTitle: 'Job Application Success Predictor',
    landingSubtitle: 'Predict your job application success in Korea using AI-powered analysis',
    landingDescription: 'Our advanced algorithm analyzes multiple factors including education, experience, language skills, and more to provide accurate predictions for your job application success rate in the Korean market.',
    getStarted: 'Get Started',
    howItWorks: 'How It Works',
    step1: 'Fill out the comprehensive form with your details',
    step2: 'Our AI analyzes your profile against job market data',
    step3: 'Receive instant predictions with detailed insights',
    
    // Prediction Form
    predictionTitle: 'Job Application Prediction Form',
    predictionSubtitle: 'Please fill out all fields accurately for the best prediction results',
    personalInfo: 'Personal Information',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    militaryStatus: 'Military Status',
    completed: 'Completed',
    exempt: 'Exempt',
    notApplicable: 'Not Applicable',
    
    education: 'Education Level',
    educationBackground: 'Education Background',
    highSchool: 'High School',
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    phd: 'PhD',
    highestDegree: 'Highest Degree',
    majorField: 'Major Field',
    computerScience: 'Computer Science',
    engineering: 'Engineering',
    businessAdmin: 'Business Administration',
    economics: 'Economics',
    languages: 'Languages',
    socialSciences: 'Social Sciences',
    naturalSciences: 'Natural Sciences',
    arts: 'Arts & Humanities',
    universityType: 'University Type',
    sky: 'SKY (Seoul/Korea/Yonsei)',
    top10: 'Top 10 Korean University',
    national: 'National University',
    private: 'Private University',
    international: 'International University',
    gpa: 'GPA (4.0 scale)',
    
    experience: 'Work Experience (years)',
    professionalExperience: 'Professional Experience',
    experienceYears: 'Years of Experience',
    numProjects: 'Number of Projects',
    internships: 'Internship Experience',
    noInternships: 'No Internships',
    oneInternship: '1 Internship',
    twoInternships: '2 Internships',
    threeOrMore: '3+ Internships',
    certifications: 'Professional Certifications',
    noCertifications: 'No Certifications',
    oneCertification: '1 Certification',
    twoCertifications: '2 Certifications',
    threePlus: '3+ Certifications',
    leadershipExperience: 'Leadership Experience',
    noLeadership: 'No Leadership Experience',
    someLeadership: 'Some Leadership Experience',
    significantLeadership: 'Significant Leadership Experience',
    
    topikLevel: 'TOPIK Level',
    noTopic: 'No TOPIK',
    
    skills: 'Skills & Qualifications',
    technicalSkills: 'Technical Skills & Portfolio',
    englishLevel: 'English Proficiency',
    hasPortfolio: 'Do you have a portfolio?',
    yes: 'Yes',
    no: 'No',
    githubLevel: 'GitHub Activity Level',
    noGithub: 'No GitHub',
    basicGithub: 'Basic (Few repositories)',
    activeGithub: 'Active (Regular commits)',
    veryActiveGithub: 'Very Active (Daily commits)',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
    
    jobPreferences: 'Job Preferences',
    applicationMaterials: 'Application Materials',
    targetJob: 'Target Job Type',
    jobField: 'Target Job Field',
    software: 'Software Development',
    dataScience: 'Data Science/AI',
    finance: 'Finance/Banking',
    consulting: 'Consulting',
    marketing: 'Marketing/Sales',
    hr: 'Human Resources',
    operations: 'Operations',
    research: 'Research & Development',
    resumeLength: 'Resume Length (pages)',
    coverLetterScore: 'Cover Letter Quality (1-10)',
    tailoredResume: 'Is your resume tailored for Korean job market?',
    
    targetLocation: 'Preferred Location',
    seoul: 'Seoul',
    busan: 'Busan',
    incheon: 'Incheon',
    daegu: 'Daegu',
    anywhere: 'Anywhere',
    
    predict: 'Predict Success',
    
    // Results Page
    resultsTitle: 'Prediction Results',
    passed: 'High Success Probability',
    failed: 'Low Success Probability',
    passMessage: 'Based on your profile, you have a high probability of success in job applications. Your qualifications align well with market demands.',
    failMessage: 'Your current profile may face challenges in the job market. Consider improving your qualifications or targeting different opportunities.',
    tryAgain: 'Try Another Prediction',
    
    // Footer
    company: 'NexusTech',
    developer: 'Developer',
    contact: 'Contact'
  },
  ko: {
    // Navigation
    landing: '홈',
    prediction: '예측',
    results: '결과',
    
    // Landing Page
    landingTitle: '취업 성공률 예측 시스템',
    landingSubtitle: 'AI 기반 분석으로 한국 취업 성공률을 예측해보세요',
    landingDescription: '고급 알고리즘이 학력, 경력, 언어 능력 등 다양한 요소를 분석하여 한국 취업 시장에서의 성공률을 정확하게 예측합니다.',
    getStarted: '시작하기',
    howItWorks: '사용 방법',
    step1: '상세한 개인 정보를 정확하게 입력하세요',
    step2: 'AI가 취업 시장 데이터와 비교 분석합니다',
    step3: '상세한 인사이트와 함께 즉시 예측 결과를 확인하세요',
    
    // Prediction Form
    predictionTitle: '취업 성공률 예측 폼',
    predictionSubtitle: '정확한 예측을 위해 모든 항목을 정확히 입력해주세요',
    personalInfo: '개인 정보',
    age: '나이',
    gender: '성별',
    male: '남성',
    female: '여성',
    militaryStatus: '병역 상태',
    completed: '군필',
    exempt: '면제',
    notApplicable: '해당없음',
    
    education: '학력',
    educationBackground: '학력 배경',
    highSchool: '고등학교',
    bachelor: '학사',
    master: '석사',
    phd: '박사',
    highestDegree: '최종 학위',
    majorField: '전공 분야',
    computerScience: '컴퓨터공학',
    engineering: '공학',
    businessAdmin: '경영학',
    economics: '경제학',
    languages: '어학',
    socialSciences: '사회과학',
    naturalSciences: '자연과학',
    arts: '인문학/예술',
    universityType: '대학 유형',
    sky: 'SKY (서울/고려/연세)',
    top10: '국내 상위 10개 대학',
    national: '국립대학교',
    private: '사립대학교',
    international: '해외대학교',
    gpa: '학점 (4.0 만점)',
    
    experience: '경력 (년)',
    professionalExperience: '전문 경력',
    experienceYears: '경력 년수',
    numProjects: '프로젝트 수',
    internships: '인턴십 경험',
    noInternships: '인턴십 없음',
    oneInternship: '인턴십 1회',
    twoInternships: '인턴십 2회',
    threeOrMore: '인턴십 3회 이상',
    certifications: '전문 자격증',
    noCertifications: '자격증 없음',
    oneCertification: '자격증 1개',
    twoCertifications: '자격증 2개',
    threePlus: '자격증 3개 이상',
    leadershipExperience: '리더십 경험',
    noLeadership: '리더십 경험 없음',
    someLeadership: '일부 리더십 경험',
    significantLeadership: '상당한 리더십 경험',
    
    topikLevel: 'TOPIK 등급',
    noTopic: 'TOPIK 없음',
    
    skills: '기술 및 자격',
    technicalSkills: '기술 능력 및 포트폴리오',
    englishLevel: '영어 실력',
    hasPortfolio: '포트폴리오가 있나요?',
    yes: '예',
    no: '아니오',
    githubLevel: 'GitHub 활동 수준',
    noGithub: 'GitHub 없음',
    basicGithub: '기본 (몇 개 저장소)',
    activeGithub: '활발함 (정기적 커밋)',
    veryActiveGithub: '매우 활발함 (매일 커밋)',
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
    expert: '전문가',
    
    jobPreferences: '희망 직종',
    applicationMaterials: '지원 서류',
    targetJob: '목표 직종',
    jobField: '목표 직무 분야',
    software: '소프트웨어 개발',
    dataScience: '데이터 사이언스/AI',
    finance: '금융/은행',
    consulting: '컨설팅',
    marketing: '마케팅/영업',
    hr: '인사',
    operations: '운영',
    research: '연구개발',
    resumeLength: '이력서 길이 (페이지)',
    coverLetterScore: '자기소개서 품질 (1-10점)',
    tailoredResume: '한국 취업 시장에 맞게 이력서를 작성했나요?',
    
    targetLocation: '희망 근무지',
    seoul: '서울',
    busan: '부산',
    incheon: '인천',
    daegu: '대구',
    anywhere: '상관없음',
    
    predict: '성공률 예측',
    
    // Results Page
    resultsTitle: '예측 결과',
    passed: '높은 성공 확률',
    failed: '낮은 성공 확률',
    passMessage: '귀하의 프로필을 바탕으로 취업에 성공할 확률이 높습니다. 귀하의 자격이 시장 수요와 잘 일치합니다.',
    failMessage: '현재 프로필로는 취업 시장에서 어려움을 겪을 수 있습니다. 자격 향상이나 다른 기회를 고려해보세요.',
    tryAgain: '다시 예측하기',
    
    // Footer
    company: 'NexusTech',
    developer: '개발자',
    contact: '연락처'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ko' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};