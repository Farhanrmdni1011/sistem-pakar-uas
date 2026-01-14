
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AssessmentData } from '../types';
import { runAssessment } from '../services/expertSystem';

interface AssessmentFormProps {
  user: User;
  onComplete: (data: AssessmentData) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ user, onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [msmeName, setMsmeName] = useState('');
  const [metrics, setMetrics] = useState({
    rawMaterials: 50,
    productionCapacity: 50,
    marketDemand: 50,
    financialStability: 50,
    distributionReach: 50,
  });

  const handleMetricChange = (name: string, value: number) => {
    setMetrics(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const result = runAssessment(msmeName, user.id, metrics);
    onComplete(result);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-emerald-700 p-8 text-white">
          <h2 className="text-3xl font-bold">Analisis Ketahanan Pangan</h2>
          <p className="text-emerald-100 opacity-80">Masukkan data operasional UMKM Anda untuk mendapatkan rekomendasi sistem pakar.</p>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Informasi Dasar</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama UMKM / Usaha</label>
                <input
                  type="text"
                  placeholder="Contoh: Kripik Sehat Mandiri"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  value={msmeName}
                  onChange={(e) => setMsmeName(e.target.value)}
                />
              </div>
              <button
                disabled={!msmeName}
                onClick={() => setStep(2)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-all"
              >
                Lanjutkan Ke Parameter Teknis
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold">Penilaian Parameter (Skala 0-100)</h3>
                <button onClick={() => setStep(1)} className="text-emerald-600 text-sm hover:underline">Kembali</button>
              </div>

              {[
                { id: 'rawMaterials', label: 'Ketersediaan Bahan Baku', desc: 'Seberapa stabil pasokan bahan utama Anda?' },
                { id: 'productionCapacity', label: 'Kapasitas Produksi', desc: 'Optimalitas mesin dan tenaga kerja dalam berproduksi.' },
                { id: 'marketDemand', label: 'Permintaan Pasar', desc: 'Seberapa besar minat konsumen terhadap produk Anda?' },
                { id: 'financialStability', label: 'Stabilitas Finansial', desc: 'Kesehatan arus kas dan cadangan dana darurat.' },
                { id: 'distributionReach', label: 'Jangkauan Distribusi', desc: 'Efektivitas logistik dalam mencapai pelanggan.' }
              ].map(m => (
                <div key={m.id} className="space-y-3">
                  <div className="flex justify-between">
                    <label className="block text-sm font-bold text-slate-800">{m.label}</label>
                    <span className="text-emerald-600 font-bold">{(metrics as any)[m.id]}%</span>
                  </div>
                  <p className="text-xs text-slate-500">{m.desc}</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(metrics as any)[m.id]}
                    onChange={(e) => handleMetricChange(m.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <i className="fas fa-microchip"></i>
                Jalankan Inferensi Sistem Pakar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;
