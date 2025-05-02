import { Link } from 'react-router-dom';

export default function ExerciseLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] via-[#414345] to-[#809BCE] flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-[#181C23]/90 rounded-2xl shadow-2xl border border-[#809BCE]/30 backdrop-blur-md p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#809BCE]/40 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-[#EAC4D5]/30 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between mb-8">
          <Link
            to="/exercises"
            className="flex items-center gap-2 text-[#B8E0D2] hover:text-[#EAC4D5] font-semibold transition-colors duration-200 text-base bg-[#232526]/60 px-4 py-2 rounded-full shadow hover:scale-105 active:scale-95"
          >
            <span className="text-xl">←</span> Volver a Ejercicios
          </Link>
          <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B8E0D2] via-[#EAC4D5] to-[#809BCE] drop-shadow-lg tracking-wide">
            {title}
          </h2>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}