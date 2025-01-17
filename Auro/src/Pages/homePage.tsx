import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectSelector } from '../components/TopicSelector';
import { RankingBoard } from '../components/LeaderBoard';
import { Brain } from 'lucide-react';

export const LandingPage: FC = () => {
  const navigate = useNavigate();
  const [chosenTopic, setChosenTopic] = useState<string>('');
  const [level, setLevel] = useState<string>('Easy');
  const [numQuestions, setNumQuestions] = useState<number>(5);

  const handleBeginTest = (): void => {
    if (!chosenTopic) {
      alert('Please choose a topic');
      return;
    }
    navigate('/test', {
      state: { topic: chosenTopic, difficulty: level, questionCount: numQuestions },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Code Practice Platform
          </h1>
          <p className="text-lg text-gray-600">
            Choose a topic, set your preferences, and get started!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Choose Topic</h2>
              <SubjectSelector
                selectedTopic={chosenTopic}
                onSelectTopic={setChosenTopic}
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Test Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <button
                  onClick={handleBeginTest}
                  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Begin Test
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <RankingBoard />
          </div>
        </div>
      </div>
    </div>
  );
};