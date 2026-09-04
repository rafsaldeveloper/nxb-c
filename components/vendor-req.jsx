import { CheckCircle, FileText, DollarSign, Award, Building, Shield } from "lucide-react"
import Link from "next/link"

export default function VendorRequirementsSection() {
  const requirements = [
    {
      number: 1,
      title: "3 Years of Trading",
      description: "Your business has been trading for a minimum of 3 years as per your Trade License",
      icon: Building,
      color: "from-blue-500 to-blue-600",
    },
    {
      number: 2,
      title: "Valid Trade License!",
      description: "Your Trade License is valid and reflects the activities for which your business provides",
      icon: FileText,
      color: "from-green-500 to-green-600",
    },
    {
      number: 3,
      title: "Good Financial Order?",
      description: "Your business is in good financial order (we will request to view audited financials)",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
    },
    {
      number: 4,
      title: "5 Projects Completed",
      description: "Your business has completed 5 projects in the last 12 months to an exceptional standard",
      icon: Award,
      color: "from-orange-500 to-orange-600",
    }
    // {
    //   number: 5,
    //   title: "Non Refundable Fee",
    //   description: "AED 3,000 non-refundable fee to cover the cost of carrying out the Due Diligence checks",
    //   icon: Shield,
    //   color: "from-red-500 to-red-600",
    // },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#B93239]/12 to-transparent rounded-full blur-xl"></div>

      {/* Floating requirement icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 text-4xl">📋</div>
        <div className="absolute top-40 right-20 text-3xl">✅</div>
        <div className="absolute bottom-40 left-1/4 text-5xl">🏢</div>
        <div className="absolute bottom-20 right-10 text-3xl">📄</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl mb-6 text-gray-900 font-semibold">Vendor Requirements</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            To become a verified vendor on Nexus Built, your business must meet these essential criteria
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {requirements.map((requirement, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#B93239]/20 hover:-translate-y-1"
            >
              {/* Number badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{requirement.number}</span>
              </div>

              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#B93239]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 mt-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${requirement.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                  >
                    <requirement.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl mb-4 text-gray-900 group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                  {requirement.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{requirement.description}</p>

                {/* Check mark indicator */}
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Required for verification</span>
                </div>
              </div>

              {/* Accent styling */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Additional info section */}
        <div className="mt-16 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-gradient-to-r from-[#B93239]/10 to-[#A02A31]/10 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Get Verified?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Once you meet all requirements, our team will guide you through the verification process. This typically
              takes 3-5 business days to complete.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vendor/register"
                className="bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                  Start Verification Process
              </Link>
              <button className="border-2 hidden border-[#B93239] text-[#B93239] hover:bg-[#B93239] hover:text-white px-8 py-3 rounded-xl font-medium bg-transparent transition-all">
                Download Requirements Guide
              </button>
            </div>
          </div>
        </div>

        {/* Process timeline */}
        <div className="mt-16 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="800">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Verification Process</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Submit Application", desc: "Complete the vendor application form" },
              { step: "2", title: "Document Review", desc: "We review your submitted documents" },
              { step: "3", title: "Due Diligence", desc: "Background and financial checks" },
              { step: "4", title: "Approval", desc: "Get verified and start receiving enquiries" },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{step.step}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
