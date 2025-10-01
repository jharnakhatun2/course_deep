import { FaComments, FaReadme, FaUserCheck } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import type { BlogPost } from "../../ult/types/types";

type SingleBlogInfoProps = {
  blog: BlogPost;
};

const SingleBlogInfo = ({ blog }: SingleBlogInfoProps) => {
  const subheadStyle =
    "flex items-center gap-1 uppercase text-zinc-500 font-semibold";
  return (
    <div>
      <img src={blog.image} alt={blog.title} className="w-full h-[500px]" />
      <h1 className="text-3xl font-bold mt-4 text-zinc-600">{blog.title}</h1>
      {/* Sub Head */}
      <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
        <p className={subheadStyle}>
          <MdOutlineWatchLater className="text-yellow-500" /> {blog.date}
        </p>
        <p className={subheadStyle}>
          <FaUserCheck className="text-yellow-500" /> By {blog.author}
        </p>
        <p className={subheadStyle}>
          <FaReadme className="text-yellow-500" /> {blog.readTime}
        </p>
        <p className={subheadStyle}>
          <FaComments className="text-yellow-500" /> {blog.comments} Comments
        </p>
      </div>
      {/* Blog Details */}
      <div className="py-5 text-justify">
        <p className="text-gray-500 mb-2">{blog.shortDes}</p>
        <div className="prose max-w-none">
          {blog.content.split("\n\n").map((para: string, i: number) => (
            <p key={i} className="py-3">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogInfo;
