import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Daftar 4 Akun Demo Admin
  const adminDemos = [
    { email: 'farhan@gmail.com', password: 'admin123', name: 'Admin Utama' },
    { email: 'kerupukjengkol@gmail.com', password: 'admin123', name: 'Admin Pakar 1' },
    { email: 'kerupukudang@gmail.com', password: 'admin123', name: 'Admin Pakar 2' },
    { email: 'kerupukcilok@gmail.com', password: 'admin123', name: 'Admin Monitoring' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

    if (isRegister) {
      // LOGIKA REGISTRASI (Otomatis Role USER / UMKM)
      if (storedUsers.find((u: any) => u.email === email) || adminDemos.find(a => a.email === email)) {
        setError('Email sudah terdaftar!');
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password,
        role: 'USER' // Hardcoded sebagai USER/UMKM
      };

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
      alert('Registrasi UMKM Berhasil! Silakan Login.');
      setIsRegister(false);
    } else {
      // LOGIKA LOGIN
      
      // 1. Cek apakah yang login adalah salah satu dari 4 Admin Demo
      const foundAdmin = adminDemos.find(a => a.email === email && a.password === password);
      
      if (foundAdmin) {
        onLogin({
          id: `admin-${foundAdmin.email}`,
          name: foundAdmin.name,
          email: foundAdmin.email,
          role: 'ADMIN'
        });
        return;
      }

      // 2. Cek user yang terdaftar di database lokal (UMKM)
      const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError('Email atau Password salah!');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 transition-all">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-4">
            <i className={`fas ${isRegister ? 'fa-store' : 'fa-fingerprint'}`}></i>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {isRegister ? 'Daftar Akun UMKM' : 'Selamat Datang'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Sistem Pakar Ketahanan Pangan UMKM
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isRegister ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isRegister ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Daftar UMKM
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
            <i className="fas fa-exclamation-circle mr-2"></i> {error}
          </div>
        )}
        
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nama Usaha / Lengkap</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  placeholder="Contoh: Cilok Roda Kehidupan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Alamat Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                placeholder="email@anda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <i className="fas fa-key"></i>
              </span>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg mt-4"
          >
            {isRegister ? 'Buat Akun UMKM' : 'Masuk ke Sistem'}
          </button>
          
          {!isRegister && (
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Info Akun Demo Admin (Pass: admin123):</p>
               <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-500">
                 <p>• farhan@gmail.com</p>
                 <p>• kerupukjengkol@gmail.com</p>
                 <p>• kerupukudang@gmail.com</p>
                 <p>• kerupukcilok@gmail.com</p>
               </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;