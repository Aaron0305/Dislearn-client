import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Book,
  Brain,
  BarChart,
  Users,
  ChevronRight,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animaciones base
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('que-es');
  
  // Datos para la sección de síntomas
  const sintomas = [
    "Dificultad para leer con fluidez",
    "Problemas para deletrear palabras",
    "Confusión de letras similares (b/d, p/q)",
    "Dificultad para seguir instrucciones escritas",
    "Problemas de comprensión lectora"
  ];

  // Hooks para cada sección
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [videoRef, videoInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <div className="min-h-screen bg-[#D6EADF]/20 font-sans">
      {/* Hero Section - mantiene sus colores actuales */}
      <motion.section
        ref={heroRef}
        variants={fadeUp}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        className="bg-gradient-to-r from-[#EAC4D5] to-[#95B8D1] pt-24 pb-16"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Apoyo integral para niños con dislexia</h1>
              <p className="text-xl mb-6 text-black">Recursos especializados, ejercicios interactivos y orientación profesional para superar los desafíos de la dislexia.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#B8E0D2] text-black font-semibold px-6 py-3 rounded-md hover:bg-[#D6EADF] transition-colors">Sobre nosotros</button>
              </div>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://th.bing.com/th/id/R.f7339975e716e6c503be29c1425ccdea?rik=siR0VlOHJC60fg&pid=ImgRaw&r=0" 
                alt="Niños felices aprendiendo" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Información sobre dislexia */}
      <motion.section
        ref={infoRef}
        variants={fadeUp}
        initial="hidden"
        animate={infoInView ? "visible" : "hidden"}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black">Entendiendo la Dislexia</h2>
            <p className="text-black/80 mt-4 max-w-2xl mx-auto">Información basada en investigaciones científicas para ayudar a padres, educadores y niños</p>
          </div>
          
          <div className="mb-8">
            <div className="flex border-b border-[#95B8D1]">
              <button 
                onClick={() => setActiveTab('que-es')}
                className={`px-4 py-2 font-medium ${activeTab === 'que-es' ? 'text-black border-b-2 border-[#EAC4D5]' : 'text-black/70'}`}
              >
                ¿Qué es?
              </button>
              <button 
                onClick={() => setActiveTab('sintomas')}
                className={`px-4 py-2 font-medium ${activeTab === 'sintomas' ? 'text-black border-b-2 border-[#EAC4D5]' : 'text-black/70'}`}
              >
                Síntomas
              </button>
              <button 
                onClick={() => setActiveTab('diagnostico')}
                className={`px-4 py-2 font-medium ${activeTab === 'diagnostico' ? 'text-black border-b-2 border-[#EAC4D5]' : 'text-black/70'}`}
              >
                Diagnóstico
              </button>
            </div>
            
            <div className="py-6">
              {activeTab === 'que-es' && (
                <div className="text-black">
                  <p className="text-gray-700 mb-4">La dislexia es un trastorno específico del aprendizaje de origen neurobiológico. Se caracteriza por dificultades en el reconocimiento preciso y fluido de palabras, y por problemas de ortografía y decodificación.</p>
                  <p className="text-gray-700 mb-4">Estas dificultades típicamente resultan de un déficit en el componente fonológico del lenguaje y suelen ser inesperadas en relación con otras habilidades cognitivas.</p>
                  <p className="text-gray-700">La dislexia afecta aproximadamente al 10-15% de la población mundial y no está relacionada con la inteligencia o el esfuerzo del niño.</p>
                </div>
              )}
              
              {activeTab === 'sintomas' && (
                <div>
                  <p className="text-gray-700 mb-4">Los síntomas de la dislexia pueden variar según la edad y la etapa de desarrollo, pero algunos signos comunes incluyen:</p>
                  <ul className="space-y-2">
                    {sintomas.map((sintoma, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-0.5"><CheckCircle size={20} /></span>
                        <span className="text-gray-700">{sintoma}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700 mt-4">Es importante recordar que estos síntomas pueden manifestarse de diferentes maneras en cada niño.</p>
                </div>
              )}
              
              {activeTab === 'diagnostico' && (
                <div>
                  <p className="text-gray-700 mb-4">El diagnóstico de la dislexia debe ser realizado por profesionales especializados como psicólogos educativos, logopedas o neuropsicólogos.</p>
                  <p className="text-gray-700 mb-4">El proceso suele incluir:</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><CheckCircle size={20} /></span>
                      <span className="text-gray-700">Evaluación de habilidades de lectura y escritura</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><CheckCircle size={20} /></span>
                      <span className="text-gray-700">Pruebas de procesamiento fonológico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><CheckCircle size={20} /></span>
                      <span className="text-gray-700">Evaluación de la comprensión lectora</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><CheckCircle size={20} /></span>
                      <span className="text-gray-700">Realiza test</span>
                    </li>
                  </ul>
                  <p className="text-gray-700">La detección temprana es clave para la intervención efectiva.</p>
                  <div className="flex items-center mt-4 gap-2">
                    <span className="text-[#809BCE]">
                      <ChevronRight size={20} />
                    </span>
                    <Link
                      to="/test"
                      className="bg-[#809BCE] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#EAC4D5] transition-colors"
                    >
                      Ir al test
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <a href="#" className="inline-flex items-center text-[#809BCE] font-medium hover:text-[#95B8D1]">
              Más información sobre dislexia
              <span className="ml-1"><ChevronRight size={20} /></span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Características del programa */}
      <motion.section
        ref={featuresRef}
        variants={fadeUp}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        className="py-16 bg-[#D6EADF]/20"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black">Nuestro enfoque integral</h2>
            <p className="text-black/80 mt-4">Combinamos tecnología, ciencia educativa y acompañamiento personalizado</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#EAC4D5]/30 rounded-full inline-block mb-4">
                <span className="text-[#809BCE]"><Brain size={24} /></span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Ejercicios interactivos</h3>
              <p className="text-black/70">Actividades multisensoriales diseñadas por especialistas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#EAC4D5]/30 rounded-full inline-block mb-4">
                <span className="text-[#809BCE]"><BarChart size={24} /></span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Seguimiento de progreso</h3>
              <p className="text-black/70">Monitorización detallada del avance con informes personalizados que permiten ajustar el plan de intervención según las necesidades específicas.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonios (ahora video) */}
      <motion.section
        ref={videoRef}
        variants={fadeUp}
        initial="hidden"
        animate={videoInView ? "visible" : "hidden"}
        className="py-16 bg-[#B8E0D2]/10"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Video recomendado</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Conoce más sobre la dislexia en este video</p>
          </div>
          <div className="flex justify-center">
            <div
              className="w-full"
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 24px #0001",
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/6l7dWaPS4lo"
                title="Video sobre dislexia"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        ref={ctaRef}
        variants={fadeUp}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        className="bg-gradient-to-r from-[#95B8D1] to-[#809BCE] py-16"
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Comienza el camino</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-black/90">Descubre cómo nuestro enfoque personalizado puede ayudar</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#EAC4D5] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#D6EADF]">Probar gratis</button>
            <button className="border-2 border-black text-black font-semibold px-8 py-3 rounded-md hover:bg-[#B8E0D2]/50">Agendar consulta</button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        ref={footerRef}
        variants={fadeUp}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        className="bg-[#809BCE] text-black py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-blue-400"><Book size={24} /></span>
                <h2 className="ml-2 text-lg font-bold text-white">DislexiaAyuda</h2>
              </div>
              <p className="text-sm">Soluciones efectivas e integrales para niños con dislexia, basadas en evidencia científica y adaptadas a cada necesidad.</p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Guías para padres</a></li>
                <li><a href="#" className="hover:text-white">Material didáctico</a></li>
                <li><a href="#" className="hover:text-white">Biblioteca de ejercicios</a></li>
                <li><a href="#" className="hover:text-white">Blog especializado</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Acerca de</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Nuestro equipo</a></li>
                <li><a href="#" className="hover:text-white">Metodología</a></li>
                <li><a href="#" className="hover:text-white">Colaboradores</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li>info@dislexiaayuda.com</li>
                <li>+52 7122186324</li>
                <li>Mexico , Estado de Mexico</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} DislexiaAyuda. Todos los derechos reservados.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}