import { Activity, Award, BookOpen, TrendingUp, Users } from 'lucide-react';

const PlatformMetrics = () => {
  return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-1000">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">1,847</h4>
            <p className="text-sm text-gray-600">Total Classes</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +23% this month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl text-white mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">847</h4>
            <p className="text-sm text-gray-600">Certificates Issued</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +45% this month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">89%</h4>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5% this month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">95%</h4>
            <p className="text-sm text-gray-600">User Satisfaction</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2% this month
            </div>
          </div>
        </div>
  )
}

export default PlatformMetrics;      
        
        