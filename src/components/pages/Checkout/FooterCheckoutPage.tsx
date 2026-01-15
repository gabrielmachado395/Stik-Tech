function FooterCheckoutPage() {
  return (

<div className="border-t mt-12 pt-8 pb-4 bg-gray-50 w-full h-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-48 px-4">
          {/* Formas de pagamento */}
          <div className="flex flex-col items-center">
            <span className="text-[#5483B3] font-medium mb-4">Formas de pagamento</span>
            <div className="flex gap-2">
              {/* Substitua por imagens reais se quiser */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Amex-card1708.jpg" alt="Amex" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/10/Logo-ELO-NEG-Black.png" alt="Elo" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Pix_%28Brazil%29_logo.svg" alt="Pix" className="h-6" />
              {/* ...adicione outros se quiser */}
            </div>
          </div>
          {/* Ambiente seguro */}
          <div className="flex flex-col items-center">
            <span className="text-[#5483B3] font-medium mb-4">Ambiente Seguro</span>
            <div className="flex gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Google_Safe_Browsing.svg" alt="Google Safe Browsing" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Logo_pagarme.png" alt="Pagar.me" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/VTEX_logo.png" alt="VTEX" className="h-6" />
              {/* ...adicione outros se quiser */}
            </div>
          </div>
          {/* Redes sociais */}
        </div>
      </div>
  );
}

export default FooterCheckoutPage;