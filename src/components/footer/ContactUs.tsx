import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="mt-2">
      <p className="text-sm leading-relaxed mb-4">
        If you want to contact us about any issue our support available to help
        you 8am–7pm Monday to Saturday.
      </p>

      <ul className="space-y-3 text-sm">
        <li className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-yellow-500 mt-1" />
          <span>
            Address: 9015 Sunset Boulevard <br /> United Kingdom
          </span>
        </li>
        <li className="flex items-center gap-3">
          <FaPhoneAlt className="text-yellow-500" />
          <span>Call: +215 623 7532</span>
        </li>
        <li className="flex items-center gap-3">
          <FaEnvelope className="text-yellow-500" />
          <span>Email: info@Studylms.com</span>
        </li>
      </ul>
    </div>
  );
};

export default ContactUs;
