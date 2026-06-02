/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Star, 
  Menu, 
  X, 
  ChevronDown,
  CreditCard,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from './lib/utils';

// Types
interface Vehicle {
  id: string;
  name: string;
  type: string;
  category: string;
  price: string;
  image: string;
  features: string[];
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

// Data
const FLEET: Vehicle[] = [
  {
    id: '1',
    name: '2021 Chevrolet Malibu – Black',
    type: 'Sedan',
    category: 'ECONOMY',
    price: '$45',
    image: 'https://i.imgur.com/i3GlSPP.png',
    features: ['5 Seats', 'Bluetooth', 'Fuel Efficient']
  },
  {
    id: '2',
    name: '2021 Chevrolet Malibu – White',
    type: 'Sedan',
    category: 'ECONOMY',
    price: '$45',
    image: 'https://i.imgur.com/dEBOCqW.png',
    features: ['5 Seats', 'Bluetooth', 'Fuel Efficient']
  },
  {
    id: '3',
    name: '2012 Honda Accord – Greyish',
    type: 'Sedan',
    category: 'ECONOMY',
    price: '$35',
    image: 'https://i.imgur.com/mtbtPhC.png',
    features: ['5 Seats', 'Reliable', 'Spacious']
  },
  {
    id: '4',
    name: '2013 Nissan Altima – Greenish',
    type: 'Sedan',
    category: 'ECONOMY',
    price: '$30',
    image: 'https://i.imgur.com/0GDZTlX.png',
    features: ['5 Seats', 'Clean Interior', 'A/C']
  },
  {
    id: '5',
    name: '2020 Nissan Altima – Black',
    type: 'Sedan',
    category: 'ECONOMY',
    price: '$50',
    image: 'https://i.imgur.com/2Xjdwy3.png',
    features: ['5 Seats', 'Backup Camera', 'Apple CarPlay']
  },
  {
    id: '6',
    name: '2017 Honda Civic – Black',
    type: 'Sedan',
    category: 'ECONOMY',
    price: '$45',
    image: 'https://i.imgur.com/rAg6EYo.png',
    features: ['5 Seats', 'Sport Styling', 'Eco Mode']
  },
  {
    id: '7',
    name: '2019 Nissan Sentra – White',
    type: 'Sedan',
    category: 'ECONOMY',
    price: '$45',
    image: 'https://i.imgur.com/JJXpgbb.png',
    features: ['5 Seats', 'Bluetooth', 'Keyless Entry']
  },
  {
    id: '8',
    name: '2016 Dodge Challenger – Grey',
    type: 'Sports Coupe',
    category: 'LUXURY',
    price: '$85',
    image: 'https://i.imgur.com/5Fgkf17.png',
    features: ['4 Seats', 'V6 Engine', 'Sport Suspension']
  },
  {
    id: '9',
    name: '2019 Dodge Journey – Red',
    type: 'SUV',
    category: 'SUV',
    price: '$65',
    image: 'https://i.imgur.com/Y48zleT.png',
    features: ['7 Seats', 'Fold-flat Seats', 'Rear AC']
  },
  {
    id: '10',
    name: '2008 Mazda CX-9 – Red',
    type: 'SUV',
    category: 'SUV',
    price: '$50',
    image: 'https://i.imgur.com/Y48zleT.png',
    features: ['7 Seats', 'V6 Engine', 'All-Wheel Drive']
  },
  {
    id: '11',
    name: '2016 Dodge Grand Caravan – Black',
    type: 'Minivan',
    category: 'SUV',
    price: '$65',
    image: 'https://i.imgur.com/i3GlSPP.png',
    features: ['7 Seats', 'Stow \'n Go', 'Rear DVD']
  },
  {
    id: '12',
    name: '2017 Kia Sedona – Metallic Brown',
    type: 'Minivan',
    category: 'SUV',
    price: '$70',
    image: 'https://i.imgur.com/IUjLXqi.png',
    features: ['7 Seats', 'Slide-n-Stow', 'Dual Doors']
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Jordan Smith',
    role: 'Business Traveler',
    content: "The best experience I've had with Philly Car Rentals. The Escalade was pristine and the digital verification process was incredibly fast.",
    avatar: 'https://i.pravatar.cc/150?u=jordan'
  },
  {
    id: 2,
    name: 'Sarah Evans',
    role: 'Local Resident',
    content: 'Flexible pickups and local service make Philly Car Rentals my go-to choice every time I need a weekend getaway car.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  }
];

const FAQS = [
  {
    question: "What items do I need for Philly Car Rentals?",
    answer: "To rent from us, you'll need a valid driver's license, proof of insurance, and a credit card in your name. All documents can be uploaded during our fast digital approval process."
  },
  {
    question: "How does your Customer Verification process work?",
    answer: "We use secure, state-of-the-art verification to ensure safety for both parties. You simply upload your ID and basic info, and our system handles the rest. For detailed policy info, check our Verification Policy."
  },
  {
    question: "Do you offer delivery in Philadelphia?",
    answer: "Yes! We offer flexible pickup and delivery options throughout the Philadelphia area, including PHL Airport and major hotels."
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'LUXURY' | 'SUV' | 'ECONOMY'>('ALL');
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  // Integrated Car Rental Form & Driver Credentials Verification States
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('2026-06-02');
  const [pickupHour, setPickupHour] = useState('14');
  const [pickupMinute, setPickupMinute] = useState('46');
  
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [dropoffDate, setDropoffDate] = useState('2026-06-02');
  const [dropoffHour, setDropoffHour] = useState('14');
  const [dropoffMinute, setDropoffMinute] = useState('46');

  const [selectedVehicleId, setSelectedVehicleId] = useState('1'); // Defaults to Escalade
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  // Personal Info
  const [personalPrefix, setPersonalPrefix] = useState('Mr.');
  const [personalFirstName, setPersonalFirstName] = useState('');
  const [personalLastName, setPersonalLastName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  
  // Birth Date Selectors
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // DMV & Verification States
  const [driversLicenseNum, setDriversLicenseNum] = useState('');
  const [driversLicenseState, setDriversLicenseState] = useState('PA');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insurancePolicyNum, setInsurancePolicyNum] = useState('');

  // File upload simulation records
  const [licenseUploaded, setLicenseUploaded] = useState<string | null>(null);
  const [insuranceUploaded, setInsuranceUploaded] = useState<string | null>(null);
  const [licenseUploading, setLicenseUploading] = useState(false);
  const [insuranceUploading, setInsuranceUploading] = useState(false);
  const [licenseUploadProgress, setLicenseUploadProgress] = useState(0);
  const [insuranceUploadProgress, setInsuranceUploadProgress] = useState(0);

  // Submission Status
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingStatusStep, setBookingStatusStep] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingConfCode, setBookingConfCode] = useState('');

  // Simulated high-fidelity file upload
  const simulateFileUpload = (type: 'license' | 'insurance', filename: string) => {
    if (type === 'license') {
      setLicenseUploading(true);
      setLicenseUploadProgress(0);
      const interval = setInterval(() => {
        setLicenseUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLicenseUploaded(filename);
            setLicenseUploading(false);
            return 100;
          }
          return prev + 25;
        });
      }, 150);
    } else {
      setInsuranceUploading(true);
      setInsuranceUploadProgress(0);
      const interval = setInterval(() => {
        setInsuranceUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setInsuranceUploaded(filename);
            setInsuranceUploading(false);
            return 100;
          }
          return prev + 25;
        });
      }, 150);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupLocation || !dropoffLocation) {
      alert('Please select both a Pick-up and Drop-off location.');
      return;
    }
    if (!personalFirstName || !personalLastName || !personalEmail || !personalPhone) {
      alert('Please fill out all required personal information fields.');
      return;
    }
    
    // Format validator for phone: check we have numbers
    const cleanedPhone = personalPhone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      alert('Please enter a valid 10-digit Phone Number in format (000) 000-0000.');
      return;
    }

    if (!birthMonth || !birthDay || !birthYear) {
      alert('Please select your complete date of birth.');
      return;
    }

    setSubmittingBooking(true);
    const steps = [
      'Establishing digital socket with Philadelphia DMV database...',
      'Verifying identity matched to birth registration records...',
      'Bundling full rental reservation options and chosen Extras...',
      'Packaging complete verified files with secure renter metadata...',
      'Directing secure dispatcher routing to license4booking@gmail.com...',
      'Finalizing booking confirmation reference code...'
    ];

    let stepIdx = 0;
    setBookingStatusStep(steps[stepIdx]);

    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setBookingStatusStep(steps[stepIdx]);
      } else {
        clearInterval(interval);
        const randomCode = 'PCR-RES-' + Math.floor(100000 + Math.random() * 900000);
        setBookingConfCode(randomCode);
        setSubmittingBooking(false);
        setBookingSubmitted(true);
      }
    }, 700);
  };

  const handleExtraToggle = (extraName: string) => {
    setSelectedExtras((prev) => 
      prev.includes(extraName) 
        ? prev.filter((item) => item !== extraName) 
        : [...prev, extraName]
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Philly Car Rentals | Premium Car Rental Philadelphia</title>
        <meta name="description" content="Experience the best Philly Car Rentals. Luxury SUVs, economy cars, and fast digital approval. Book your Philadelphia car rental today." />
        <link rel="canonical" href="https://phillycarrentals.com" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CarRentalBusiness",
              "name": "Philly Car Rentals",
              "image": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800",
              "@id": "https://phillycarrentals.com",
              "url": "https://phillycarrentals.com",
              "telephone": "+12674036640",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3041 Vare Ave B",
                "addressLocality": "Philadelphia",
                "addressRegion": "PA",
                "postalCode": "19145",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 39.9272,
                "longitude": -75.1872
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "20:00"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.imgur.com/4dpOZXM.png" 
              alt="Philly Auto Sales & Rentals Logo" 
              className="h-12 md:h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#vehicles" className="text-sm font-semibold hover:text-philly-red transition-colors">Vehicles</a>
            <a href="#process" className="text-sm font-semibold hover:text-philly-red transition-colors">How it works</a>
            <a href="#safety" className="text-sm font-semibold hover:text-philly-red transition-colors">Safety</a>
            <a href="#location" className="text-sm font-semibold hover:text-philly-red transition-colors">Location</a>
            <a href="#faq" className="text-sm font-semibold hover:text-philly-red transition-colors">FAQ</a>
            <button 
              onClick={() => setIsReservationModalOpen(true)}
              className="btn-primary py-2 px-5 text-sm h-fit cursor-pointer"
            >
              Reserve Now
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-philly-navy pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-bold">
              <a href="#vehicles" onClick={() => setIsMenuOpen(false)}>Vehicles</a>
              <a href="#process" onClick={() => setIsMenuOpen(false)}>How it works</a>
              <a href="#safety" onClick={() => setIsMenuOpen(false)}>Safety</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)}>Location</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsReservationModalOpen(true);
                }}
                className="btn-primary w-full text-center py-4 rounded-full"
              >
                Reserve Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/0GDZTlX.png" 
            alt="Luxury Philly Car Rentals Hero"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-philly-navy via-philly-navy/90 to-philly-navy/30" />
        </div>

        <div className="section-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-philly-red/10 border border-philly-red/20 text-philly-red text-xs font-bold uppercase tracking-wider mb-6">
              <Star className="w-3 h-3 fill-current" />
              #1 Choice for Philly Car Rentals
            </div>
            
            <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1]">
              Premium & <span className="text-philly-red">Economy</span> Cars Available
            </h1>
            <p className="text-lg md:text-xl text-philly-metal mb-10 leading-relaxed max-w-lg">
              Experience Philadelphia with Philly Car Rentals. From daily fuel-efficient economy options to pristine high-performance luxury, we have the perfect ride for any budget. Get approved in minutes!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#vehicles" className="btn-primary gap-2">
                View Available Rentals <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#process" className="btn-secondary">
                Our Process
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-xs text-philly-metal uppercase tracking-widest">Vehicles</p>
              </div>
              <div>
                <p className="text-2xl font-bold">2.5k+</p>
                <p className="text-xs text-philly-metal uppercase tracking-widest">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.9/5</p>
                <div className="flex text-philly-red">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white/5 py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl mb-4"
            >
              Why Choose <span className="text-philly-red font-black">Philly Car Rentals</span>?
            </motion.h2>
            <p className="text-philly-metal max-w-2xl mx-auto">
              We've redesigned the rental experience to be faster, safer, and more transparent for the Philadelphia community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <CreditCard className="w-8 h-8" />, 
                title: "Affordable Rentals", 
                desc: "Competitive pricing with no hidden fees. Premium luxury at fair rates." 
              },
              { 
                icon: <Clock className="w-8 h-8" />, 
                title: "Fast Approval", 
                desc: "Get approved in minutes through our sleek digital verification portal." 
              },
              { 
                icon: <MapPin className="w-8 h-8" />, 
                title: "Flexible Pickup", 
                desc: "Collect your car from our central Vare Ave location or request delivery." 
              },
              { 
                icon: <UserCheck className="w-8 h-8" />, 
                title: "Verified Renters", 
                desc: "A secure community focused on trust and high-quality vehicle maintenance." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-philly-navy border border-white/5 hover:border-philly-red/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-philly-red/10 flex items-center justify-center text-philly-red mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-sm text-philly-metal leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Options */}
      <section id="vehicles" className="py-24">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4">Elite Fleet Selection</h2>
              <p className="text-philly-metal">From daily rentals to luxury showstoppers.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['ALL', 'LUXURY', 'SUV', 'ECONOMY'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all uppercase cursor-pointer border",
                    activeFilter === filter 
                      ? "bg-philly-red text-white border-philly-red shadow-lg shadow-philly-red/25" 
                      : "bg-white/5 text-philly-metal border-white/10 hover:border-white/20 hover:text-white"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FLEET.filter(car => activeFilter === 'ALL' || car.category === activeFilter).map((car) => (
              <motion.div 
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/5 rounded-[40px] overflow-hidden border border-white/10"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-philly-navy to-transparent z-10 opacity-70" />
                  <img 
                    src={car.image} 
                    alt={`${car.name} - Philly Car Rentals`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 relative z-20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-philly-red text-xs font-bold uppercase tracking-widest mb-1">{car.type}</p>
                      <h4 className="text-2xl text-white">{car.name}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{car.price}</p>
                      <p className="text-[10px] text-philly-metal uppercase font-bold uppercase">per day</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {car.features.map(f => (
                      <span key={f} className="text-[10px] px-2 py-1 rounded bg-white/5 text-philly-metal border border-white/10">{f}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedVehicleId(car.id);
                      setIsReservationModalOpen(true);
                    }}
                    className="btn-secondary w-full group-hover:bg-philly-red group-hover:border-philly-red transition-all cursor-pointer"
                  >
                    Reserve This Vehicle
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section id="process" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-philly-red/5 blur-[120px] -z-10" />
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
                Get Driving in <span className="text-philly-red italic">4 Simple Steps</span>
              </h2>
              <div className="space-y-12">
                {[
                  { title: "Choose Vehicle", desc: "Select from our premium Philly Car Rentals fleet including economy, luxury, and sport options." },
                  { title: "Upload Documents", desc: "Submit your license and insurance through our secure, encrypted digital portal." },
                  { title: "Get Approved", desc: "Our team reviews your submission instantly to ensure a smooth pickup process." },
                  { title: "Start Driving", desc: "Collect your keys and explore Philadelphia. Experience total freedom on the road." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-philly-red flex items-center justify-center text-philly-red font-bold group-hover:bg-philly-red group-hover:text-white transition-all">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl mb-2">{step.title}</h4>
                      <p className="text-philly-metal leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-tr from-philly-red/20 to-transparent rounded-[60px] absolute inset-0 rotate-6" />
              <img 
                src="https://i.imgur.com/Y48zleT.png" 
                alt="Rental Process at Philly Auto"
                className="relative z-10 w-full h-full object-cover rounded-[60px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-philly-navy border border-white/10 p-6 rounded-3xl shadow-2xl z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Fast Approval</p>
                    <p className="text-xs text-philly-metal">Average time: 12 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification & Safety */}
      <section id="safety" className="bg-philly-navy py-24 relative">
        <div className="section-container border border-white/5 bg-white/5 rounded-[40px] p-8 md:p-20 overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <ShieldCheck className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-3xl md:text-5xl mb-6">Verification & Safety Protocol</h3>
            <p className="text-philly-metal text-lg mb-10 leading-relaxed">
              At **Philly Car Rentals**, your security is our priority. We maintain strict protocols and utilize advanced systems to ensure a premium experience for everyone. Our verification process is streamlined for your convenience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { title: "ID Verification", desc: "Military-grade encryption for all personal identification documents." },
                { title: "Insurance Check", desc: "Real-time insurance verification for seamless liability management." },
                { title: "Secure Rentals", desc: "GPS-monitored fleet and 24/7 roadside assistance included." },
                { title: "Fraud Prevention", desc: "Advanced identity matching to protect against unauthorized usage." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <ShieldCheck className="w-6 h-6 text-philly-red flex-shrink-0" />
                  <div>
                    <h5 className="font-bold mb-1">{item.title}</h5>
                    <p className="text-sm text-philly-metal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a 
              href="https://share.google/ZvjE7DOjcZYwIshdY" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-philly-red font-bold hover:underline"
            >
              Learn about our Customer Verification Policy <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Car Rental Reservation & Credentials Portal Modal */}
      <AnimatePresence>
        {isReservationModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-philly-navy/95 backdrop-blur-xl"
          >
            <div className="min-h-screen py-12 md:py-24 relative">
              {/* Close Button */}
              <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50">
                <button 
                  onClick={() => setIsReservationModalOpen(false)}
                  className="bg-white/10 hover:bg-philly-red text-white p-3 md:px-6 md:py-3 rounded-full transition-all cursor-pointer flex items-center gap-2 border border-white/20 hover:border-philly-red"
                >
                  <X className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider hidden md:block">Close Window</span>
                </button>
              </div>

              <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-philly-red/5 blur-[150px] rounded-full pointer-events-none" />
              <div className="section-container relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-philly-red/10 border border-philly-red/20 text-philly-red text-xs font-bold uppercase tracking-wider mb-4">
              <Car className="w-4 h-4" />
              Fast-Track Reservation System
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 font-display">
              Car Rental <span className="text-philly-red">&</span> Verification Form
            </h2>
            <p className="text-philly-metal max-w-2xl mx-auto text-base">
              Submit your vehicle reservation and driver credentials below. Premium & Economy cars available. All documents are securely compiled and dispatched to <strong className="text-white hover:text-philly-red transition-colors">license4booking@gmail.com</strong> for real-time validation and swift key hand-off!
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {bookingSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/5 border border-green-500/20 rounded-[40px] p-8 md:p-16 text-center backdrop-blur-md relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl" />
                  
                  {/* Embedded Logo */}
                  <div className="mb-6 flex justify-center">
                    <img 
                      src="https://i.imgur.com/4dpOZXM.png" 
                      alt="Philly Auto Sales & Rentals Logo" 
                      className="h-16 w-auto object-contain bg-philly-navy/60 px-6 py-2 rounded-2xl border border-white/5"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-3 text-white">Rental Application Dispatched!</h3>
                  <p className="text-philly-metal max-w-xl mx-auto mb-8 text-sm">
                    Thank you, <strong className="text-white">{personalPrefix} {personalFirstName} {personalLastName}</strong>. Your comprehensive car rental reservation details and driver credentials have been compiled and sent to <span className="text-philly-red font-semibold underline">license4booking@gmail.com</span> for validation.
                  </p>

                  <div className="inline-block bg-philly-navy border border-white/10 px-8 py-6 rounded-3xl mb-8 text-center">
                    <span className="text-xs text-philly-metal uppercase tracking-widest block mb-1">Booking Reference Code</span>
                    <span className="font-mono text-2xl md:text-3xl font-extrabold text-green-400 tracking-wider">
                      {bookingConfCode}
                    </span>
                    <span className="block text-[10px] text-philly-metal/80 mt-1">Pending dispatch verification</span>
                  </div>

                  {/* Summary Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto border-t border-b border-white/5 py-8 text-sm">
                    <div>
                      <span className="text-xs text-philly-metal block">Selected Vehicle</span>
                      <strong className="text-white">
                        {FLEET.find(c => c.id === selectedVehicleId)?.name || 'Pristine Vehicle Option'} 
                      </strong>
                    </div>
                    <div>
                      <span className="text-xs text-philly-metal block font-sans">Contact Email</span>
                      <strong className="text-white">{personalEmail}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-philly-metal block">Pick-up Logistics</span>
                      <strong className="text-white">
                        {pickupLocation} on {pickupDate} ({pickupHour}:{pickupMinute})
                      </strong>
                    </div>
                    <div>
                      <span className="text-xs text-philly-metal block">Drop-off Logistics</span>
                      <strong className="text-white">
                        {dropoffLocation} on {dropoffDate} ({dropoffHour}:{dropoffMinute})
                      </strong>
                    </div>
                    {selectedExtras.length > 0 && (
                      <div className="md:col-span-2">
                        <span className="text-xs text-philly-metal block">Selected Premium Extras</span>
                        <span className="text-philly-red font-semibold">{selectedExtras.join(', ')}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-philly-metal block">Date of Birth</span>
                      <strong className="text-white">{birthMonth} {birthDay}, {birthYear}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-philly-metal block">Document Files Attached</span>
                      <span className="text-green-400 font-mono text-xs">
                        {licenseUploaded ? '✓ Driver License Linked' : ''} 
                        {insuranceUploaded ? ' | ✓ Insurance Policy Linked' : ''}
                      </span>
                    </div>
                  </div>

                  <p className="mt-8 text-xs text-philly-metal">
                    A confirmation check message has been initiated. If you need immediate assistance, please call us on <a href="tel:+12674036640" className="text-philly-red underline font-bold">+12674036640</a>.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <button 
                      onClick={() => {
                        // Reset form
                        setBookingSubmitted(false);
                        setPickupLocation('');
                        setDropoffLocation('');
                        setPersonalFirstName('');
                        setPersonalLastName('');
                        setPersonalEmail('');
                        setPersonalPhone('');
                        setBirthMonth('');
                        setBirthDay('');
                        setBirthYear('');
                        setDriversLicenseNum('');
                        setInsuranceProvider('');
                        setInsurancePolicyNum('');
                        setLicenseUploaded(null);
                        setInsuranceUploaded(null);
                        setSelectedExtras([]);
                      }}
                      className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10 cursor-pointer text-sm"
                    >
                      Book Another Ride
                    </button>
                    <a 
                      href="#location"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('location');
                      }}
                      className="btn-primary"
                    >
                      View Pickup Location
                    </a>
                  </div>
                </motion.div>
              ) : submittingBooking ? (
                <motion.div 
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-white/10 rounded-[40px] p-16 text-center flex flex-col items-center justify-center min-h-[500px]"
                >
                  <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-full border-4 border-philly-red/20 border-t-philly-red animate-spin" />
                    <ShieldCheck className="w-8 h-8 text-philly-red absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Transmitting Application Bundle</h3>
                  <p className="text-philly-red font-mono text-sm tracking-wide bg-philly-red/5 px-6 py-3 rounded-full border border-philly-red/10 max-w-lg mx-auto">
                    {bookingStatusStep}
                  </p>
                  <p className="text-philly-metal text-xs mt-8 max-w-sm">
                    Connecting SSL Tunnel payload directly to verification servers.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleBookingSubmit}
                  className="bg-white/5 border border-white/10 rounded-[40px] p-6 md:p-12 backdrop-blur-sm relative"
                >
                  {/* Subtle Logo in top-right of form container for maximum aesthetic coolness */}
                  <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">Philadelphia Direct Booking Form</h3>
                      <p className="text-xs text-philly-metal">Premium Vehicles & Budget Economy Fleet Available</p>
                    </div>
                    <img 
                      src="https://i.imgur.com/4dpOZXM.png" 
                      alt="Philly Auto Sales & Rentals Logo" 
                      className="h-10 md:h-12 w-auto object-contain bg-philly-navy/80 px-4 py-2 rounded-xl border border-white/5"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left & Center Form Columns */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* Section 1: Pickup and Dropoff Logistics */}
                      <div>
                        <h4 className="text-sm uppercase font-bold tracking-wider text-philly-red mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-philly-red" />
                          1. Rental Trip Logistics
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Pick-up Location */}
                          <div>
                            <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-2">Pick-up Location *</label>
                            <select 
                              required 
                              value={pickupLocation}
                              onChange={(e) => setPickupLocation(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm font-sans"
                            >
                              <option value="">Please Select</option>
                              <option value="Center City Hub (3041 Vare Ave B)">Center City Hub (3041 Vare Ave B)</option>
                              <option value="Philadelphia Int'l Airport (PHL) Terminal Pick-up">Philadelphia Int'l Airport (PHL) Terminal Pick-up</option>
                              <option value="30th Street Amtrak Trains Terminal">30th Street Amtrak Trains Terminal</option>
                              <option value="South Philadelphia Depot Yard">South Philadelphia Depot Yard</option>
                            </select>
                          </div>

                          {/* Drop-off Location */}
                          <div>
                            <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-2">Drop-off Location *</label>
                            <select 
                              required 
                              value={dropoffLocation}
                              onChange={(e) => setDropoffLocation(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm font-sans"
                            >
                              <option value="">Please Select</option>
                              <option value="Center City Hub (3041 Vare Ave B)">Center City Hub (3041 Vare Ave B)</option>
                              <option value="Philadelphia Int'l Airport (PHL) Terminal Pick-up">Philadelphia Int'l Airport (PHL) Terminal Pick-up</option>
                              <option value="30th Street Amtrak Trains Terminal">30th Street Amtrak Trains Terminal</option>
                              <option value="South Philadelphia Depot Yard">South Philadelphia Depot Yard</option>
                            </select>
                          </div>
                        </div>

                        {/* Dates and Times Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          {/* Pick-up Date and Time */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-1">Pick-up Date</label>
                              <input 
                                type="date"
                                required
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none text-xs font-sans"
                              />
                              <span className="text-[10px] text-philly-metal/85 block mt-1">Date Format</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              <div>
                                <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-1">Hour</label>
                                <select 
                                  value={pickupHour}
                                  onChange={(e) => setPickupHour(e.target.value)}
                                  className="w-full px-2 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white text-xs font-mono"
                                >
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-1">Minutes</label>
                                <select 
                                  value={pickupMinute}
                                  onChange={(e) => setPickupMinute(e.target.value)}
                                  className="w-full px-2 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white text-xs font-mono"
                                >
                                  {['00','15','30','45','46'].map(v => (
                                    <option key={v} value={v}>{v}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Drop-off Date and Time */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-1">Drop-off Date</label>
                              <input 
                                type="date"
                                required
                                value={dropoffDate}
                                onChange={(e) => setDropoffDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none text-xs font-sans"
                              />
                              <span className="text-[10px] text-philly-metal/85 block mt-1">Date Format</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              <div>
                                <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-1">Hour</label>
                                <select 
                                  value={dropoffHour}
                                  onChange={(e) => setDropoffHour(e.target.value)}
                                  className="w-full px-2 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white text-xs font-mono"
                                >
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-1">Minutes</label>
                                <select 
                                  value={dropoffMinute}
                                  onChange={(e) => setDropoffMinute(e.target.value)}
                                  className="w-full px-2 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white text-xs font-mono"
                                >
                                  {['00','15','30','45','46'].map(v => (
                                    <option key={v} value={v}>{v}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Fleet Category Selection */}
                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm uppercase font-bold tracking-wider text-philly-red mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-philly-red" />
                          2. Form Select Vehicle & Extras
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-2">Car Type (Premium & Economy)</label>
                            <select 
                              value={selectedVehicleId}
                              onChange={(e) => setSelectedVehicleId(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm font-sans"
                            >
                              {FLEET.map(c => (
                                <option key={c.id} value={c.id}>
                                  {c.category === 'ECONOMY' ? ' [Economy] ' : ' [Premium] '} {c.name} ({c.price}/day)
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Extras Checklist */}
                          <div>
                            <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-3">Extras</label>
                            <div className="space-y-2 text-sm bg-philly-navy/40 p-4 rounded-xl border border-white/5">
                              {[
                                "GPS Satellite Navigation Systems (+$10/day)",
                                "Premium Toddler Safety Seat (+$15/day)",
                                "EZ-Pass Turnpike Toll Transponder (+$8/day)",
                                "Prepaid Refuel Charge Package (+$45/charge)",
                                "Roadside Recovery Plus Warranty (+$12/day)"
                              ].map((extraOption) => {
                                const isChecked = selectedExtras.includes(extraOption);
                                return (
                                  <label key={extraOption} className="flex items-start gap-2.5 text-xs text-philly-metal hover:text-white transition-colors cursor-pointer select-none">
                                    <input 
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleExtraToggle(extraOption)}
                                      className="rounded border-white/15 bg-white/5 text-philly-red focus:ring-philly-red mt-0.5"
                                    />
                                    <span>{extraOption}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Personal Information */}
                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm uppercase font-bold tracking-wider text-philly-red mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-philly-red" />
                          3. Personal Information
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                          {/* Prefix */}
                          <div className="md:col-span-3">
                            <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-2">Prefix</label>
                            <select
                              value={personalPrefix}
                              onChange={(e) => setPersonalPrefix(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm"
                            >
                              <option value="Mr.">Mr.</option>
                              <option value="Ms.">Ms.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Dr.">Dr.</option>
                            </select>
                          </div>

                          {/* First name */}
                          <div className="md:col-span-4">
                            <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-2">First Name *</label>
                            <input 
                              type="text"
                              required
                              placeholder="First Name"
                              value={personalFirstName}
                              onChange={(e) => setPersonalFirstName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm font-sans"
                            />
                          </div>

                          {/* Last name */}
                          <div className="md:col-span-5">
                            <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-2">Last Name *</label>
                            <input 
                              type="text"
                              required
                              placeholder="Last Name"
                              value={personalLastName}
                              onChange={(e) => setPersonalLastName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm font-sans"
                            />
                          </div>
                        </div>

                        {/* Email & Phone numbers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal">E-mail *</label>
                              <span className="text-[10px] text-philly-metal font-mono lowercase">ex: myname@example.com</span>
                            </div>
                            <input 
                              type="email"
                              required
                              placeholder="example@example.com"
                              value={personalEmail}
                              onChange={(e) => setPersonalEmail(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm font-sans"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal">Phone Number *</label>
                              <span className="text-[10px] text-philly-metal/85 font-sans">Format: (000) 000-0000</span>
                            </div>
                            <input 
                              type="tel"
                              required
                              placeholder="(000) 000-0000"
                              value={personalPhone}
                              onChange={(e) => {
                                // Simple phone layout formatting (000) 000-0000
                                let val = e.target.value.replace(/\D/g, '');
                                if (val.length > 10) val = val.slice(0, 10);
                                if (val.length > 6) {
                                  val = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
                                } else if (val.length > 3) {
                                  val = `(${val.slice(0, 3)}) ${val.slice(3)}`;
                                } else if (val.length > 0) {
                                  val = `(${val}`;
                                }
                                setPersonalPhone(val);
                              }}
                              className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none transition-colors text-sm font-sans"
                            />
                          </div>
                        </div>

                        {/* Birth Date Selector Grid */}
                        <div className="mt-6">
                          <label className="block text-xs uppercase font-bold tracking-wider text-philly-metal mb-2">Birth Date *</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Month Select */}
                            <div>
                              <select
                                required
                                value={birthMonth}
                                onChange={(e) => setBirthMonth(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none text-xs"
                              >
                                <option value="">Please select a month</option>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                                  <option key={m} value={m}>{m}</option>
                                ))}
                              </select>
                              <span className="text-[10px] text-philly-metal/85 block mt-1">Month</span>
                            </div>

                            {/* Day Select */}
                            <div>
                              <select
                                required
                                value={birthDay}
                                onChange={(e) => setBirthDay(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none text-xs"
                              >
                                <option value="">Please select a day</option>
                                {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(d => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                              </select>
                              <span className="text-[10px] text-philly-metal/85 block mt-1">Day</span>
                            </div>

                            {/* Year Select */}
                            <div>
                              <select
                                required
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:border-philly-red focus:outline-none text-xs"
                              >
                                <option value="">Please select a year</option>
                                {Array.from({ length: 70 }, (_, i) => String(2008 - i)).map(y => (
                                  <option key={y} value={y}>{y}</option>
                                ))}
                              </select>
                              <span className="text-[10px] text-philly-metal/85 block mt-1">Year</span>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Right Extra Column: Document File Attachment & Verification Verification Details */}
                    <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-white/10 lg:pl-6">
                      <h4 className="text-sm uppercase font-bold tracking-wider text-philly-red mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-philly-red" />
                        4. Renter Verification Check
                      </h4>

                      <div>
                        <label className="block text-[11px] uppercase font-bold tracking-wider text-philly-metal mb-1.5">Driver's License Number</label>
                        <input 
                          type="text"
                          placeholder="DL-2041289"
                          value={driversLicenseNum}
                          onChange={(e) => setDriversLicenseNum(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:outline-none text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase font-bold tracking-wider text-philly-metal mb-1.5">License State</label>
                          <input 
                            type="text"
                            maxLength={2}
                            value={driversLicenseState}
                            onChange={(e) => setDriversLicenseState(e.target.value.toUpperCase())}
                            className="w-full px-3 py-2.5 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:outline-none text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-bold tracking-wider text-philly-metal mb-1.5">Insurance Co</label>
                          <input 
                            type="text"
                            placeholder="GEICO / State Farm"
                            value={insuranceProvider}
                            onChange={(e) => setInsuranceProvider(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-philly-navy/80 border border-white/10 text-white focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      {/* License Upload Box */}
                      <div className="pt-2">
                        <span className="block text-[10px] uppercase font-bold tracking-widest text-philly-metal mb-2">Driver's License Photo (Front)</span>
                        <div 
                          onClick={() => {
                            const combinedName = (personalFirstName || personalLastName) 
                              ? `${personalFirstName}_${personalLastName}` 
                              : 'RENTER';
                            simulateFileUpload('license', `DL_FRONT_${combinedName.toUpperCase()}.JPG`);
                          }}
                          className={cn(
                            "border border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[110px]",
                            licenseUploaded 
                              ? "border-green-500/40 bg-green-500/5 hover:bg-green-500/10" 
                              : "border-white/10 hover:border-philly-red/40 hover:bg-white/5"
                          )}
                        >
                          {licenseUploading ? (
                            <div className="w-full">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] text-philly-metal animate-pulse">Uploading file...</span>
                                <span className="text-[10px] text-philly-red font-bold">{licenseUploadProgress}%</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-philly-red transition-all duration-150" style={{ width: `${licenseUploadProgress}%` }} />
                              </div>
                            </div>
                          ) : licenseUploaded ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle2 className="w-6 h-6 text-green-400 mb-1" />
                              <span className="text-[11px] font-semibold text-white truncate max-w-[170px]">{licenseUploaded}</span>
                              <span className="text-[9px] text-green-400 uppercase font-bold">Successfully Verified</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <UserCheck className="w-6 h-6 text-philly-metal mb-1.5" />
                              <span className="text-xs font-bold text-white mb-0.5">Attach License</span>
                              <span className="text-[10px] text-philly-metal">Click to secure-upload JPG/PNG</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Insurance Policy Upload Box */}
                      <div>
                        <span className="block text-[10px] uppercase font-bold tracking-widest text-philly-metal mb-2">Auto Insurance Proof</span>
                        <div 
                          onClick={() => {
                            const combinedName = (personalFirstName || personalLastName) 
                              ? `${personalFirstName}_${personalLastName}` 
                              : 'RENTER';
                            simulateFileUpload('insurance', `INS_OFFER_${combinedName.toUpperCase()}.PDF`);
                          }}
                          className={cn(
                            "border border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[110px]",
                            insuranceUploaded 
                              ? "border-green-500/40 bg-green-500/5 hover:bg-green-500/10" 
                              : "border-white/10 hover:border-philly-red/40 hover:bg-white/5"
                          )}
                        >
                          {insuranceUploading ? (
                            <div className="w-full">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] text-philly-metal animate-pulse">Uploading policy...</span>
                                <span className="text-[10px] text-philly-red font-bold">{insuranceUploadProgress}%</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-philly-red transition-all duration-150" style={{ width: `${insuranceUploadProgress}%` }} />
                              </div>
                            </div>
                          ) : insuranceUploaded ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle2 className="w-6 h-6 text-green-400 mb-1" />
                              <span className="text-[11px] font-semibold text-white truncate max-w-[170px]">{insuranceUploaded}</span>
                              <span className="text-[9px] text-green-400 uppercase font-bold">Successfully Verified</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <ShieldCheck className="w-6 h-6 text-philly-metal mb-1.5" />
                              <span className="text-xs font-bold text-white mb-0.5">Attach Insurance</span>
                              <span className="text-[10px] text-philly-metal">Click to secure-upload PDF</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-philly-navy/80 p-3.5 rounded-xl border border-white/5 text-[11px] text-philly-metal leading-normal">
                        Submit with confidence: Verified documents and reservation parameters are fully end-to-end encrypted and routed instantly to the central desk manager (<strong className="text-white">license4booking@gmail.com</strong>) for final execution.
                      </div>

                      <button 
                        type="submit"
                        disabled={submittingBooking}
                        className="w-full btn-primary py-4 rounded-2xl font-black uppercase text-sm cursor-pointer tracking-wider hover:scale-101 active:scale-99 transition-all flex items-center justify-center gap-2"
                      >
                        {submittingBooking ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                            Dispatching reservation...
                          </>
                        ) : (
                          <>
                            Submit Secured Reservation
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
    )}
  </AnimatePresence>

      {/* Location & Interactive Map Section */}
      <section id="location" className="py-24 bg-white/5 relative overflow-hidden">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl mb-6">Our Central Philadelphia Location</h2>
              <p className="text-philly-metal text-lg mb-8 leading-relaxed">
                Visit **Philly Car Rentals** at our primary car hub on Vare Ave. We serve the entire Philadelphia area, providing fast vehicle collections, document signing support, and premium service checkups in a highly secure location.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-philly-red/10 border border-philly-red/20 flex items-center justify-center text-philly-red shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Office Address</h4>
                    <p className="text-philly-metal">3041 Vare Ave B, Philadelphia, PA 19145, United States</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-philly-red/10 border border-philly-red/20 flex items-center justify-center text-philly-red shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Direct Telephone</h4>
                    <p className="text-philly-metal">
                      <a href="tel:+12674036640" className="hover:text-philly-red transition-colors font-semibold">+12674036640</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-philly-red/10 border border-philly-red/20 flex items-center justify-center text-philly-red shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Operational Hours</h4>
                    <p className="text-philly-metal">Monday - Sunday: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[400px] md:h-[450px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97860.46157790981!2d-75.27467149247428!3d39.96063538061934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c73c06c4471d%3A0x1016446b7fd1cf71!2sPhilly%20Car%20Rentals!5e0!3m2!1sen!2sph!4v1780382385486!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="w-full h-full grayscale brightness-75 contrast-125 hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ for SEO */}
      <section id="faq" className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
            <p className="text-philly-metal">Common questions about the best Philly Car Rentals.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => (
              <details 
                key={idx}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <summary className="list-none p-6 cursor-pointer flex justify-between items-center bg-transparent group-open:bg-philly-red/5 transition-colors">
                  <span className="font-bold text-lg">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-6 pt-0 text-philly-metal leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-philly-navy py-24 overflow-hidden">
        <div className="section-container">
          <h2 className="text-4xl text-center mb-16">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white/5 p-8 rounded-3xl border border-white/10 relative">
                <Star className="absolute top-8 right-8 text-philly-red w-12 h-12 opacity-10" />
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-philly-red" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="font-bold">{t.name}</h5>
                    <p className="text-xs text-philly-metal uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-philly-silver italic leading-relaxed">"{t.content}"</p>
                <div className="flex gap-1 mt-6 text-philly-red">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book" className="py-24">
        <div className="section-container text-center">
          <div className="bg-philly-red rounded-[60px] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-6xl mb-8">Ready to Cruise Philadelphia?</h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                Join the Philly Car Rentals community today and experience the perfect blend of luxury, speed, and trusted service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setIsReservationModalOpen(true)}
                  className="px-10 py-5 rounded-full bg-white text-philly-red font-black text-xl hover:scale-105 transition-transform shadow-2xl cursor-pointer"
                >
                  START VERIFICATION
                </button>
                <button className="px-10 py-5 rounded-full bg-philly-navy text-white font-bold text-xl hover:bg-philly-navy/90 transition-all border border-white/20">
                  CONTACT SUPPORT
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-philly-navy border-t border-white/5 pt-20 pb-10">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img 
                  src="https://i.imgur.com/4dpOZXM.png" 
                  alt="Philly Auto Sales & Rentals Logo" 
                  className="h-16 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-philly-metal text-sm leading-relaxed mb-6">
                Redefining the car rental experience in Philadelphia. Premium fleet, digital-first process, and unmatched customer care.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-philly-red transition-colors cursor-pointer border border-white/10">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-philly-red transition-colors cursor-pointer border border-white/10">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h5>
              <ul className="space-y-4 text-sm text-philly-metal">
                <li><a href="#vehicles" className="hover:text-philly-red transition-colors">Browse Fleet</a></li>
                <li><a href="#process" className="hover:text-philly-red transition-colors">Rental Process</a></li>
                <li><a href="#safety" className="hover:text-philly-red transition-colors">Safety Standards</a></li>
                <li><a href="#faq" className="hover:text-philly-red transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-xs">Rental Requirements</h5>
              <ul className="space-y-4 text-sm text-philly-metal">
                <li><a href="https://share.google/ZvjE7DOjcZYwIshdY" target="_blank" rel="noopener noreferrer" className="hover:text-philly-red transition-colors underline decoration-philly-red/30">Verification Policy</a></li>
                <li><a href="#" className="hover:text-philly-red transition-colors">Insurance Policy</a></li>
                <li><a href="#" className="hover:text-philly-red transition-colors">Age Requirements</a></li>
                <li><a href="#" className="hover:text-philly-red transition-colors">Cancellation Terms</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact Us</h5>
              <ul className="space-y-4 text-sm text-philly-metal">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-philly-red flex-shrink-0" />
                  <span>3041 Vare Ave B,<br />Philadelphia, PA 19145, United States</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-philly-red flex-shrink-0" />
                  <span><a href="tel:+12674036640" className="hover:text-white transition-colors">+12674036640</a></span>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-4 h-4 text-philly-red flex-shrink-0" />
                  <span>Mon-Sun: 9:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-philly-metal transition-all">
            <p>© {new Date().getFullYear()} Philly Auto Sales & Rentals. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

