import { Award, BookOpen, Clock, Users } from "lucide-react";


// Enhanced stats section
const StatsSection = () => {
  const stats = [
    { icon: <Users className="w-6 h-6" />, number: '10,000+', label: 'Active Students' },
    { icon: <BookOpen className="w-6 h-6" />, number: '500+', label: 'Expert Tutors' },
    { icon: <Clock className="w-6 h-6" />, number: '50,000+', label: 'Hours Taught' },
    { icon: <Award className="w-6 h-6" />, number: '98%', label: 'Success Rate' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 0 8-4 8-8s-4-8-8-8-8 4-8 8 8 8 8 8z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join the growing community of students and tutors transforming education in Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group hover:scale-110 transition-transform duration-300 animate-in fade-in-50 zoom-in-50 duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/20 transition-colors">
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
