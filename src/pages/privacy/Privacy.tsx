import React from "react";

const Privacy: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-5">
        Course Deep Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-zinc-600">
            <li>Personal Information: name, email, payment details.</li>
            <li>
              Usage Data: courses accessed, progress tracking, device info.
            </li>
            <li>Cookies & Tracking: used for analytics and personalization.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">
            How We Use Your Information
          </h2>
          <p className="text-zinc-600">
            We use collected data to improve services, process payments, send
            updates, and personalize learning experiences.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">
            Sharing of Information
          </h2>
          <p className="text-zinc-600">
            We do not sell your data. Limited data may be shared with trusted
            providers like payment processors or when required by law.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">
            Data Security
          </h2>
          <p className="text-zinc-600">
            We use industry-standard measures to protect your data but cannot
            guarantee absolute security of online transmissions.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">
            Your Rights
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-zinc-600">
            <li>Access and update your personal data.</li>
            <li>Request deletion of your account.</li>
            <li>Opt-out of marketing communications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">
            Children’s Privacy
          </h2>
          <p className="text-zinc-600">
            Our services are not intended for children under 13. We do not
            knowingly collect data from children.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-lg font-semibold uppercase">
            Changes to This Policy
          </h2>
          <p className="text-zinc-600">
            We may update this Privacy Policy from time to time. Please review
            this page for the latest version.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
