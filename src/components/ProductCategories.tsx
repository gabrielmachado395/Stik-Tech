import { container, item } from './animations/StaggeredEffect';
import { motion } from 'framer-motion';
import { useGoTo } from './utils/navigation';

const categories = [
    {
        name: 'Elásticos Crus',
        image: '/img/Categorias/Elásticos Crus/beta-stik (1).png',
        slug: 'elasticos-crus',
    },
    {
        name: 'Modeladores',
        image: '/img/Categorias/Modeladores/cinta-stik.png',
        slug: 'modeladores',
    },
    {
        name: 'Alças',
        image: '/img/Categorias/Alças/dayane-stik.png',
        slug: 'alcas',
    },
    {
        name: 'Bases',
        image: '/img/Categorias/Bases/caricia-stik.png',
        slug: 'bases',
    },
    {
        name: 'Viés',
        image: '/img/Categorias/Viés/sud-stik.png',
        slug: 'vies',
    },
    {
        name: 'Premium',
        image: '/img/Categorias/Premium/belly-stik.png',
        slug: 'premium',
    },
    {
        name: 'Rendas',
        image: '/img/Categorias/Rendas/ana-stik.png',
        slug: 'rendas',
    },
    {
        name: 'Personalizados',
        image: '/img/Categorias/Personalizados/alcaatena-stik.png',
        slug: 'personalizados',
    }
]

export default function ProductCategories() {
    const goTo = useGoTo();

    return (
        <section className="py-10 md:py-16 bg-white">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-800 tracking-wide">
                Categorias de Produtos
                </h2>
                <motion.div
                    className="flex md:flex-wrap flex-nowrap
                    justify-start md:justify-center gap-x-6 md:gap-12
                    overflow-x-auto md:overflow-x-visibile
                    px-4 md:px-0
                    scrollbar-thin scrollbar-thumb-gray-300
                    pb-2"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {categories.map((cat) => (
                        <motion.div 
                            key={cat.name} 
                            className="flex flex-col items-center w-24 md:w-32" 
                            variants={item}
                        >
                            <div onClick={() => goTo(`/categorias/${cat.slug.toLowerCase().replace(/\s/g, "-")}`)} className="w-24 h-24 hover:shadow-xl transition-shadow md:w-32 md:h-32 rounded-full overflow-hidden shadow-md border-2 border-gray-200 mb-2 bg-gray-100 flex items-center justify-center">
                                <img
                                src={cat.image}
                                alt={cat.name}
                                className="object-cover w-full h-full"
                                loading="lazy"
                                />
                            </div>
                            <span className="text-ms md:text-2xl font-semibold text-gray-800 text-center mt-1">
                                {cat.name}
                            </span>
                    
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        );   
    }