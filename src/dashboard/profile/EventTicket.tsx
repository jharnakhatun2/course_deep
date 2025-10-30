import { type FC } from "react";
import type { Booking } from "../../ult/types/types";
import jsPDF from "jspdf";
import { BiCalendar, BiCheckCircle, BiMapPin } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { BsQrCode } from "react-icons/bs";
import QRCode from "qrcode";

interface EventTicketProps {
  event: Booking;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const EventTicket: FC<EventTicketProps> = ({ event, isModalOpen, setIsModalOpen }) => {

const downloadTicket = async () => {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Generate QR code with yellow color scheme
    const qrCodeDataURL = await QRCode.toDataURL(event._id, {
      width: 300,
      margin: 2,
      color: {
        dark: '#D97706', // yellow-600
        light: '#FFFFFF'
      }
    });

    // White background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 210, 297, 'F');

    // ===== HEADER SECTION =====
    // Yellow gradient background (using yellow-300)
    pdf.setFillColor(253, 224, 71);
    pdf.rect(0, 0, 210, 55, 'F');

    // "EVENT TICKET" label
    pdf.setFontSize(12);
    pdf.setTextColor(24, 24, 27); // zinc-900
    pdf.setFont("helvetica", "bold");
    pdf.text("EVENT TICKET", 105, 15, { align: "center" });

    // Event title - larger and bold
    pdf.setFontSize(22);
    pdf.text(event.productTitle, 105, 28, { align: "center" });

    // Ticket ID
    pdf.setFontSize(9);
    pdf.setTextColor(113, 113, 122); // zinc-500
    pdf.setFont("helvetica", "normal");
    pdf.text(`Ticket ID: ${event._id.slice(-12).toUpperCase()}`, 105, 38, { align: "center" });

    // Status badge (top right)
    pdf.setFillColor(34, 197, 94); // green-500
    pdf.roundedRect(155, 8, 45, 10, 5, 5, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.text(event.status.toUpperCase(), 177.5, 14, { align: "center" });

    // ===== MAIN CONTENT AREA =====
    const contentStartY = 70;
    const leftColumnX = 20;


    // Left column border (decorative)
    pdf.setDrawColor(229, 231, 235); // gray-200
    pdf.setLineWidth(0.3);
    pdf.line(145, contentStartY, 145, 250);

    // ===== ATTENDEE INFORMATION =====
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128); // gray-500
    pdf.setFont("helvetica", "bold");
    pdf.text("ATTENDEE INFORMATION", leftColumnX, contentStartY);

    // Separator line
    pdf.setDrawColor(229, 231, 235);
    pdf.setLineWidth(0.5);
    pdf.line(leftColumnX, contentStartY + 2, 140, contentStartY + 2);

    // Attendee name
    pdf.setFontSize(16);
    pdf.setTextColor(17, 24, 39); // gray-900
    pdf.setFont("helvetica", "bold");
    pdf.text(event.userName, leftColumnX, contentStartY + 12);

    // Attendee email
    pdf.setFontSize(11);
    pdf.setTextColor(75, 85, 99); // gray-600
    pdf.setFont("helvetica", "normal");
    pdf.text(event.userEmail, leftColumnX, contentStartY + 20);

    // ===== EVENT DETAILS =====
    let detailY = contentStartY + 40;

    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.setFont("helvetica", "bold");
    pdf.text("EVENT DETAILS", leftColumnX, detailY);

    // Separator line
    pdf.line(leftColumnX, detailY + 2, 140, detailY + 2);

    detailY += 12;

    // Date detail box
    pdf.setFillColor(224, 242, 254); // blue-100
    pdf.roundedRect(leftColumnX, detailY, 120, 18, 4, 4, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(107, 114, 128);
    pdf.setFont("helvetica", "normal");
    pdf.text("Date", leftColumnX + 5, detailY + 6);
    pdf.setFontSize(12);
    pdf.setTextColor(17, 24, 39);
    pdf.setFont("helvetica", "bold");
    pdf.text(formatDate(event.eventDate), leftColumnX + 5, detailY + 13);

    detailY += 22;

    // Time detail box
    pdf.setFillColor(243, 232, 255); // purple-100
    pdf.roundedRect(leftColumnX, detailY, 120, 18, 4, 4, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(107, 114, 128);
    pdf.setFont("helvetica", "normal");
    pdf.text("Time", leftColumnX + 5, detailY + 6);
    pdf.setFontSize(12);
    pdf.setTextColor(17, 24, 39);
    pdf.setFont("helvetica", "bold");
    pdf.text(event.eventTime, leftColumnX + 5, detailY + 13);

    detailY += 22;

    // Location detail box
    pdf.setFillColor(252, 231, 243); // pink-100
    pdf.roundedRect(leftColumnX, detailY, 120, 18, 4, 4, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(107, 114, 128);
    pdf.setFont("helvetica", "normal");
    pdf.text("Location", leftColumnX + 5, detailY + 6);
    pdf.setFontSize(11);
    pdf.setTextColor(17, 24, 39);
    pdf.setFont("helvetica", "bold");
    
    // Handle long location text
    const locationText = event.eventLocation;
    if (locationText.length > 35) {
      const words = locationText.split(' ');
      let line1 = '';
      let line2 = '';
      
      for (let word of words) {
        if ((line1 + word).length <= 35) {
          line1 += (line1 ? ' ' : '') + word;
        } else {
          line2 += (line2 ? ' ' : '') + word;
        }
      }
      
      pdf.text(line1, leftColumnX + 5, detailY + 13);
      if (line2) {
        pdf.setFontSize(9);
        pdf.text(line2, leftColumnX + 5, detailY + 17);
      }
    } else {
      pdf.text(locationText, leftColumnX + 5, detailY + 13);
    }

    // ===== PRICE BOX =====
    detailY += 32;
    pdf.setFillColor(229, 231, 235); // gray-200
    pdf.roundedRect(leftColumnX, detailY, 120, 22, 8, 6, 'F');
    
    pdf.setFontSize(13);
    pdf.setTextColor(75, 85, 99);
    pdf.setFont("helvetica", "normal");
    pdf.text("Ticket Price", leftColumnX + 8, detailY + 13);
    
    pdf.setFontSize(18);
    pdf.setTextColor(217, 119, 6); // yellow-600
    pdf.setFont("helvetica", "bold");
    const priceText = event.productPrice > 0 ? `$${event.productPrice}` : 'Free';
    pdf.text(priceText, leftColumnX + 112, detailY + 13, { align: "right" });

    // ===== QR CODE SECTION (Right Column) =====
const qrX = 140;
const qrY = 90 + 10;
const qrContainerWidth = 65;
const qrSize = 50;

// QR Code container with shadow effect - centered horizontally
pdf.setFillColor(255, 255, 255);
pdf.roundedRect(qrX - 5, qrY - 5, qrContainerWidth, 100, 8, 8, 'F');
pdf.setDrawColor(229, 231, 235);
pdf.setLineWidth(0.5);
pdf.roundedRect(qrX - 5, qrY - 5, qrContainerWidth, 100, 8, 8, 'D');

// Add QR code - centered in container
const qrCenterX = qrX - 5 + qrContainerWidth / 2;
pdf.addImage(qrCodeDataURL, 'PNG', qrCenterX - qrSize/2, qrY, qrSize, qrSize);

// QR code label - centered
pdf.setFontSize(8);
pdf.setTextColor(107, 114, 128);
pdf.text("Scan this code at the entrance", qrCenterX, qrY + 60, { align: "center" });

// Booking date - centered
pdf.text("Booked on", qrCenterX, qrY + 70, { align: "center" });
pdf.setFontSize(9);
pdf.setTextColor(17, 24, 39);
pdf.setFont("helvetica", "bold");
pdf.text(
  new Date(event.bookedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }),
  qrCenterX,
  qrY + 75,
  { align: "center" }
);
    // ===== FOOTER =====
    pdf.setFillColor(17, 24, 39); // gray-900
    pdf.rect(0, 265, 210, 32, 'F');

    // Footer text
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175); // gray-400
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Please bring this ticket (digital or printed) to the event.",
      105,
      275,
      { align: "center" }
    );
    pdf.text(
      "For questions, contact support@coursedeep.com",
      105,
      280,
      { align: "center" }
    );

    // Generated timestamp
    pdf.setFontSize(7);
    pdf.setTextColor(107, 114, 128);
    const generatedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    pdf.text(`Generated: ${generatedDate}`, 105, 288, { align: "center" });

    // Save PDF with clean filename
    const filename = `${event.productTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Ticket.pdf`;
    pdf.save(filename);

    console.log("✅ Ticket downloaded successfully");
    
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    alert("Failed to download ticket. Please try again.");
  }
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {/* Scrollable modal container */}
          <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-xl shadow-xl overflow-y-auto h-[90vh] p-6">
            {/* Main Ticket Container */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 py-4 sm:p-8 text-white relative overflow-hidden ">
                <div className="flex flex-col items-center relative z-10 space-y-1">
                  <h3 className="text-sm sm:text-lg font-semibold tracking-wider text-zinc-900">EVENT TICKET</h3>
                  <h1 className="text-2xl sm:text-4xl font-bold">{event.productTitle}</h1>
                  <p className="text-zinc-500 text-sm">Ticket ID: {event._id.slice(-12).toUpperCase()}</p>
                  <div className="sm:absolute right-0 top-0 flex items-center justify-end space-x-2 bg-green-500 px-3 py-1 rounded-full mt-1 sm:mt-0">
                      <BiCheckCircle />
                      <span className="text-xs font-semibold uppercase">{event.status}</span>
                    </div>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="relative">
                {/* Left Section */}
                <div className="px-3 py-6 sm:p-8 space-y-6">
                  {/* Attendee Info */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Attendee Information :</h3>
                    <div className="sm:space-y-2">
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{event.userName}</p>
                      <p className="text-gray-600">{event.userEmail}</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Event Details :</h3>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BiCalendar className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="sm:text-lg font-semibold text-gray-900">{formatDate(event.eventDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CgLock className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="sm:text-lg font-semibold text-gray-900">{event.eventTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BiMapPin className="text-pink-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="sm:text-lg font-semibold text-gray-900">{event.eventLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-gray-200 rounded-lg p-4 mt-6 sm:w-1/2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ticket Price</span>
                      <span className="text-xl sm:text-2xl font-bold text-yellow-600">{event.productPrice > 0 ? `$${event.productPrice}` : 'Free'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - QR */}
                <div className="sm:absolute top-10 right-0 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col items-center justify-center border-l-2 border-dashed border-gray-300">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                      <BsQrCode size={120} className="text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4 px-4">Scan this code at the entrance</p>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">Booked on</p>
                    <p className="text-sm font-semibold text-gray-600">
                      {new Date(event.bookedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-900 text-white px-8 py-4">
                <p className="text-xs text-gray-400 text-center">
                  Please bring this ticket (digital or printed) to the event. For questions, contact support@coursedeep.com
                </p>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 text-center">
              <button
              type="button"
                onClick={downloadTicket}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-smooth transform hover:scale-105 cursor-pointer"
              >
                Download Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTicket;