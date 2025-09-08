import { Play, Star, ArrowRight, ChevronDown } from 'lucide-react';
import FloatingParticles from './FloatingPartcles';

// Hero section with advanced animations
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-6 animate-in fade-in-50 duration-1000">
          <div className="inline-flex items-center px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Trusted by 10,000+ students
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-200">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-800 bg-clip-text text-transparent">
            Empowering
          </span>
          <br />
          <span className="text-gray-800">Sri Lankan Students</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300">
          Connect with expert tutors, learn at your own pace, and access live
          and recorded classes from anywhere in Sri Lanka.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-500">
          <a
            href="/register"
            className="group bg-gradient-to-r from-blue-600 to-purple-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl flex items-center space-x-2 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>Start Learning Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border border-gray-200 shadow-lg flex items-center space-x-2 hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Play className="w-5 h-5 text-blue-600" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-700">
          {[
            { number: '10K+', label: 'Students' },
            { number: '500+', label: 'Tutors' },
            { number: '50+', label: 'Subjects' },
            { number: '4.9★', label: 'Rating' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center hover:scale-110 transition-transform duration-300"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-in fade-in-50 duration-1000 delay-1000">
          <div className="flex flex-col items-center text-gray-400 animate-bounce">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
