
import React from 'react';
import { Link } from 'react-router-dom';
import { AssessmentData } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface UserDashboardProps {
  assessments: AssessmentData[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ assessments }) => {
  const latest = assessments[0];

  const getStatusColor = (status: string) => {
    if (status.includes('Sangat Tahan')) return 'text-emerald-600 bg-emerald-100';
    if (status.includes('Tahan')) return 'text-blue-600 bg-blue-100';
    if (status.includes('Rentan')) return 'text-red-600 bg-red-100';
    return 'text-amber-600 bg-amber-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard UMKM</h1>
          <p className="text-slate-500">Kelola dan pantau ketahanan pangan usaha Anda.</p>
        </div>
        <Link 
          to="/assessment" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Analisis Baru
        </Link>
      </div>

      {assessments.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-slate-200 text-center">
          <i className="fas fa-folder-open text-slate-300 text-5xl mb-4"></i>
          <h3 className="text-xl font-semibold text-slate-700">Belum ada penilaian</h3>
          <p className="text-slate-500 mb-6">Mulai penilaian pertama Anda untuk melihat tingkat ketahanan pangan.</p>
          <Link to="/assessment" className="text-emerald-600 font-bold hover:underline">Klik di sini untuk memulai</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Assessment View */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">Hasil Penilaian Terbaru</h3>
                  <p className="text-sm text-slate-400">{latest.msmeName} - {new Date(latest.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(latest.conclusion)}`}>
                  {latest.conclusion}
                </span>
              </div>

              <div className="h-64 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
  data={Object.entries(latest.metrics).map(([k, v]) => ({ 
    // Memetakan nama di grafik juga
    name: k === 'rawMaterials' ? 'Bahan Baku' : 
          k === 'productionCapacity' ? 'Kapasitas Produksi' :
          k === 'marketDemand' ? 'Permintaan Pasar' :
          k === 'financialStability' ? 'Stabilitas Finansial' :
          k === 'distributionReach' ? 'Jangkauan Distribusi' : k, 
    value: v 
  }))}
>
                    <XAxis dataKey="name" hide />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
  <h4 className="font-bold text-slate-700 mb-2">Penjelasan Fuzzy Logic</h4>
  <ul className="text-sm space-y-1">
    {Object.entries(latest.fuzzyResults).map(([key, val]: [string, any]) => {
      // 1. Tambahkan kamus terjemahan untuk label di sini
      const labels: { [key: string]: string } = {
        rawMaterials: 'Bahan Baku',
        productionCapacity: 'Kapasitas Produksi',
        marketDemand: 'Permintaan Pasar',
        financialStability: 'Stabilitas Finansial',
        distributionReach: 'Jangkauan Distribusi',
      };

      return (
        <li key={key} className="flex justify-between">
          {/* 2. Gunakan labels[key] untuk menampilkan Bahasa Indonesia */}
          <span className="">{labels[key] || key}</span>
          
          <span className="font-medium text-emerald-600">
            {/* 3. Ubah status High/Medium/Low ke Bahasa Indonesia */}
            {val.high > 0.5 ? 'Tinggi' : val.medium > 0.5 ? 'Sedang' : 'Rendah'}
          </span>
        </li>
      );
    })}
  </ul>
</div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <h4 className="font-bold text-emerald-700 mb-2">Rekomendasi Pakar</h4>
                  <p className="text-sm text-emerald-800">
                    Berdasarkan forward chaining, UMKM Anda dikategorikan sebagai <span className="font-bold">{latest.conclusion}</span>. 
                    {latest.score < 60 ? ' Fokuslah pada peningkatan efisiensi bahan baku dan stabilitas finansial.' : ' Pertahankan manajemen saat ini dan mulailah ekspansi pasar.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50">
                <h3 className="font-bold">Riwayat Penilaian</h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Tanggal</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Skor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assessments.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm">{new Date(a.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(a.conclusion)}`}>
                          {a.conclusion}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">{a.score.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold mb-4">Tips Ketahanan Pangan</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center shrink-0">1</div>
                  <p className="text-sm">Diversifikasi pemasok bahan baku untuk mengurangi risiko ketergantungan.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center shrink-0">2</div>
                  <p className="text-sm">Manfaatkan teknologi digital untuk pemasaran dan pencatatan inventaris.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center shrink-0">3</div>
                  <p className="text-sm">Siapkan dana cadangan operasional minimal untuk 3 bulan ke depan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
