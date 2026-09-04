"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Palette, Zap, Hammer, Smartphone } from "lucide-react"
import Link from "next/link"

export default function AllCategories() {
  const [expandedSections, setExpandedSections] = useState('')

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName) ? prev.filter((name) => name !== sectionName) : [...prev, sectionName],
    )
  }

  const categoryGroups = [
    {
      name: "Painting & Finishing",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      categories: [
        "Internal Painting",
        "External Painting",
        "Textured Painting",
        "Decorative Lights (Supply)",
        "Wall Tiles (Supply & Installation)",
      ],
    },
    {
      name: "Mechanical & Electrical",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      categories: ["HVAC Works", "Electrical Works", "Plumbing Works", "CCTV Works", "Switch & Sockets (Supply)"],
    },
    {
      name: "Civil & Structural",
      icon: Hammer,
      color: "from-gray-500 to-gray-600",
      categories: [
        "RCC Structure",
        "Steel Structure (Fabrication, Supply & Install)",
        "Earthworks (Excavation & Backfilling)",
        "Piling",
        "Screed & Epoxy",
      ],
    },
    {
      name: "Smart Home & Systems",
      icon: Smartphone,
      color: "from-blue-500 to-purple-500",
      categories: [
        "Home Automation",
        "AV Works",
        "Home Theatre System",
        "Water Filtration",
        "Solar Panel Installation",
      ],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

      {/* Animated service icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">🔧</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse delay-1000">⚡</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl animate-pulse delay-500">🏗️</div>
        <div className="absolute bottom-1/4 right-1/3 text-5xl animate-pulse delay-1500">🎨</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl mb-6 text-white font-semibold">All Categories</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Complete list of all service categories organized by trade groups
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categoryGroups.map((group, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 150} className="group">
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:border-[#B93239]/50 overflow-hidden">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection(group.name)}>
                  <CardTitle className="flex items-center justify-between text-white group-hover:text-[#B93239] transition-colors duration-300">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <group.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xl font-semibold">{group.name}</span>
                    </div>
                    {expandedSections.includes(group.name) ? (
                      <ChevronUp className="h-6 w-6 text-gray-300" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-300" />
                    )}
                  </CardTitle>
                </CardHeader>

                {expandedSections.includes(group.name) && (
                  <CardContent className="pt-0">
                    <div className="grid gap-3">
                      {group.categories.map((category, categoryIndex) => (
                        <Link
                          href="/signup"
                          key={categoryIndex}
                          aria-label={`Create a customer account to find ${category} vendors`}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B93239]"
                        >
                          <span className="text-gray-300 group-hover/item:text-white transition-colors">
                            {category}
                          </span>
                          <div className="flex items-center space-x-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <span className="text-xs text-gray-400">Create account to view vendors</span>
                            <div className="w-2 h-2 bg-[#B93239] rounded-full"></div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* View Full List CTA */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl mb-4 text-white font-semibold">Explore More Categories</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Can't find what you're looking for? Browse our complete directory of verified vendors.
            </p>
            <Button asChild className="bg-[#B93239] hover:bg-[#A02A31] text-white shadow-lg hover:shadow-xl transition-all px-8 h-12 text-lg">
              <Link href="/signup">Create Customer Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
