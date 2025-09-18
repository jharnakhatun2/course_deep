import payImage from "../../assets/img/sslcommerz-banner.webp";

const Banner1 = () => {
  return (
    <section className="py-8 lg:py-12 bg-gradient-to-b from-gray-100 to-zinc-500">
      <div className="lg:max-w-7xl mx-auto px-4 space-y-6 ">
        <img src={payImage} alt="payments-way" />
      </div>
    </section>
  );
};

export default Banner1;
