const EventMap = () => {
  return (
    <div className="mt-6 rounded overflow-hidden border border-gray-200">
      <iframe
        title="Event location"
        className="w-full h-72"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0965401238077!2d67.00586801501123!3d24.86146205227354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f0b0f0b0f0f%3A0x0!2sBarkat%20Market!5e0!3m2!1sen!2s!4v1620000000000"
        loading="lazy"
      />
    </div>
  );
};

export default EventMap;
