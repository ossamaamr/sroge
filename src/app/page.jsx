// src/app/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import FileList from '../components/FileList';

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // محاكاة جلب البيانات، استبدلها بـ Fetch الحقيقي من الـ API الخاص بك
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        
        // مثال لبيانات ممررة تحتوي على روابط غوغل درايف التقليدية
        const mockData = [
          {
            id: '1',
            name: 'ملخص اللغة العربية الشامل.pdf',
            description: 'يحتوي على كافة القواعد النحوية والبلاغية المقررة لهذا الفصل بشكل مبسط.',
            url: 'https://drive.google.com/file/d/1XyZ_SAMPLE_ID_1/view?usp=sharing'
          },
          {
            id: '2',
            name: 'مذكرة القوانين البرمجية 2026.docx',
            description: 'أهم الدوال وهياكل البيانات النظيفة مع أمثلة تطبيقية متكاملة.',
            url: 'https://drive.google.com/file/d/1AbC_SAMPLE_ID_2/view'
          }
        ];

        setFiles(mockData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
            منصة عرض وتحميل الملفات الذكية
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            تصفح ملفاتك وحملها مباشرة على جهازك بنقرة واحدة وبسرعة فائقة.
          </p>
        </div>

        {/* عرض القائمة المقسمة والمحمية ضد أخطاء الرندرة */}
        <div className="mt-10">
          <FileList files={files} isLoading={isLoading} error={error} />
        </div>
      </div>
    </main>
  );
}
