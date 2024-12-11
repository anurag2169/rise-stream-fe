import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

const SuggestionTag = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };
  const categories = [
    "All",
    "Music",
    "APIs",
    "Podcasts",
    "Software Engineering",
    "Live",
    "Jukebox",
    "Mixes",
    "Ghazal",
    "Rahat Fateh Ali Khan",
    "Amit Trivedi",
    "Movie musicals",
    "Kailash Kher",
    "Satsang",
  ];
  return (
    <div className="fixed top-14 z-10 w-full bg-muted/60 dark:bg-slate-950/60 backdrop-blur">
      <div className="relative w-full md:px-16 mb-4 mt-2 ">
        <div
          ref={scrollContainerRef}
          className="flex justify-start overflow-x-auto whitespace-nowrap space-x-4 p-4 no-scrollbar"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                activeCategory === category
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={() => scroll(-200)}
          className={`hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 w-10 ml-2 rounded-full shadow-md`}
        >
          ←
        </button>
        <button
          onClick={() => scroll(200)}
          className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 mr-2 w-10 rounded-full shadow-md"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SuggestionTag;
