import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Bird, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Jane Doe",
    feedback: "Client Nest has streamlined our social media management. Highly recommended!",
    role: "Marketing Lead, Acme Corp",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "John Smith",
    feedback: "The analytics and scheduling features are top-notch.",
    role: "Content Manager, Beta Inc",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Lisa Ray",
    feedback: "Managing multiple platforms has never been easier!",
    role: "Social Media Strategist, Gamma LLC",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
  },
];

const footerLinks = {
  company: [
    { name: "About Us", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-6 h-6" />, href: "#" },
    { name: "Twitter", icon: <Twitter className="w-6 h-6" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="w-6 h-6" />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, href: "#" },
];

const features = [
  {
    title: "Unified Dashboard",
    description: "Manage all your social media accounts from one intuitive dashboard.",
    icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>,
  },
  {
    title: "Advanced Analytics",
    description: "Track engagement, growth, and performance with real-time analytics.",
    icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>,
  },
  {
    title: "Automated Scheduling",
    description: "Plan and schedule posts across platforms with ease.",
    icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>,
  },
];

const platforms = [
  { name: "Facebook", icon: <Facebook className="w-8 h-8 text-blue-600" /> },
  { name: "Twitter", icon: <Twitter className="w-8 h-8 text-sky-400" /> },
  { name: "Instagram", icon: <Instagram className="w-8 h-8 text-pink-500" /> },
  { name: "LinkedIn", icon: <Linkedin className="w-8 h-8 text-blue-700" /> },
  { name: "YouTube", icon: <Youtube className="w-8 h-8 text-red-600" /> },
];

const heroImages = [
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col scroll-smooth">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2">
            <img 
              src="/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" 
              alt="Client Nest Logo" 
              className="h-10 w-10 object-contain rounded-lg"
            />
            <span className="text-xl font-bold">Client Nest</span>
          </a>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-muted-foreground hover:text-primary">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/register')}>Sign Up</Button>
          </div>
        </div>
      </header>
      {/* Hero Section with Carousel */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 text-center shadow-sm min-h-[400px]">
        <Carousel
          className="absolute inset-0 w-full h-full z-0"
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          opts={{ loop: true }}
        >
          <CarouselContent className="h-full">
            {heroImages.map((img, idx) => (
              <CarouselItem key={idx} className="h-full">
                <img
                  src={img}
                  alt="Social media background"
                  className="w-full h-full object-cover object-center min-h-[400px] max-h-[600px] opacity-80"
                  draggable={false}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Overlay for darkening the images */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </Carousel>
        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
          <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">Welcome to Client Nest</h1>
          <p className="text-2xl text-white/90 mb-8 drop-shadow">The all-in-one platform to manage, analyze, and grow your social media presence.</p>
          <Button size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/register')}>Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gradient-to-r from-white to-blue-50">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Client Nest?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                {feature.icon}
                <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Supported Social Media Platforms */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Supported Platforms</h2>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex flex-col items-center">
              {platform.icon}
              <span className="mt-2 text-lg font-medium">{platform.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gradient-to-r from-white to-indigo-50">
        <h2 className="text-3xl font-bold text-center mb-10">Simple, Transparent Pricing</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="flex flex-col items-center p-8 border-2 border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Free</CardTitle>
              <div className="text-4xl font-bold mb-2">$0</div>
              <div className="text-muted-foreground mb-4">Perfect for individuals just getting started.</div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2 text-center">
              <div>✔️ 1 Social Account</div>
              <div>✔️ Basic Analytics</div>
              <div>✔️ Limited Scheduling</div>
            </CardContent>
            <Button variant="outline" className="mt-6 w-full" onClick={() => navigate('/register')}>Get Started</Button>
          </Card>
          {/* Pro Plan */}
          <Card className="flex flex-col items-center p-8 border-2 border-primary shadow-lg scale-105">
            <CardHeader className="text-center">
              <Badge className="mb-2 bg-primary text-white">Most Popular</Badge>
              <CardTitle className="text-2xl mb-2">Pro</CardTitle>
              <div className="text-4xl font-bold mb-2">$19<span className="text-lg font-normal">/mo</span></div>
              <div className="text-muted-foreground mb-4">For growing teams and businesses.</div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2 text-center">
              <div>✔️ Up to 10 Social Accounts</div>
              <div>✔️ Advanced Analytics</div>
              <div>✔️ Unlimited Scheduling</div>
              <div>✔️ Priority Support</div>
            </CardContent>
            <Button className="mt-6 w-full" onClick={() => navigate('/register')}>Start Pro</Button>
          </Card>
          {/* Enterprise Plan */}
          <Card className="flex flex-col items-center p-8 border-2 border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
              <div className="text-4xl font-bold mb-2">Custom</div>
              <div className="text-muted-foreground mb-4">For large organizations with advanced needs.</div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2 text-center">
              <div>✔️ Unlimited Social Accounts</div>
              <div>✔️ Custom Integrations</div>
              <div>✔️ Dedicated Account Manager</div>
              <div>✔️ SLA & Premium Support</div>
            </CardContent>
            <Button variant="outline" className="mt-6 w-full" onClick={() => navigate('/register')}>Contact Sales</Button>
          </Card>
        </div>
        <div className="text-center mt-8">
          <a href="/pricing" className="inline-block text-primary font-semibold hover:underline hover:text-blue-600 transition-colors duration-200 text-lg">
            See detailed pricing &rarr;
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover:shadow-lg transition-shadow flex flex-col justify-between h-full items-center text-center p-6">
              <img src={t.img} alt={t.name} className="w-32 h-32 rounded-full mb-4 object-cover" />
              <CardHeader className="p-0">
                <CardTitle className="text-lg mb-2">{t.name}</CardTitle>
                <span className="inline-block text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full mb-4">{t.role}</span>
              </CardHeader>
              <CardContent className="text-muted-foreground italic p-0">“{t.feedback}”</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to grow your social media?</h2>
        <p className="text-lg mb-8">Join Client Nest today and take your social presence to the next level.</p>
        <Button size="lg" variant="secondary" className="text-lg px-8 py-4" onClick={() => navigate('/register')}>Sign Up Now</Button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company Bio */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/ChatGPT_Image_Jun_21__2025__03_07_05_PM-removebg-preview.png" 
                  alt="Client Nest Logo" 
                  className="h-8 w-8 object-contain rounded-lg"
                />
                <h3 className="text-lg font-semibold">Client Nest</h3>
              </div>
              <p className="text-muted-foreground">
                The all-in-one platform to manage, analyze, and grow your social media presence.
              </p>
            </div>
            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Company</h4>
              <ul className="mt-4 space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-base text-muted-foreground hover:text-primary">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Legal</h4>
              <ul className="mt-4 space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-base text-muted-foreground hover:text-primary">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Socials */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h4>
              <div className="mt-4 flex space-x-6">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Client Nest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 