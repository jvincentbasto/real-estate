import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => {
  return (
    <footer className="border-t border-gray-200 pt-[50px] pb-[30px]">
      <div className="mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-[10px] md:mb-0">
            <Link href="/" className="text-xl font-bold" scroll={false}>
              <div className="text-xl font-bold text-yellow-400 hover:text-yellow-500">
                REAL
                <span className="text-black hover:text-yellow-500 font-bold ml-[4px]">
                  ESTATE
                </span>
              </div>
            </Link>
          </div>
          <div className="flex space-x-4 ">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary-600">
              <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Linkedin"
              className="hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-primary-600">
              <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-[30px] lg:mt-[5px] text-sm text-gray-500 flex flex-col-reverse md:flex-row md:justify-between">
          <span className="mt-[5px] md:mt-0">© REAL ESTATE. All rights reserved.</span>
          <div className="">
            <Link href="/privacy" className="">Privacy Policy</Link>
            <Link href="/terms" className="ml-[10px]">Terms of Service</Link>
            <Link href="/cookies" className="ml-[10px]">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
