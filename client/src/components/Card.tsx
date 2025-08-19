import { Bath, Bed, Heart, House, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Card = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardProps) => {

  // 
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 8);
  }
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] || `/images/landing-i${getRandomNumber()}.png`
  );


  return (
    <div className="bg-white rounded-[4px] overflow-hidden shadow-sm w-full mb-5">
      <div className="relative">
        <div className="w-full h-48 relative">
          <Image
            src={imgSrc}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgSrc(`/images/landing-i${getRandomNumber()}.png`)}
          />
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {property.isPetsAllowed && (
            <span className="bg-white/60 text-black text-xs font-semibold px-2 py-1 rounded-[4px]">
              Pets Allowed
            </span>
          )}
          {property.isParkingIncluded && (
            <span className="bg-white/60 text-black text-xs font-semibold px-2 py-1 rounded-[4px]">
              Parking Included
            </span>
          )}
        </div>
        {showFavoriteButton && (
          <button
            className="cursor-pointer absolute bottom-4 right-4 bg-white/50 hover:bg-white/80 rounded-[4px] p-2"
            onClick={onFavoriteToggle}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                }`}
            />
          </button>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">
          {propertyLink ? (
            <Link
              href={propertyLink}
              className="hover:text-yellow-500"
              scroll={false}
            >
              {property.name}
            </Link>
          ) : (
            property.name
          )}
        </h2>
        <p className="text-gray-600 mb-2">
          {property?.location?.address}, {property?.location?.city}
        </p>
        <div className="flex justify-between items-center mt-[20px]">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-semibold">
              {property.averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600 ml-1">
              ({property.numberOfReviews} Reviews)
            </span>
          </div>
          <p className="text-[13px] font-bold mb-[5px]">
            ${property.pricePerMonth.toFixed(0)}{" "}
            <span className="text-gray-600 font-medium"> / month</span>
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center gap-4 text-gray-600 mt-5">
          <span className="flex items-center">
            <Bed className="w-5 h-5 mr-2" />
            {property.beds} Bed
          </span>
          <span className="flex items-center">
            <Bath className="w-5 h-5 mr-2" />
            {property.baths} Bath
          </span>
          <span className="flex items-center">
            <House className="w-5 h-5 mr-2" />
            {property.squareFeet} sq ft
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
