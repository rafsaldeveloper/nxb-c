import { Button } from "@/components/ui/button"
import { ArrowRight, UserPlus, Search, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ServicesCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/15 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Flowing lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <h2 className="lg:text-5xl text-[34px] mb-8 font-semibold leading-tight">
            Ready to find your
            <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              next vendor?
            </span>
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Create your free account to submit enquiries and manage all your vendor interactions in one place.
          </p>

          {/* Process steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-white/80">Create your free account in minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-white/80">Find verified vendors by category</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-white/80">Send enquiries and get responses</p>
            </div>
          </div>

          {/* Main CTA */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
            <h3 className="text-2xl mb-4 font-semibold">Start Your Search Today</h3>
            <p className="text-white/80 mb-6 text-lg">
              Join thousands of project owners who trust Nexus Built for their vendor needs
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#B93239] hover:bg-gray-100 lg:px-12 px-4 lg:h-16 h-12 lg:text-xl text-[16px] shadow-2xl hover:shadow-3xl transition-all group"
            >
              <Link href="/signup">
                Sign Up and Start Searching
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Secondary info */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free to join</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Instant access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Verified vendors only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
