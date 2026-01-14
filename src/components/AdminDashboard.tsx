import React from 'react';
import { AssessmentData } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface AdminDashboardProps {
  assessments: AssessmentData[];
  onDelete: (id: string) => void; // ⬅️ TAMBAHAN
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  assessments,
  onDelete // ⬅️ TAMBAHAN
}) => {
  // Stats calculation
  const totalAssessments = assessments.length;
  const avgScore =
    totalAssessments > 0
      ? assessments.reduce((acc, curr) => acc + curr.score, 0) /
        totalAssessments
      : 0;

  const statusCounts = assessments.reduce((acc: any, curr) => {
    acc[curr.conclusion] = (acc[curr.conclusion] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Control Panel
        </h1>
        <p className="text-slate-500">
          Monitoring data ketahanan pangan UMKM seluruh wilayah.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <div>
            <div className="text-sm text-slate-500">Total Penilaian</div>
            <div className="text-2xl font-bold text-slate-900">
              {totalAssessments}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl">
            <i className="fas fa-chart-pie"></i>
          </div>
          <div>
            <div className="text-sm text-slate-500">Rata-rata Skor</div>
            <div className="text-2xl font-bold text-slate-900">
              {avgScore.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl">
            <i className="fas fa-store"></i>
          </div>
          <div>
            <div className="text-sm text-slate-500">UMKM Terdata</div>
            <div className="text-2xl font-bold text-slate-900">
              {new Set(assessments.map(a => a.msmeName)).size}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Charts */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6 text-center">
            Distribusi Status Ketahanan
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#059669" // ⬅️ tetap hijau
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-center items-center">
  <h3 className="font-bold">Log Penilaian Terbaru</h3>
</div>


          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">UMKM</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Skor</th>
                  <th className="px-6 py-4">Aksi</th> {/* ⬅️ TAMBAHAN */}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {assessments.slice(0, 10).map(a => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {a.msmeName}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-500 uppercase">
                        {a.conclusion}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {a.score.toFixed(0)}
                    </td>
                    <td className="px-6 py-4">
                      {/* 🔴 TOMBOL DELETE */}
                      <button
                        onClick={() => onDelete(a.id)}
                        className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {assessments.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      Belum ada data penilaian masuk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
