import { Clock, Globe, Star } from 'lucide-react';

const PerformanceMetrics = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-700">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center hover:shadow-lg transition-all duration-300">
        <div className="inline-flex p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white mb-4">
          <Star className="w-6 h-6" />
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-1">4.5</h4>
        <p className="text-sm text-gray-600">Average Rating</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center hover:shadow-lg transition-all duration-300">
        <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white mb-4">
          <Clock className="w-6 h-6" />
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-1">1,247h</h4>
        <p className="text-sm text-gray-600">Classes This Month</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center hover:shadow-lg transition-all duration-300">
        <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white mb-4">
          <Globe className="w-6 h-6" />
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-1">94%</h4>
        <p className="text-sm text-gray-600">Platform Uptime</p>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
