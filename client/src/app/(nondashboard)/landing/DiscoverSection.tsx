"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const discover = [
  {
    imageSrc: "/images/landing-icon-calendar.png",
    title: "Book Your Rental",
    description:
      "Found your perfect place? Secure it online quickly and hassle-free.",
  },
  {
    imageSrc: "/images/landing-icon-heart.png",
    title: "Enjoy Your New Home",
    description:
      "Move in and start living the lifestyle you’ve been dreaming of.",
  },
  {
    imageSrc: "/images/landing-icon-wand.png",
    title: "Search for Properties",
    description:
      "Explore a wide range of rental properties in your preferred location.",
  },
];

const DiscoverSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={containerVariants}
      className="py-12 bg-white mb-16"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div variants={itemVariants} className="my-12 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-gray-800 max-w-[400px] mx-auto">
            Explore and secure your ideal rental property today!
          </h2>
          <p className="text-gray-500 max-w-[500px] mx-auto mt-[40px]">
            Finding your dream rental property has never been simpler. Our easy-to-use search tool helps you quickly locate the perfect home that fits your needs. Begin your search today and make your dream rental a reality!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {discover.map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) => (
  <div className="px-4 py-12 shadow-lg rounded-lg bg-primary-50 min-h-[200px]">
    <div className="bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10">
      <Image
        src={imageSrc}
        width={30}
        height={30}
        className="w-full h-full"
        alt={title}
      />
    </div>
    <h3 className="mt-4 text-xl font-medium text-gray-800">{title}</h3>
    <p className="mt-2 text-base text-gray-500">{description}</p>
  </div>
);

export default DiscoverSection;
