"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  CalendarDaysIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  StarIcon,
  ArrowRightIcon,
  HeartIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const LandingPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      // If user is logged in, navigate to appointment booking page (to be created later)
      router.push("/appointments");
    } else {
      // If user is not logged in, redirect to login page
      router.push("/auth/login");
    }
  };

  const services = [
    {
      icon: HeartIcon,
      title: "Emergency Care",
      description:
        "24/7 emergency services with immediate care for urgent medical needs.",
      available: "Available Now",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: CalendarDaysIcon,
      title: "Online Appointments",
      description:
        "Book appointments with our specialists easily through our online platform.",
      available: "Book Today",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: UserGroupIcon,
      title: "Specialist Consultations",
      description:
        "Access to experienced doctors across multiple medical specialties.",
      available: "150+ Doctors",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: ShieldCheckIcon,
      title: "Health Checkups",
      description:
        "Comprehensive health screening and preventive care packages.",
      available: "Packages Available",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const whyChooseUs = [
    {
      icon: CheckCircleIcon,
      title: "Trusted Care",
      description:
        "Over 15 years of providing quality healthcare services to our community.",
      iconColor: "text-emerald-600",
    },
    {
      icon: AcademicCapIcon,
      title: "Expert Team",
      description:
        "Board-certified doctors and healthcare professionals with years of experience.",
      iconColor: "text-blue-600",
    },
    {
      icon: GlobeAltIcon,
      title: "Modern Technology",
      description:
        "State-of-the-art medical equipment and digital health management systems.",
      iconColor: "text-purple-600",
    },
    {
      icon: ClockIcon,
      title: "Quick Service",
      description:
        "Minimal waiting times with efficient appointment scheduling and management.",
      iconColor: "text-orange-600",
    },
  ];

  const testimonials = [
    {
      name: "Maria Gonzalez",
      role: "Regular Patient",
      content:
        "The online booking system is so convenient! I can schedule my family's appointments from home.",
      rating: 5,
      treatment: "Family Medicine",
      avatar: "M",
    },
    {
      name: "James Wilson",
      role: "Patient",
      content:
        "Excellent care and very professional staff. The doctors really listen to your concerns.",
      rating: 5,
      treatment: "Cardiology",
      avatar: "J",
    },
    {
      name: "Dr. Sarah Kim",
      role: "Referring Physician",
      content:
        "I regularly refer my patients here. The quality of care and communication is outstanding.",
      rating: 5,
      treatment: "Professional Network",
      avatar: "S",
    },
  ];

  const quickStats = [
    {
      number: "50,000+",
      label: "Patients Served",
      icon: "👥",
      color: "text-blue-600",
    },
    {
      number: "150+",
      label: "Medical Experts",
      icon: "👨‍⚕️",
      color: "text-green-600",
    },
    {
      number: "25+",
      label: "Specialties",
      icon: "🏥",
      color: "text-purple-600",
    },
    {
      number: "24/7",
      label: "Emergency Care",
      icon: "🚨",
      color: "text-red-600",
    },
  ];

  const medicalSpecialties = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Emergency Medicine",
    "Family Medicine",
    "Internal Medicine",
    "Oncology",
  ];

  return (
    <>
      {/* Hero Section - Softer Colors */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        {/* Subtle Medical Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236b7280' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 mb-6">
                  <HeartIconSolid className="w-4 h-4 mr-2 text-red-500" />
                  Your Health, Our Commitment
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-slate-800">
                  Quality Healthcare{" "}
                  <span className="text-blue-600">Made Simple</span>
                </h1>

                <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
                  Book appointments with trusted doctors, access your medical
                  records, and manage your health journey all in one place.
                  Experience healthcare the way it should be.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button
                    onClick={handleBookAppointment}
                    className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Book Appointment Now
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md">
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    Call: (555) 123-4567
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickStats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div
                        className={`text-2xl lg:text-3xl font-bold mb-1 ${stat.color}`}
                      >
                        {stat.number}
                      </div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Hospital Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 lg:p-12 shadow-lg border border-blue-100">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <HeartIconSolid className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">
                      D-code Hospital
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Providing compassionate care and medical excellence since
                      2008
                    </p>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-6 h-6 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">
                      4.9/5 Patient Satisfaction Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800">
              Our Medical Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive healthcare services designed to meet all your
              medical needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className={`text-sm font-medium ${service.iconColor}`}>
                  {service.available}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Specialties */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800">
              Medical Specialties
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expert care across a wide range of medical specialties
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {medicalSpecialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-slate-50 hover:bg-blue-50 p-4 rounded-xl text-center transition-all duration-200 cursor-pointer border border-slate-100 hover:border-blue-200 group"
              >
                <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors text-sm">
                  {specialty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800">
              Why Choose D-code Hospital?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're committed to providing exceptional healthcare with a
              patient-first approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-slate-800">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800">
              What Our Patients Say
            </h2>
            <p className="text-xl text-slate-600">
              Real experiences from our valued patients and healthcare partners
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic text-lg">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {testimonial.name}
                      </div>
                      <div className="text-slate-600 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    {testimonial.treatment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-20 bg-red-500">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Medical Emergency?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our emergency department is open 24/7 for urgent medical care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg">
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call 911 or (555) 123-4567
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-colors">
                Find Our Location
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards better health. Book your appointment
            today.
          </p>
          <button
            onClick={handleBookAppointment}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg transform hover:scale-105 inline-flex items-center"
          >
            Get Started Now
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
