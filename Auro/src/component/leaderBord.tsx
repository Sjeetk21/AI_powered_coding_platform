import React, { FC } from 'react';
import { Medal } from 'lucide-react';

interface LeaderboardEntry {
  position: number;
  playerName: string;
  totalPoints: number;
  tasksCompleted: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { position: 1, playerName: "Alex Chen", totalPoints: 2840, tasksCompleted: 145 },
  { position: 2, playerName: "Sarah Smith", totalPoints: 2720, tasksCompleted: 138 },
  { position: 3, playerName: "Mike Johnson", totalPoints: 2650, tasksCompleted: 132 },
  { position: 4, playerName: "Emma Davis", totalPoints: 2590, tasksCompleted: 129 },
  { position: 5, playerName: "James Wilson", totalPoints: 2510, tasksCompleted: 125 },
];

export const RankingBoard: FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Medal className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold">Top Players</h2>
      </div>
      <div className="space-y-4">
        {leaderboardData.map((entry) => (
          <div
            key={entry.position}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold ${
                entry.position === 1 ? 'text-yellow-500' :
                entry.position === 2 ? 'text-gray-400' :
                entry.position === 3 ? 'text-amber-700' : 'text-gray-700'
              }`}>#{entry.position}</span>
              <span className="font-medium">{entry.playerName}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{entry.tasksCompleted} tasks</span>
              <span className="font-semibold text-indigo-600">{entry.totalPoints}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};