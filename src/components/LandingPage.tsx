
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-emerald-900 text-white overflow-hidden py-20">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" 
            alt="Food background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-400 rounded-full blur-[100px] opacity-10"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            Ukur Ketahanan Pangan <br/>
            <span className="text-emerald-400">UMKM Anda Secara Akurat</span>
          </h1>
          <p className="text-lg md:text-2xl text-emerald-100/80 mb-10 max-w-3xl mx-auto font-light">
            Sistem Pakar berbasis kecerdasan buatan untuk membantu UMKM Sektor Pangan mengelola risiko dan stabilitas operasional.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              to="/login" 
              className="bg-white text-emerald-900 hover:bg-emerald-50 px-10 py-5 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3"
            >
              <i className="fas fa-play"></i> Mulai Penilaian Sekarang
            </Link>
            <a 
              href="#features" 
              className="bg-emerald-800/50 backdrop-blur-sm border-2 border-emerald-500/30 hover:bg-emerald-800 text-emerald-100 px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
            >
              Lihat Cara Kerja <i className="fas fa-arrow-down"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <div className="bg-white py-10 border-b">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-black text-xl text-slate-600 italic">Farhan Ramadani</div>
          <div className="flex items-center gap-2 font-black text-xl text-slate-600 italic">Anugrah Catona S</div>
          <div className="flex items-center gap-2 font-black text-xl text-slate-600 italic">Satria Yoshi A</div>
      
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase">Keunggulan Sistem</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Analisis Cerdas Berstandar Pakar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              { 
                icon: 'fa-microchip', 
                title: 'Fuzzy Logic Inference', 
                desc: 'Mampu memproses input yang tidak pasti (samar) untuk memberikan skor yang lebih humanis dan fleksibel.' 
              },
              { 
                icon: 'fa-project-diagram', 
                title: 'Forward Chaining', 
                desc: 'Menelusuri fakta-fakta lapangan untuk menarik kesimpulan rekomendasi yang logis dan terstruktur.' 
              },
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-emerald-50 group-hover:bg-emerald-500 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:text-white mb-8 transition-colors">
                  <i className={`fas ${f.icon} text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-8 border-white rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Mengetahui Status Ketahanan Pangan Usaha Anda?</h2>
          <p className="text-emerald-50 mb-10 text-lg opacity-90">Gratis untuk UMKM Indonesia. Daftar sekarang dan dapatkan laporan lengkap diagnosis sistem pakar kami.</p>
          <Link 
            to="/login" 
            className="inline-block bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-2xl"
          >
            Daftar Akun Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
