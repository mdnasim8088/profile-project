"use client";


interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#EFEAE2] border border-[#E4DDD2] mb-16 w-fit mx-auto shadow-xs">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-orange-grad text-white shadow-xs"
                : "bg-[#FFFFFF] text-[#17140F] border border-[#E4DDD2] hover:bg-orange-grad/10 hover:text-[#F05A1A]"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
