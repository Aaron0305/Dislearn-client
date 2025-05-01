import { useState } from 'react';
import { Link } from 'react-router-dom';

// Componentes de iconos personalizados para reemplazar lucide-react
const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const IconBrain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const IconBarChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10"></path>
    <path d="M18 20V4"></path>
    <path d="M6 20v-6"></path>
  </svg>
);

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const IconCheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="m9 11 3 3L22 4"></path>
  </svg>
);

const IconMessageCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

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
  
  // Datos para testimonios
  const testimonios = [
    {
      id: 1,
      nombre: "Ana Rodríguez",
      relacion: "Madre de Miguel, 9 años",
      texto: "Los ejercicios han transformado la actitud de mi hijo hacia la lectura. Ahora disfruta aprendiendo."
    },
    {
      id: 2,
      nombre: "Carlos Méndez",
      relacion: "Profesor de educación especial",
      texto: "Como especialista, valoro enormemente los recursos estructurados que ofrece esta plataforma."
    }
  ];

  return (
    <div className="min-h-screen bg-[#D6EADF]/20 font-sans">
      {/* Hero Section - mantiene sus colores actuales */}
      <section className="bg-gradient-to-r from-[#EAC4D5] to-[#95B8D1] pt-24 pb-16">
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
      </section>

      {/* Información sobre dislexia */}
      <section className="py-16 bg-white">
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
                        <span className="text-blue-600 mr-2 mt-0.5"><IconCheckCircle /></span>
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
                      <span className="text-blue-600 mr-2 mt-0.5"><IconCheckCircle /></span>
                      <span className="text-gray-700">Evaluación de habilidades de lectura y escritura</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><IconCheckCircle /></span>
                      <span className="text-gray-700">Pruebas de procesamiento fonológico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><IconCheckCircle /></span>
                      <span className="text-gray-700">Evaluación de la comprensión lectora</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><IconCheckCircle /></span>
                      <span className="text-gray-700">Realiza test</span>
                    </li>
                  </ul>
                  <p className="text-gray-700">La detección temprana es clave para la intervención efectiva.</p>
                  <div className="flex items-center mt-4 gap-2">
                    <span className="text-[#809BCE]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
              <span className="ml-1"><IconChevronRight /></span>
            </a>
          </div>
        </div>
      </section>

      {/* Características del programa */}
      <section className="py-16 bg-[#D6EADF]/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black">Nuestro enfoque integral</h2>
            <p className="text-black/80 mt-4">Combinamos tecnología, ciencia educativa y acompañamiento personalizado</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#EAC4D5]/30 rounded-full inline-block mb-4">
                <span className="text-[#809BCE]"><IconBrain /></span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Ejercicios interactivos</h3>
              <p className="text-black/70">Actividades multisensoriales diseñadas por especialistas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#EAC4D5]/30 rounded-full inline-block mb-4">
                <span className="text-[#809BCE]"><IconBarChart /></span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Seguimiento de progreso</h3>
              <p className="text-black/70">Monitorización detallada del avance con informes personalizados que permiten ajustar el plan de intervención según las necesidades específicas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios (ahora video) */}
      <section className="py-16 bg-[#B8E0D2]/10">
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
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#95B8D1] to-[#809BCE] py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Comienza el camino</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-black/90">Descubre cómo nuestro enfoque personalizado puede ayudar</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#EAC4D5] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#D6EADF]">Probar gratis</button>
            <button className="border-2 border-black text-black font-semibold px-8 py-3 rounded-md hover:bg-[#B8E0D2]/50">Agendar consulta</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#809BCE] text-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-blue-400"><IconBook /></span>
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
                <li><a href="#" className="hover:text-white">Testimonios</a></li>
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
      </footer>
    </div>
  );
}