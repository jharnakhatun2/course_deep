import type { FC } from "react";
import type { BlogPost } from "../../ult/types/types";

interface BlogCategoryProps {
  blogs: BlogPost[]; // get blogs to extract categories dynamically
  selectedCategory?: string | null;
  setSelectedCategory?: (cat: string | null) => void;
}

const BlogCategory: FC<BlogCategoryProps> = ({
  blogs,
  selectedCategory,
  setSelectedCategory,
}) => {
  // Extract unique categories from blogs
  const categories = Array.from(new Set(blogs.map((blog) => blog.category)));

  return (
    <ul className="space-y-2 sm:text-base flex flex-wrap gap-3 uppercase">
      {categories.map((cat) => (
        <li
          key={cat}
          className={`cursor-pointer hover:bg-yellow-500 hover:border-yellow-500 hover:text-white text-sm border border-white hover:shadow transition-smooth px-2 py-1 backdrop-blur-lg  ${
            selectedCategory === cat
              ? "text-white bg-yellow-500 border-yellow-500 shadow-[0_0_15px_#ffffff]"
              : "text-zinc-500 bg-white/10"
          }`}
          onClick={() =>
            setSelectedCategory
              ? setSelectedCategory(cat === selectedCategory ? null : cat)
              : null
          }
        >
          {cat}
        </li>
      ))}
    </ul>
  );
};

export default BlogCategory;
