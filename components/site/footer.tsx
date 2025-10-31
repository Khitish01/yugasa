import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Phone, Youtube } from "lucide-react"
import { BookingForm } from "./booking-form"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-light mb-8 tracking-wide">YUGASA BUILDERS</h2>
            
            <div className="mb-8">
              <h3 className="text-lg mb-4">Premier Construction Company</h3>
              <p className="text-gray-300 mb-2">Rajesh Yugasa | Managing Director</p>
              <p className="text-gray-300">Priya Sharma | Chief Architect</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg mb-4">Location</h3>
              <p className="text-gray-300">123 Business District, #600</p>
              <p className="text-gray-300">Bandra Kurla Complex, Mumbai 400051</p>
            </div>

            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Contact & Careers */}
          <div>
            <h3 className="text-lg mb-6">Contact Us</h3>
            <div className="space-y-4 mb-8">
              <p className="text-gray-300">(+91) 00000-00000</p>
              <Link href="mailto:hello@yugasa.builders" className="text-gray-300 hover:text-white transition-colors underline">
                hello@yugasa.builders
              </Link>
            </div>
            
            <h3 className="text-lg mb-4">Careers</h3>
            <p className="text-gray-300 mb-3">Join our team and build the future</p>
            <Link href="/careers" className="text-white hover:text-gray-300 transition-colors underline">
              View Open Positions →
            </Link>
          </div>

          {/* Book Appointment */}
          <BookingForm />
          
          {/* Newsletter - Commented */}
          {/* <div>
            <h2 className="text-2xl font-light mb-6 tracking-wide">NEWSLETTER</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our Newsletter for latest news and updates. Stay tuned!
            </p>
            
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
              />
              
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <input type="checkbox" className="mt-1" />
                <p>
                  By providing The Yugasa Builders - your contact information, you acknowledge and agree to our{" "}
                  <Link href="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>{" "}
                  and consent to receiving marketing communications, including through automated calls, texts, and emails, 
                  some of which may use artificial or prerecorded voices. This consent isn't necessary for purchasing 
                  any products or services and you may opt out at any time. To opt out from texts, you can reply, 'stop' 
                  at any time. To opt out from emails, you can click on the unsubscribe link in the emails. Message and 
                  data rates may apply.
                </p>
              </div>
              
              <button
                type="submit"
                className="border border-white px-8 py-2 hover:bg-white hover:text-black transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div> */}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-gray-800 text-sm text-gray-400">
          <p>Website Designed & Developed by Yugasa Builders</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <p>Copyright {new Date().getFullYear()}</p>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}