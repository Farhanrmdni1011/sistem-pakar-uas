import React, { useState } from 'react';
import { User } from '../types';

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
    { email: 'ketahananpangan@gmail.com', password: 'admin123', name: 'Admin Utama' },
    
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

    if (isRegister) {
      if (storedUsers.find((u: any) => u.email === email) || adminDemos.find(a => a.email === email)) {
        setError('Email sudah terdaftar!');
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password,
        role: 'USER' 
      };

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
      alert('Registrasi UMKM Berhasil! Silakan Login.');
      setIsRegister(false);
    } else {
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

      const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError('Email atau Password salah!');
      }
    }
  };

  return (
    // Container Utama dengan Background Gradient Lembut
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Elemen Dekorasi Background (Bulatan Blur) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-200/50 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Kartu Login dengan Efek Glassmorphism */}
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 transition-all relative z-10">
        
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-emerald-200 rotate-3">
            <i className={`fas ${isRegister ? 'fa-store' : 'fa-fingerprint'}`}></i>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            {isRegister ? 'Daftar Akun' : 'Selamat Datang'}
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Sistem Pakar Ketahanan Pangan UMKM
          </p>
        </div>

        {/* Tab Switcher Modern */}
        <div className="flex p-1.5 bg-slate-200/50 rounded-2xl">
          <button
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${!isRegister ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Masuk
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${isRegister ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Daftar UMKM
          </button>
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-4 rounded-2xl text-sm text-center font-semibold border border-red-100 animate-bounce-short">
            <i className="fas fa-exclamation-circle mr-2"></i> {error}
          </div>
        )}
        
        <form className="mt-4 space-y-5" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase ml-2">Nama Usaha / Lengkap</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="Contoh: Cilok Roda Kehidupan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase ml-2">Alamat Email</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                required
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                placeholder="email@anda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase ml-2">Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <i className="fas fa-key"></i>
              </span>
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5 active:scale-[0.98] mt-6"
          >
            {isRegister ? 'Buat Akun Sekarang' : 'Masuk ke Sistem'}
          </button>
          
          {!isRegister && (
            <div className="mt-8 p-4 bg-emerald-50/50 rounded-[1.5rem] border border-emerald-100/50">
               <p className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-wider mb-2 flex items-center">
                 <i className="fas fa-info-circle mr-2"></i> Akun  Admin
               </p>
               <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-600 font-medium">
                 {adminDemos.map((admin) => (
                   <div key={admin.email} className="flex justify-between items-center bg-white/50 px-2 py-1 rounded-md">
                     <span>• {admin.email}</span>
                     <span className="text-[9px] bg-emerald-200 text-emerald-700 px-1.5 rounded">admin123</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;