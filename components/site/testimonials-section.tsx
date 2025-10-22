"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { FloatingParticles } from "@/components/ui/floating-particles"

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner",
    content: "Yugasa Builders transformed our vision into reality. The attention to detail and quality of construction exceeded our expectations. Our dream home was delivered on time and within budget.",
    rating: 5,
    image: "/placeholder-user.jpg"
  },
  {
    name: "Priya Patel",
    role: "Property Developer",
    content: "Working with Yugasa has been exceptional. Their project management skills and commitment to quality make them our preferred construction partner for all residential developments.",
    rating: 5,
    image: "/placeholder-user.jpg"
  },
  {
    name: "Amit Kumar",
    role: "Business Owner",
    content: "The commercial space Yugasa built for us perfectly balances functionality and aesthetics. Their team understood our business needs and delivered a space that enhances our operations.",
    rating: 5,
    image: "/placeholder-user.jpg"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <FloatingParticles count={10} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="eyebrow">TESTIMONIALS</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">What Our Clients Say</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Yugasa Builders.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}