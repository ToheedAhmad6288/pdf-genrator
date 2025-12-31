import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const openSignTool = () => {
    navigate("/editor");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary-200 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 animate-fade-in-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-bold mb-6 hover:bg-primary-100 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            SECURE
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent py-1">
              Sign PDF
            </span>
            <span className="text-neutral-900 ml-3">Online</span>
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            E-sign your documents securely with our advanced signing tool. Effortless, fast, and legal.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            onClick={openSignTool}
            className="group cursor-pointer bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-primary-100/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform mb-8">
                <span className="text-white font-bold text-3xl italic">✎</span>
              </div>
              <h2 className="text-3xl font-extrabold text-neutral-900 mb-4">Ready to Sign?</h2>
              <p className="text-neutral-500 text-lg font-medium max-w-md">
                Click here to launch the editor and start signing your documents with ease.
              </p>
              <div className="mt-8 px-8 py-4 rounded-2xl bg-neutral-900 text-white font-bold flex items-center gap-3 group-hover:bg-black transition-colors">
                Launch Tool
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
