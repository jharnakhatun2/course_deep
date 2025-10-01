import type { BlogPost } from "../../ult/types/types";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaGooglePlusSquare,
  FaTwitterSquare,
  FaUser,
} from "react-icons/fa";

type SingleAuthorProps = {
  blog: BlogPost;
};

const SingleAuthor = ({ blog }: SingleAuthorProps) => {
  const socialStyle =
    "text-2xl hover:text-teal-500 transition-smooth text-yellow-500";
  return (
    <div className="mt-3 ">
      {/* Tags and share */}
      <div className="sm:flex items-center justify-between">
        <p>
          <span className="font-semibold">Tags :</span> {blog.tags.join(", ")}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span>Share : </span>
          <FaFacebookSquare className={socialStyle} />
          <FaTwitterSquare className={socialStyle} />
          <FaGooglePlusSquare className={socialStyle} />
          <FaGithubSquare className={socialStyle} />
        </div>
      </div>
      {/* author info */}
      <div className="sm:flex gap-5 bg-white p-5 mt-8">
        <div className="bg-zinc-400 inline-block pt-3 px-2 rounded">
          <FaUser className="text-7xl text-white" />
        </div>
        <div className="mt-3 sm:mt-0">
          <p className="text-zinc-800 text-lg mb-2">
            Written by {blog.author}{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            eaque repellendus impedit tempora perferendis beatae nulla voluptas
            consequuntur neque dolorum .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleAuthor;
