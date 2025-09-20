import Banner1 from "../components/banners/Banner1";
import Banner2 from "../components/banners/Banner2";
import BannerEvent from "../components/banners/BannerEvent";
import BannerStats from "../components/banners/BannerStats";
import Category from "../components/category/Category";
import CourseCards from "../components/courses/home/CourseCards";
import EventList from "../components/events/EventList";
import FAQ from "../components/faq/FAQ";
import Hero from "../components/hero/Hero";
import Instructor from "../components/instructor/Instructor";
import LatestBlog from "../components/latestBlog/LatestBlog";
import Pricing from "../components/pricing/Pricing";
import Testimonials from "../components/testimonial/Testimonial";
import { useGetBlogsQuery } from "../features/blog/blogApi";
import { useGetCoursesQuery } from "../features/course/courseApi";
import { useGetEventsQuery } from "../features/event/eventApi";
import Loader from "../ult/loader/Loader";

const Home = () => {
  // Fetch all data in Home
  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useGetCoursesQuery();
  const {
    data: events,
    isLoading: eventsLoading,
    isError: eventsError,
  } = useGetEventsQuery();
  const {
    data: blogs = [],
    isLoading: blogsLoading,
    isError: blogsError,
  } = useGetBlogsQuery();

  const isLoading = coursesLoading || eventsLoading || blogsLoading;
  const isError = coursesError || eventsError || blogsError;

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load data.</p>
    );
  return (
    <>
      <Hero />
      <BannerStats />
      <Category courses={courses || []} />
      <CourseCards courses={courses || []} />
      <EventList events={events || []} />
      <Instructor />
      <BannerEvent />
      <Testimonials />
      <LatestBlog blogs={blogs} />
      <Pricing />
      <Banner2 />
      <FAQ />
      <Banner1 />
    </>
  );
};

export default Home;
