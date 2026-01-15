// Tela de confirmação de envio de email para login
import { Link } from 'react-router-dom';
import { AnimatedSection } from '../../animations/AnimatedSections';
export default function LoginConfirmationEmail() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 px-4">
            <AnimatedSection>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-[#181C23]">Confirmação de Email Enviada</h2>
                <p className="text-gray-700 mb-6">
                    Um email de confirmação foi enviado para o endereço fornecido. Por favor, verifique sua caixa de entrada e siga as instruções para completar o login.
                </p>
                <Link to="/login" className="text-[#5483B3] font-semibold hover:underline">
                    Voltar para a página de login
                </Link>
            </div>
    </AnimatedSection>
        </div>
    );
}
