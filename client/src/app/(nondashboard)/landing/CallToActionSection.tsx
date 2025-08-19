"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <div className="relative py-24">
      <Image
        src="/images/landing-i4.png"
        alt="Realestate Search Section Background"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:mr-10">
            <h2 className="text-[30px] max-w-[300px] font-bold max-md:text-center text-white">
              Discover Your Ideal Rental Home
            </h2>
          </div>
          <div>
            <p className="text-white mb-3">
              Explore a diverse selection of rental properties in your preferred location.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer inline-block text-primary-700 bg-white rounded-lg px-6 py-3 font-semibold hover:bg-yellow-500 hover:text-white"
              >
                Search Properties
              </button>
              <Link
                href="/signup"
                className="cursor-pointer inline-block text-white bg-yellow-400 rounded-lg px-6 py-3 font-semibold hover:bg-yellow-500"
                scroll={false}
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToActionSection;
