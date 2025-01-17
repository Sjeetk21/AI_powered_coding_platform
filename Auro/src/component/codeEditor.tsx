import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play } from 'lucide-react';

interface EditorProps {
  initialCode: string;
  onCodeChange: (newCode: string) => void;
  executeCode: () => void;
  analyzeCode: () => void;
  executionResult: string;
  analysisOutput: string;
}

const PythonCodeEditor: React.FC<EditorProps> = ({
  initialCode,
  onCodeChange,
  executeCode,
  executionResult,
  analyzeCode,
  analysisOutput
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="editor-container bg-white rounded-lg shadow-lg">
        <div className="header border-b px-4 py-3 flex justify-between items-center">
          <h2 className="font-bold">Python Code Workspace</h2>
          <button
            onClick={executeCode}
            className="run-btn flex items-center gap-3 bg-emerald-600 text-white px-5 py-2 rounded hover:bg-emerald-700 transition"
          >
            <Play className="icon-size w-5 h-5" />
            Execute
          </button>
        </div>

        <Editor
          height="400px"
          language="python"
          value={initialCode}
          onChange={(updatedCode) => onCodeChange(updatedCode || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'relative',
            autoClosingBrackets: 'languageDefined',
            autoIndent: 'advanced',
          }}
        />

        <div className="output-section bg-gray-900 text-gray-100 p-4 mt-4 rounded-md">
          <h4 className="text-sm text-gray-400 mb-3">Execution Result:</h4>
          <pre className="output-text font-mono text-sm whitespace-pre-wrap break-all">
            {executionResult || 'Click Execute to view results'}
          </pre>
        </div>

        <div className="analyze-btn-wrapper flex justify-end mt-4">
          <button
            onClick={analyzeCode}
            className="analyze-btn flex items-center gap-3 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            <Play className="icon-size w-5 h-5" />
            AI Analyze
          </button>
        </div>
      </div>

      <div className="analysis-output bg-gray-800 text-gray-100 p-4 rounded-md">
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">
          {analysisOutput || 'Analysis results will appear here.'}
        </pre>
      </div>
    </div>
  );
};

export default PythonCodeEditor;

