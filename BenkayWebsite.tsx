"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function BenkayWebsite() {
  const services = [
    "Residential & Commercial Building",
    "Civil & Structural Engineering",
    "Renovation & Remodeling",
    "Road & Drainage Works",
    "Project Management",
    "Consultation & Planning",
  ];

  const faqs = [
    {
      q: "Where are you located?",
      a: "We are based in Accra and operate across Ghana.",
    },
    {
      q: "Do you handle both small and large projects?",
      a: "Yes, we manage projects of all sizes, from renovations to large-scale construction.",
    },
    {
      q: "How can I get a quote?",
      a: "Simply call us or fill out the contact form and we will get back to you promptly.",
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* HERO SECTION */}
      <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')] bg-cover bg-center flex items-center">
        <div className="bg-black/70 w-full min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 p-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Building Ghana&apos;s Future with Precision & Trust
              </h1>
              <p className="text-gray-200 text-lg mb-6">
                BENKAY Engineering and Construction delivers high-quality
                residential, commercial, and civil construction projects across
                Accra and beyond.
              </p>
              <Button size="lg" className="text-lg">
                Get a Free Quote
              </Button>
            </motion.div>

            {/* CONTACT FORM */}
            <Card className="bg-white/95 rounded-2xl shadow-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold">Request a Call Back</h3>
                <Input placeholder="Full Name" />
                <Input placeholder="Phone Number" />
                <Input placeholder="Email Address" />
                <Textarea placeholder="Tell us about your project" />
                <Button className="w-full">Submit</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card
                key={i}
                className="rounded-2xl shadow-lg hover:shadow-2xl transition"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service}</h3>
                  <p className="text-gray-600">
                    We deliver durable, cost-effective solutions using modern
                    engineering standards and skilled professionals.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose BENKAY?
            </h2>
            <ul className="space-y-4 text-lg">
              <li>- Proven expertise in engineering & construction</li>
              <li>- High-quality materials & workmanship</li>
              <li>- On-time project delivery</li>
              <li>- Transparent pricing & communication</li>
              <li>- Trusted by clients across Accra</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
            alt="Construction site"
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Project Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img
                key={i}
                src={`https://source.unsplash.com/600x400/?construction,building&sig=${i}`}
                alt={`Construction project ${i}`}
                className="rounded-2xl shadow-lg hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Card key={i} className="rounded-xl">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-black text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg mb-8">
          Call us today or request a free consultation.
        </p>
        <Button size="lg">Call: 020 740 8316</Button>
        <p className="mt-4 text-gray-300">JVQF+29, Accra | Open until 8:00 PM</p>
      </section>
    </div>
  );
}
