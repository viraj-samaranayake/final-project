import { ArrowRight, BookOpen, CheckCircle, Globe, Users } from "lucide-react";

// Features section with modern cards
const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "For Students",
      description: "Browse expert tutors, book personalized classes, attend interactive live sessions, or access comprehensive recorded lessons anytime.",
      benefits: ["1-on-1 tutoring", "Live classes", "Recorded sessions", "Progress tracking"],
      gradient: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "For Tutors",
      description: "Create your professional profile, schedule flexible classes, upload engaging materials, and manage your earnings effortlessly.",
      benefits: ["Profile creation", "Flexible scheduling", "Material uploads", "Earning management"],
      gradient: "from-purple-500 to-pink-500",
      delay: 200
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Anywhere Access",
      description: "Learn or teach from anywhere in Sri Lanka with our mobile-responsive platform and reliable video streaming technology.",
      benefits: ["Mobile responsive", "HD video quality", "Reliable streaming", "24/7 support"],
      gradient: "from-green-500 to-emerald-500",
      delay: 400
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EduConnect?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing education in Sri Lanka with cutting-edge technology and personalized learning experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000"
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center text-blue-600 font-medium cursor-pointer group-hover:translate-x-2 transition-transform">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;