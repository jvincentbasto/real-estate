import {
  FiltersState,
  setFilters,
  setViewMode,
  toggleFiltersFullOpen,
} from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { cleanParams, cn, formatPriceValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeIcons } from "@/lib/constants";

const FiltersBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
  const viewMode = useAppSelector((state) => state.global.viewMode);
  const [searchInput, setSearchInput] = useState(filters.location);

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

  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value;

    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      newValue = currentArrayRange;
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const newFilters = { ...filters, [key]: newValue };
    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };

  const handleLocationSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchInput
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: searchInput,
            coordinates: [lng, lat],
          })
        );
      }
    } catch (err) {
      console.error("Error search location:", err);
    }
  };

  //
  const minPrices = [
    { price: 500 },
    { price: 1000 },
    { price: 1500 },
    { price: 2000 },
    { price: 3000 },
    { price: 5000 },
    { price: 10000 },
  ];
  const maxPrices = [
    { price: 1000 },
    { price: 2000 },
    { price: 3000 },
    { price: 5000 },
    { price: 10000 },
  ];
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
  const propertiTypes = Object.entries(PropertyTypeIcons)

  // 
  const ListingViewToggle = ({ }) => {
    return <>
      <div className="flex border rounded-[4px]">
        <Button
          variant="ghost"
          className={cn(
            "cursor-pointer px-3 py-1 rounded-none rounded-l-[4px] hover:bg-yellow-500 hover:text-white",
            viewMode === "list" ? "bg-primary-700 text-primary-50" : ""
          )}
          onClick={() => dispatch(setViewMode("list"))}
        >
          <List className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "cursor-pointer px-3 py-1 rounded-none rounded-r-[4px] hover:bg-yellow-500 hover:text-white",
            viewMode === "grid" ? "bg-primary-700 text-primary-50" : ""
          )}
          onClick={() => dispatch(setViewMode("grid"))}
        >
          <Grid className="w-5 h-5" />
        </Button>
      </div>
    </>
  }

  // 
  const FilterToggle = ({ }) => {
    return <>
      {/* All Filters */}
      <Button
        variant="outline"
        className={cn(
          "cursor-pointer gap-2 rounded-[4px] border-primary-400 hover:bg-primary-500 hover:text-primary-100",
          isFiltersFullOpen && "bg-primary-700 hover:bg-yellow-400 hover:border-yellow-500 text-white"
        )}
        onClick={() => dispatch(toggleFiltersFullOpen())}
      >
        <Filter className="w-4 h-4" />
        <span>All Filters</span>
      </Button>

    </>
  }
  const SearchFilter = ({ }) => {
    return <>
      {/* Search Location */}
      <div className="flex items-center">
        <Input
          placeholder="Search location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-40 rounded-l-[4px] rounded-r-none border-primary-400 border-r-0"
        />
        <Button
          onClick={handleLocationSearch}
          className={`cursor-pointer rounded-r-[4px] rounded-l-none border-l-none border-primary-400 shadow-none 
              border hover:bg-primary-700 hover:text-primary-50`}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

    </>
  }
  const PriceRange = ({ }) => {
    return <>
      {/* Price Range */}
      <div className="flex gap-1">
        {/* Minimum Price Selector */}
        <Select
          value={filters.priceRange[0]?.toString() || "any"}
          onValueChange={(value) =>
            handleFilterChange("priceRange", value, true)
          }
        >
          <SelectTrigger className="cursor-pointer w-22 rounded-[4px] border-primary-400">
            <SelectValue>
              {formatPriceValue(filters.priceRange[0], true)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Min Price</SelectItem>
            {minPrices.map((m) => (
              <SelectItem key={m.price} value={m.price.toString()} className="cursor-pointer">
                ${m.price / 1000}k+
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Maximum Price Selector */}
        <Select
          value={filters.priceRange[1]?.toString() || "any"}
          onValueChange={(value) =>
            handleFilterChange("priceRange", value, false)
          }
        >
          <SelectTrigger className="cursor-pointer w-22 rounded-[4px] border-primary-400">
            <SelectValue>
              {formatPriceValue(filters.priceRange[1], false)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Max Price</SelectItem>
            {maxPrices.map((m) => (
              <SelectItem key={m.price} value={m.price.toString()} className="cursor-pointer">
                &lt;${m.price / 1000}k
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </>
  }
  const BedsAndBaths = ({ }) => {
    return <>
      {/* Beds and Baths */}
      <div className="flex gap-1">
        {/* Beds */}
        <Select
          value={filters.beds}
          onValueChange={(value) => handleFilterChange("beds", value, null)}
        >
          <SelectTrigger className="cursor-pointer w-26 rounded-[4px] border-primary-400">
            <SelectValue placeholder="Beds" />
          </SelectTrigger>
          <SelectContent className="bg-white">
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

        {/* Baths */}
        <Select
          value={filters.baths}
          onValueChange={(value) => handleFilterChange("baths", value, null)}
        >
          <SelectTrigger className="cursor-pointer w-26 rounded-[4px] border-primary-400">
            <SelectValue placeholder="Baths" />
          </SelectTrigger>
          <SelectContent className="bg-white">
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
    </>
  }
  const PropertyType = ({ }) => {
    return <>
      {/* Property Type */}
      <Select
        value={filters.propertyType || "any"}
        onValueChange={(value) =>
          handleFilterChange("propertyType", value, null)
        }
      >
        <SelectTrigger className="cursor-pointer w-32 rounded-[4px] border-primary-400">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="any">Any Property Type</SelectItem>
          {propertiTypes.map(([type, Icon]) => (
            <SelectItem key={type} value={type} className="cursor-pointer">
              <div className="flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                <span>{type}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

    </>
  }

  return (
    <div className="flex justify-between items-center w-full py-5">
      {/* View Mode */}
      <div className="flex justify-between items-center gap-4 p-2">
        <ListingViewToggle />
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center gap-4 p-2">
        <FilterToggle />
        <SearchFilter />
        <PriceRange />
        <BedsAndBaths />
        <PropertyType />
      </div>
    </div>
  );
};

export default FiltersBar;
