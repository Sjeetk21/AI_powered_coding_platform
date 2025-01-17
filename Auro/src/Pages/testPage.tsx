import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CodeEditor } from '../components/CodeEditor';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  testCases: string[];
  expectedOutputs: string[];
}

interface LocationState {
  topic?: string;
  difficulty?: string;
  questionCount?: number;
}

export const CodingTestPage: React.FC = () => {
  const location = useLocation<LocationState>();
  
  const { topic, difficulty, questionCount } = location.state || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [code, setCode] = useState<string>(`def main(input):\n  # Write your code here`);
  const [output, setOutput] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    const fetchQuestions = async (): Promise<void> => {
      const requestData = {
        category: topic,
        difficulty: difficulty,
        number: questionCount,
      };

      try {
        const response = await fetch('http://localhost:3000/generate-mock-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }).then((res) => res.json());

        const extractJsonList = (str: string): any[] => {
          const match = str.match(/\[.*\]/s);
          return match ? JSON.parse(match[0]) : [];
        };

        const result = extractJsonList(response);
        console.log(result);
        setQuestions(result);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [questionCount, difficulty, topic]);

  const currentQuestion: Question | undefined = questions[currentQuestionIndex];

  const analyzeCode = async (): Promise<void> => {
    if (!currentQuestion) return;

    const requestData = {
      script: code,
      currentQuestion: currentQuestion,
    };

    try {
      const response = await fetch('http://localhost:3000/analysescore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }).then((res) => res.json());

      const analyzedFeedback:string= response.replace(/^```|```$/g, "");
      setFeedback(analyzedFeedback);
    } catch (error) {
      console.error('Error analyzing code:', error);
    }
  };

  const handleRunCode = async (): Promise<void> => {
    try {
      const requestData = { script: code };

      const response = await fetch("http://localhost:3000/api/runcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorResponse= await response.json();
        throw new Error(errorResponse.error || "An error occurred");
      }

      const data= await response.json();
      
      if (data.success) {
         setOutput(data.output);
       } else{
         setOutput(`Error:${data.error}`);
       }
       
     } catch (err) { 
       console.error("Error running code:", err.message); 
       setOutput(`Error:${err.message}`); 
     }
   };
   
   return (
     <div className="min-h-screen bg-gray-100 py-8 px-4">
       <div className="max-w-7xl mx-auto space-y-6">
         {questions.length > 0 ? (
           <div className="bg-white rounded-lg p-6 shadow-md">
             <div className="flex justify-between items-center mb-4">
               <h1 className="text-2xl font-bold">
                 Question {currentQuestionIndex + 1} of {questions.length}
               </h1>
               <span className={`px-3 py-1 rounded-full text-sm font-medium
                 ${difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                   difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-red-100 text-red-800'}`}>
                 {difficulty}
               </span>
             </div>

             <h2 className="text-xl font-semibold mb-2">{currentQuestion.title}</h2>
             <p className="text-gray-600 mb-4">{currentQuestion.description}</p>

             <div className="bg-gray-50 p-4 rounded-lg mb-4">
               <h3 className="font-medium mb-2">Test Cases:</h3>
               <pre className="text-sm">{currentQuestion.testCases.join('\n')}</pre>
             </div>
           </div>
         ) : (
           <p>Loading questions...</p>
         )}

         <CodeEditor
           code={code}
           onChange={setCode}
           onRun={handleRunCode}
           output={output}
           clickanalyse={analyzeCode}
           assessed={feedback}
         />

         <div className="flex justify-between items-center">
           <button
             onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
             disabled={currentQuestionIndex === 0}
             className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm disabled:opacity-50"
           >
             <ChevronLeft className="w-4 h-4" />
             Previous
           </button>

           <button
             onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
             disabled={currentQuestionIndex === questions.length - 1}
             className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm disabled:opacity-50"
           >
             Next
             <ChevronRight className="w-4 h-4" />
           </button>
         </div>
       </div>
     </div>
   );
};