
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { User, UserRole, AssessmentData } from './types';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AssessmentForm from './components/AssessmentForm';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);

  // Load sample data or from localstorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedAssessments = localStorage.getItem('assessments');
    if (savedAssessments) setAssessments(JSON.parse(savedAssessments));
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
/**
 * Adds a new assessment to the assessments list and updates the local storage.
 * @param {AssessmentData} assessment - The assessment to be added.
 */

  const addAssessment = (assessment: AssessmentData) => {
    const updated = [assessment, ...assessments];
    setAssessments(updated);
    localStorage.setItem('assessments', JSON.stringify(updated));
  };

  // TAMBAHKAN INI
const deleteAssessment = (id: string) => {
  const updated = assessments.filter(a => a.id !== id);
  setAssessments(updated);
  localStorage.setItem('assessments', JSON.stringify(updated));
};


  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Navbar */}
        <nav className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl group">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="flex flex-col leading-none">
                <span>SIPANGAN</span>
                <span className="text-[10px] text-emerald-200 font-normal">Expert System</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold leading-none">{user.name}</p>
                    <p className="text-[10px] text-emerald-200 uppercase tracking-wider">{user.role}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
                >
                  Portal Masuk
                </Link>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Auth onLogin={handleLogin} />} />
            
            <Route
  path="/dashboard"
  element={
    !user ? (
      <Navigate to="/login" />
    ) : user.role === 'ADMIN' ? (
      <AdminDashboard
        assessments={assessments}
        onDelete={deleteAssessment}
      />
    ) : (
      <UserDashboard
        assessments={assessments.filter(a => a.userId === user.id)}
      />
    )
  }
/>


            
            <Route 
              path="/assessment" 
              element={
                !user ? <Navigate to="/login" /> : <AssessmentForm user={user} onComplete={addAssessment} />
              } 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
              <div>
                <h4 className="text-white font-bold mb-4">Metodologi</h4>
                <ul className="text-sm space-y-2">
                  <li>Forward Chaining Inference</li>
                  <li>Fuzzy Logic Controller</li>
                 
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Bantuan</h4>
                <ul className="text-sm space-y-2">
                  <li>Panduan Pengguna</li>
                  <li>Kriteria Penilaian</li>
                  <li>Hubungi Kami</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Tentang</h4>
                <p className="text-sm">Sistem Pakar Penilaian Ketahanan Pangan pada UMKM Sektor Pangan Menggunakan Integrasi Forward Chaining dan Fuzzy Logic</p>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 text-center text-xs">
              <p>&copy; 2026 SIPANGAN. Sistem Pakar Penilaian Ketahanan Pangan pada UMKM Sektor Pangan Menggunakan Integrasi Forward Chaining dan Fuzzy Logic</p>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
