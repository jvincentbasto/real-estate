import { FiltersState, initialState, setFilters } from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { cleanParams, cn, formatEnumString } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AmenityIcons, PropertyTypeIcons } from "@/lib/constants";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FiltersFull = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const [localFilters, setLocalFilters] = useState(initialState.filters);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );

  const updateURL = debounce((newFilters: FiltersState) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updatedSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  });

  const handleSubmit = () => {
    dispatch(setFilters(localFilters));
    updateURL(localFilters);
  };

  const handleReset = () => {
    setLocalFilters(initialState.filters);
    dispatch(setFilters(initialState.filters));
    updateURL(initialState.filters);
  };

  const handleAmenityChange = (amenity: AmenityEnum) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleLocationSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          localFilters.location
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setLocalFilters((prev) => ({
          ...prev,
          coordinates: [lng, lat],
        }));
      }
    } catch (err) {
      console.error("Error search location:", err);
    }
  };

  if (!isFiltersFullOpen) return null;


  // 
  const beds = [
    {
      title: "Any Beds",
      value: "any",
    },
    {
      title: "1+ Bath",
      value: "1",
    },
    {
      title: "2+ Bath",
      value: "2",
    },
    {
      title: "3+ Bath",
      value: "3",
    },
    {
      title: "4+ Bath",
      value: "4",
    },
  ];
  const baths = [
    {
      title: "Any Baths",
      value: "any",
    },
    {
      title: "1+ Bath",
      value: "1",
    },
    {
      title: "2+ Bath",
      value: "2",
    },
    {
      title: "3+ Bath",
      value: "3",
    },
  ];

  // 
  const Location = ({ }) => {
    return <>
      {/* Location */}
      <div>
        <h4 className="font-bold mb-2">Location</h4>
        <div className="flex items-center">
          <Input
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            className="rounded-l-[4px] rounded-r-none border-r-0"
          />
          <Button
            onClick={handleLocationSearch}
            className="cursor-pointer rounded-r-[4px] rounded-l-none border-l-none border-black shadow-none border bg-black hover:bg-yellow-400 hover:border-yellow-500 text-white"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

    </>
  }
  const PropertyType = ({ }) => {
    return <>

      {/* Property Type */}
      <div>
        <h4 className="font-bold mb-2">Property Type</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
            <div
              key={type}
              className={cn(
                "flex flex-col items-center justify-center p-4 border rounded-[4px] cursor-pointer hover:text-yellow-400",
                localFilters.propertyType === type
                  ? "border-black"
                  : "border-gray-200"
              )}
              onClick={() =>
                setLocalFilters((prev) => ({
                  ...prev,
                  propertyType: type as PropertyTypeEnum,
                }))
              }
            >
              <Icon className="w-6 h-6 mb-2" />
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>

    </>
  }
  const PriceRange = ({ }) => {
    return <>
      {/* Price Range */}
      <div>
        <h4 className="font-bold mb-2">Price Range (Monthly)</h4>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={[
            localFilters.priceRange[0] ?? 0,
            localFilters.priceRange[1] ?? 10000,
          ]}
          onValueChange={(value: any) =>
            setLocalFilters((prev) => ({
              ...prev,
              priceRange: value as [number, number],
            }))
          }
          className="cursor-pointer py-[20px] [&>span]:bg-yellow-400/20"
        />
        <div className="flex justify-between mt-2">
          <span>${localFilters.priceRange[0] ?? 0}</span>
          <span>${localFilters.priceRange[1] ?? 10000}</span>
        </div>
      </div>

    </>
  }
  const Dimensions = ({ }) => {
    return <>
      {/* Square Feet */}
      <div>
        <h4 className="font-bold mb-2">Square Feet</h4>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={[
            localFilters.squareFeet[0] ?? 0,
            localFilters.squareFeet[1] ?? 5000,
          ]}
          onValueChange={(value) =>
            setLocalFilters((prev) => ({
              ...prev,
              squareFeet: value as [number, number],
            }))
          }
          className="cursor-pointer py-[20px] [&>span]:bg-yellow-400/20"
        />
        <div className="flex justify-between mt-2">
          <span>{localFilters.squareFeet[0] ?? 0} sq ft</span>
          <span>{localFilters.squareFeet[1] ?? 5000} sq ft</span>
        </div>
      </div>
    </>
  }
  const BedsAndBaths = ({ }) => {
    return <>
      {/* Beds and Baths */}
      <div className="flex gap-4">
        <div className="flex-1">
          <h4 className="font-bold mb-2">Beds</h4>
          <Select
            value={localFilters.beds || "any"}
            onValueChange={(value) =>
              setLocalFilters((prev) => ({ ...prev, beds: value }))
            }
          >
            <SelectTrigger className="cursor-pointer w-full rounded-[4px]">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              {beds.map((m, i) => {
                return (
                  <SelectItem
                    key={i}
                    value={m.value}
                    className="cursor-pointer"
                  >
                    {m.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <h4 className="font-bold mb-2">Baths</h4>
          <Select
            value={localFilters.baths || "any"}
            onValueChange={(value) =>
              setLocalFilters((prev) => ({ ...prev, baths: value }))
            }
          >
            <SelectTrigger className="cursor-pointer w-full rounded-[4px]">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent>
              {baths.map((m, i) => {
                return (
                  <SelectItem
                    key={i}
                    value={m.value}
                    className="cursor-pointer"
                  >
                    {m.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

    </>
  }
  const Amenities = ({ }) => {
    return <>
      {/* Amenities */}
      <div>
        <h4 className="font-bold mb-2">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(AmenityIcons).map(([amenity, Icon]) => (
            <div
              key={amenity}
              className={cn(
                "flex items-center space-x-2 p-2 border rounded-[4px] cursor-pointer hover:text-yellow-400",
                localFilters.amenities.includes(amenity as AmenityEnum)
                  ? "border-black"
                  : "border-gray-200"
              )}
              onClick={() => handleAmenityChange(amenity as AmenityEnum)}
            >
              <Icon className="w-5 h-5 hover:cursor-pointer" />
              <Label className="hover:cursor-pointer">
                {formatEnumString(amenity)}
              </Label>
            </div>
          ))}
        </div>
      </div>

    </>
  }
  const DateInput = ({ }) => {
    return <>
      {/* Available From */}
      <div className="h-full w-full">
        <h4 className="font-bold mb-2">Available From</h4>
        <Input
          type="date"
          value={
            localFilters.availableFrom !== "any"
              ? localFilters.availableFrom
              : ""
          }
          onChange={(e) =>
            setLocalFilters((prev) => ({
              ...prev,
              availableFrom: e.target.value ? e.target.value : "any",
            }))
          }
          className="rounded-[4px] justify-center h-full w-full"
        />
      </div>

    </>
  }
  const Actions = ({ }) => {
    return <>

      {/* Apply and Reset buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          onClick={handleSubmit}
          className="cursor-pointer flex-1 bg-primary-700 text-white font-black rounded-[4px] hover:bg-yellow-400 hover:border-yellow-500"
        >
          APPLY
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="cursor-pointer flex-1 rounded-[4px]"
        >
          Reset Filters
        </Button>
      </div>

    </>
  }

  return (
    <div className="bg-white rounded-[4px] px-4 h-full overflow-auto pb-10">
      <div className="flex flex-col space-y-6">
        <Location />
        <PropertyType />
        <PriceRange />
        <Dimensions />
        <BedsAndBaths />
        <Amenities />
        <DateInput />
        <Actions />
      </div>
    </div>
  );
};

export default FiltersFull;
