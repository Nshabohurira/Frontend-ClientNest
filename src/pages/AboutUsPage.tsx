import React from "react";

const team = [
  { name: "Jane Doe", role: "CEO & Founder", img: "/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" },
  { name: "John Smith", role: "CTO", img: "/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" },
  { name: "Alice Brown", role: "Lead Designer", img: "/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" },
];

const values = [
  { icon: "🚀", title: "Innovation", desc: "We build cutting-edge tools for modern teams." },
  { icon: "🤝", title: "Collaboration", desc: "We believe in the power of teamwork." },
  { icon: "🔒", title: "Security", desc: "Your data is always safe with us." },
];

const AboutUsPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-0">
    {/* Hero Section */}
    <section className="flex flex-col items-center justify-center text-center py-16">
      <img src="/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" alt="Client Nest Logo" className="h-20 w-20 mx-auto mb-6 object-contain rounded-xl shadow-lg border-4 border-white" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">About Client Nest</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-2xl mx-auto">Empowering teams to manage social media with ease and efficiency.</p>
    </section>

    {/* Our Story */}
    <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center bg-white rounded-xl shadow-lg p-10 mt-[-40px] mb-14">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Story</h2>
        <p className="text-gray-700 text-base leading-relaxed">Client Nest was founded to help teams manage their social media with ease and efficiency. Our mission is to empower businesses to grow their online presence through smart, collaborative tools. We believe in innovation, teamwork, and putting our clients first every step of the way.</p>
      </div>
      <div className="flex justify-center">
        <img src="/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" alt="Teamwork" className="rounded-xl shadow-lg w-56 h-56 object-contain bg-gradient-to-br from-blue-50 to-indigo-100 p-4" />
      </div>
    </section>

    {/* Our Values */}
    <section className="max-w-5xl mx-auto mb-14">
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((val) => (
          <div key={val.title} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-xl">
            <span className="text-4xl mb-2">{val.icon}</span>
            <h3 className="font-bold text-lg mb-1 text-blue-800">{val.title}</h3>
            <p className="text-gray-600 text-center text-base">{val.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Meet the Team */}
    <section className="max-w-5xl mx-auto mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">Meet the Team</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member) => (
          <div key={member.name} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-56 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <img src={member.img} alt={member.name} className="h-20 w-20 rounded-full object-cover mb-3 border-4 border-blue-100 shadow" />
            <h3 className="font-bold text-lg text-blue-800 mb-1">{member.name}</h3>
            <p className="text-gray-600 mb-2">{member.role}</p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></a>
              <a href="#" className="text-indigo-500 hover:text-indigo-700"><svg width="20" height="20" fill="currentColor"><rect width="20" height="20" rx="5" /></svg></a>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Contact / CTA */}
    <section className="max-w-2xl mx-auto text-center bg-white rounded-xl shadow-lg p-10 mb-10">
      <h2 className="text-2xl font-bold mb-2 text-blue-700">Get in Touch</h2>
      <p className="text-gray-700 mb-4 text-base">Want to learn more? Contact us or start your free trial today!</p>
      <a href="mailto:info@clientnest.com" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base">Contact Us</a>
    </section>
  </div>
);

export default AboutUsPage; 