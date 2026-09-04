import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Wind, Droplets, Hammer, Wrench, Eye, Sofa, Mountain, Waves, Smartphone } from "lucide-react"
import Link from "next/link"

export default function FeaturedCategories() {
  const featuredCategories = [
    {
      name: "Electrical Works",
      icon: Zap,
      description: "Complete electrical solutions for residential and commercial projects",
      vendorCount: "150+ Vendors",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      popular: true,
    },
    {
      name: "HVAC Works",
      icon: Wind,
      description: "Heating, ventilation, and air conditioning systems",
      vendorCount: "120+ Vendors",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      popular: true,
    },
    {
      name: "Plumbing Works",
      icon: Droplets,
      description: "Professional plumbing installation and maintenance",
      vendorCount: "110+ Vendors",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      popular: false,
    },
    {
      name: "Gypsum Works",
      icon: Hammer,
      description: "Gypsum board installation and finishing",
      vendorCount: "95+ Vendors",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      popular: false,
    },
    {
      name: "Joinery",
      icon: Wrench,
      description: "Custom woodwork and carpentry services",
      vendorCount: "85+ Vendors",
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      popular: true,
    },
    {
      name: "Internal Glass Partitions",
      icon: Eye,
      description: "Modern glass partition solutions",
      vendorCount: "65+ Vendors",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      popular: false,
    },
    {
      name: "Custom Furniture Supply",
      icon: Sofa,
      description: "Bespoke furniture design and manufacturing",
      vendorCount: "75+ Vendors",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      popular: false,
    },
    {
      name: "Stone Supply & Installation",
      icon: Mountain,
      description: "Natural and engineered stone solutions",
      vendorCount: "55+ Vendors",
      color: "from-stone-500 to-stone-600",
      bgColor: "bg-stone-50",
      popular: false,
    },
    {
      name: "Swimming Pool Works",
      icon: Waves,
      description: "Pool construction and maintenance services",
      vendorCount: "45+ Vendors",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      popular: false,
    },
    {
      name: "Home Automation",
      icon: Smartphone,
      description: "Smart home technology integration",
      vendorCount: "70+ Vendors",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      popular: true,
    },
  ]

  return (
    <section id="featured-categories" className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden scroll-mt-20">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#B93239]/12 to-transparent rounded-full blur-xl"></div>

      {/* Floating category icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 text-4xl">🔧</div>
        <div className="absolute top-40 right-20 text-3xl">⚡</div>
        <div className="absolute bottom-40 left-1/4 text-5xl">🏗️</div>
        <div className="absolute bottom-20 right-10 text-3xl">🎨</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl mb-6 text-gray-900 font-semibold">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Top 10 most searched service categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredCategories.map((category, index) => (
            <Link
              href="/signup"
              key={category.name}
              aria-label={`Create a customer account to find ${category.name} vendors`}
              className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B93239] focus-visible:ring-offset-4"
            >
              <div
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group cursor-pointer h-full transform hover:scale-105 transition-all duration-300"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white relative h-full">
                  {category.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-gradient-to-r from-[#B93239] to-[#A02A31] text-white border-0 shadow-lg">
                        Popular
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Icon with gradient background */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                      >
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300`}
                      ></div>
                    </div>

                    <h3 className="text-xl mb-3 text-gray-900 group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                      {category.name}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{category.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-medium">{category.vendorCount}</span>
                      <span className="flex items-center text-sm font-medium text-[#B93239]">
                        Create account
                        <ArrowRight className="h-5 w-5 ml-1 text-gray-400 group-hover:text-[#B93239] group-hover:translate-x-1 transition-all duration-300" />
                      </span>
                    </div>
                  </CardContent>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B93239]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
