import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://api.whatsapp.com/send/?phone=558532025400", '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-40"
      aria-label="Contato WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </button>
  );
}
