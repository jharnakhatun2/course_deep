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
    <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
      {categories.map((cat) => (
        <li
          key={cat}
          className={`cursor-pointer hover:text-yellow-500 ${
            selectedCategory === cat ? "font-bold text-yellow-500" : ""
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
