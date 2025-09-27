import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Course Deep Terms & Conditions of Use 
      </h1>
      

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase ">Acceptance of Terms</h2>
          <p className="text-zinc-600">
            By creating an account or using our services, you agree to comply with
            these Terms & Conditions and applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">Use of Our Services</h2>
          <ul className="list-disc pl-6 space-y-1 text-zinc-600">
            <li>You must be at least 13 years old to use Course Deep LMS.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>Unauthorized use or redistribution of course materials is prohibited.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">Course Content</h2>
          <p className="text-zinc-600">
            All courses and materials are for personal learning only. Redistribution
            or resale is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">Payments & Refunds</h2>
          <p className="text-zinc-600">
            Purchases are non-transferable. Refunds may only be issued in accordance
            with our Refund Policy.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">User Conduct</h2>
          <p className="text-zinc-600">
            Users must not post offensive, harmful, or illegal content. Violations
            may result in account suspension or termination.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">Limitation of Liability</h2>
          <p className="text-zinc-600">
            Course Deep LMS is not responsible for errors, interruptions, or outcomes
            of applying knowledge gained from courses.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">Modifications</h2>
          <p className="text-zinc-600">
            We may update these Terms at any time. Continued use means you accept
            the revised Terms.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Terms;
