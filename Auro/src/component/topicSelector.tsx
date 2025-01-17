import React, { FC } from 'react';

interface Subject {
  id: number;
  title: string;
}

const subjectList: Subject[] = [
  { id: 1, title: 'Arrays' },
  { id: 2, title: 'Dynamic Programming' },
  { id: 3, title: 'Data Structures' },
  { id: 4, title: 'Algorithms' },
  { id: 5, title: 'Graphs' },
  { id: 6, title: 'String Manipulation' },
];

interface SubjectSelectorProps {
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

export const SubjectSelector: FC<SubjectSelectorProps> = ({
  activeSubject,
  onSubjectChange,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {subjectList.map(({ id, title }: Subject) => (
        <button
          key={id}
          onClick={() => onSubjectChange(title)}
          className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all
            ${activeSubject === title
              ? 'bg-indigo-600 text-white'
              : 'bg-white hover:bg-indigo-50'
            }`}
        >
          <span className="font-medium">{title}</span>
        </button>
      ))}
    </div>
  );
};