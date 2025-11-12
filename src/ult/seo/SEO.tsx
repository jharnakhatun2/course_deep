import { useEffect, type FC } from "react";
import type { SEOProps } from "../types/types";

const SEO: FC<SEOProps> = ({ title, description, keywords }) => {
    
    useEffect(() => {
        // Set title
        document.title = title;

        // Set meta description
        let metaDescription = document.querySelector("meta[name='description']");
        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.setAttribute("name", "description");
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", description);

        // Set meta keywords (only if provided)
        if (keywords) {
            let metaKeywords = document.querySelector("meta[name='keywords']");
            if (!metaKeywords) {
                metaKeywords = document.createElement("meta");
                metaKeywords.setAttribute("name", "keywords");
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute("content", keywords);
        }
    }, [title, description, keywords]);

    return null;
};

export default SEO;
