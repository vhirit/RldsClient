// App.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="shadow-md bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/Logo_RLDS.png" alt="RLDS Logo" className="h-10" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
            <a href="#about">About Us</a>
            <a href="#vision">Vision</a>
            <a href="#strength">Strength</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-gray-100 p-4 space-y-3">
            <a href="#about">About Us</a>
            <a href="#vision">Vision</a>
            <a href="#strength">Strength</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Risk Assessed, Future Secured
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Trusted Verification & Detective Services Across South India
        </p>
        <div className="mt-6 space-x-4">
          <Button variant="secondary">Get in Touch</Button>
          <Button className="bg-black text-white">Our Services</Button>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="text-gray-700 leading-relaxed">
          Raghuveer Reddy Lingampali Detective Services Pvt. Ltd (RLDS) is headquartered in Kurnool, Andhra Pradesh with branches across AP, Telangana, Karnataka, and Tamil Nadu. Our team of professionals includes Chartered Accountants, Lawyers, and Retired Police Officers, delivering timely and accurate verification reports with confidentiality.
        </p>
      </section>

      {/* Vision */}
      <section id="vision" className="py-16 bg-gray-50 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Provide comprehensive verification solutions with professionalism</li>
          <li>Build long-term client relationships</li>
          <li>Empower employees professionally & personally</li>
          <li>Expand services across South India</li>
        </ul>
      </section>

      {/* Strength */}
      <section id="strength" className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Our Strength</h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>✔ Skilled professionals & experts</div>
          <div>✔ Strong network across 4 states</div>
          <div>✔ Confidential & secure reports</div>
          <div>✔ Dedicated field executives</div>
          <div>✔ Proven track record with banks</div>
          <div>✔ Affordable & timely services</div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-gray-50 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl shadow-sm bg-white">
            <h3 className="font-semibold text-lg mb-3">Banking Verification</h3>
            <ul className="list-disc pl-4 text-gray-600 space-y-1">
              <li>Credit Verification</li>
              <li>Address Verification</li>
              <li>Salaried Verification</li>
              <li>Business Verification</li>
              <li>Vendor Background Checks</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl shadow-sm bg-white">
            <h3 className="font-semibold text-lg mb-3">Employee Background Checks</h3>
            <ul className="list-disc pl-4 text-gray-600 space-y-1">
              <li>Address Verification</li>
              <li>Employment Verification</li>
              <li>Reference Checks</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl shadow-sm bg-white">
            <h3 className="font-semibold text-lg mb-3">Premarital Verification</h3>
            <ul className="list-disc pl-4 text-gray-600 space-y-1">
              <li>Family & Neighborhood Confirmation</li>
              <li>Employment History</li>
              <li>Discreet Colleague Checks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
          <div><strong>L. Raghuveer Reddy</strong><br/>Founder & Managing Director</div>
          <div><strong>Apsar Basha</strong><br/>Regional Manager</div>
          <div><strong>B Krishna Kishore</strong><br/>Legal Officer</div>
          <div><strong>B Venkata Krishna</strong><br/>Legal Monitoring Head</div>
          <div><strong>Durga Rao</strong><br/>Area Manager – AP</div>
          <div><strong>Sugandhi</strong><br/>Regional Manager – Tamil Nadu & Vizag</div>
          {/* Add others similarly */}
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-16 bg-gray-50 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Our Clients & Empanelments</h2>
        <p className="text-gray-700">
          We are empaneled with State Bank of India, Karnataka Bank, and provide verification services to leading banks, NBFCs, and corporates across South India.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form className="grid gap-4 max-w-2xl">
          <input type="text" placeholder="Name" className="border p-3 rounded" />
          <input type="email" placeholder="Email" className="border p-3 rounded" />
          <input type="tel" placeholder="Phone" className="border p-3 rounded" />
          <textarea placeholder="Message" rows="4" className="border p-3 rounded"></textarea>
          <Button>Submit</Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-10 text-center text-sm">
        <p>© {new Date().getFullYear()} RLDS Pvt Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
