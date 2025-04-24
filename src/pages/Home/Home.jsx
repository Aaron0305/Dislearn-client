export default function Home() {
    return (
      <div className="home">
        <section className="hero">
          <h1>Ayuda para niños con dislexia</h1>
          <p>Juegos y ejercicios diseñados para mejorar la lectura y escritura</p>
        </section>
        
        <section className="features">
          <div className="feature-card">
            <h3>Ejercicios interactivos</h3>
            <p>Diseñados por especialistas en dislexia</p>
          </div>
          <div className="feature-card">
            <h3>Seguimiento de progreso</h3>
            <p>Monitoriza las mejoras del niño</p>
          </div>
          <div className="feature-card">
            <h3>Interfaz amigable</h3>
            <p>Diseñada para ser accesible y divertida</p>
          </div>
        </section>
      </div>
    )
  }