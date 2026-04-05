"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  MessageCircle,
  Code2,
} from "lucide-react";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";

function HoverFooter() {
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "#services" },
        { label: "UI/UX Design", href: "#services" },
        { label: "Full-Stack Solutions", href: "#services" },
        { label: "Deployment & Scaling", href: "#services" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Selected Work", href: "#work" },
        { label: "Our Process", href: "#process" },
        { label: "About Us", href: "#about-section" },
        {
          label: "Start a Project",
          href: "#contact",
          pulse: true,
        },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-emerald-400" />,
      text: "Reach Out",
      href: "mailto:hiee.seno@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-emerald-400" />,
      text: "Contact Us",
      href: "#contact",
    },
    {
      icon: <MapPin size={18} className="text-emerald-400" />,
      text: "India — Worldwide",
    },
  ];

  const socialLinks = [
    { icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.senostudio.in" },
    { icon: <MessageCircle size={20} />, label: "Twitter / X", href: "#" },
    { icon: <Code2 size={20} />, label: "GitHub", href: "#" },
    { icon: <ExternalLink size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Globe size={20} />, label: "Portfolio", href: "https://satyamkrjha.vercel.app/" },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-4 md:m-8">
      <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/seno-logo.jpg" alt="SENO" className="h-10 w-10 rounded-lg object-cover" />
              <div>
                <span className="text-white text-2xl font-instrument italic font-bold">
                  <span className="text-white">SE</span>
                  <span className="text-emerald-400">NO</span>
                </span>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] -mt-1">Web Studio</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Engineering elite digital experiences. We architect uncompromising software for world-class brands.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-instrument italic font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-light"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1 -right-3 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-instrument italic font-semibold mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-light"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-light">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="hover:text-emerald-400 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-center md:text-left text-xs tracking-wide">
            &copy; {new Date().getFullYear()} SENO Web Studio. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect — massive "SENO" text */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="SENO" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
