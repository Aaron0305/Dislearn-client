    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';

    const palette = {
    blue: "#61A0AF",
    pink: "#F06C9B",
    lightPink: "#F9B9B7",
    yellow: "#F5D491",
    };

    const estadosYMunicipios = {
    "Aguascalientes": ["Aguascalientes", "Calvillo", "Jesús María"],
    "Baja California": ["Tijuana", "Mexicali", "Ensenada"],
    "Baja California Sur": ["La Paz", "Los Cabos", "Comondú"],
    "Campeche": ["Campeche", "Ciudad del Carmen", "Champotón"],
    "Chiapas": ["Tuxtla Gutiérrez", "San Cristóbal de las Casas", "Tapachula"],
    "Chihuahua": ["Chihuahua", "Ciudad Juárez", "Delicias"],
    "Ciudad de México": ["Álvaro Obregón", "Coyoacán", "Iztapalapa"],
    "Estado de México": ["Ecatepec", "Naucalpan", "Toluca"],
    "Jalisco": ["Guadalajara", "Puerto Vallarta", "Zapopan"],
    "Nuevo León": ["Monterrey", "Guadalupe", "San Nicolás de los Garza"],
    "Puebla": ["Puebla", "Tehuacán", "Atlixco"],
    "Veracruz": ["Veracruz", "Xalapa", "Coatzacoalcos"]
    };
    const estados = Object.keys(estadosYMunicipios);

    const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)\.[a-zA-Z]{2,}$/;
    return regex.test(email);
    };

    const validatePassword = (password) => password.length >= 8;

    const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nombre: "",
        estado: "",
        municipio: "",
        colonia: "",
        calle: "",
        numero: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // URL base del backend (ajusta esto según tu configuración)
    const API_URL = "http://localhost:3001/api";
    const GOOGLE_AUTH_URL = "http://localhost:3001/auth/google";

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData(prev => ({
        ...prev,
        [field]: value,
        ...(field === "estado" && { municipio: "" })
        }));
    };

    const municipios = estadosYMunicipios[formData.estado] || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validación de campos
        if (!validateEmail(formData.email)) {
        setError("Por favor, ingresa un correo electrónico válido");
        setLoading(false);
        return;
        }
        if (!validatePassword(formData.password)) {
        setError("La contraseña debe tener al menos 8 caracteres");
        setLoading(false);
        return;
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return;
        }

        try {
        let response;

        if (isLogin) {
            // Petición de inicio de sesión
            response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Para manejar cookies de sesión
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
            });
        } 
        else {
        // Petición de registro
        const userData = {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        direccion: {
            estado: formData.estado,
            municipio: formData.municipio,
            colonia: formData.colonia,
            calle: formData.calle,
            numero: formData.numero
        }
        };

        response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // <-- Agregado para manejar cookies/sesión y CORS
        body: JSON.stringify(userData),
        });
    }
// ...código existente...
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error');
        }

        // Guardar token en localStorage (o puedes usar cookies)
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        // Redireccionar al usuario a la página principal o dashboard
        navigate('/dashboard');

        } catch (error) {
        setError(error.message || 'Error en el servidor');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div
        className="min-h-screen flex items-center justify-center"
        style={{
            background: `linear-gradient(135deg, ${palette.yellow} 0%, ${palette.lightPink} 40%, ${palette.pink} 70%, ${palette.blue} 100%)`
        }}
        >
        <div className="relative rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 backdrop-blur-xl group overflow-hidden"
            style={{
            background: `rgba(255,255,255,0.7)`,
            boxShadow: `0 8px 32px 0 ${palette.blue}33`,
            }}
        >
            {/* Animated gradient border */}
            <div
            className="absolute -inset-1 rounded-3xl z-0 pointer-events-none animate-gradient-move"
            style={{
                background: `linear-gradient(120deg, ${palette.blue} 0%, ${palette.pink} 50%, ${palette.yellow} 100%)`,
                filter: 'blur(18px)',
                opacity: 0.25,
            }}
            ></div>
            {/* Title */}
            <h1
            className="relative z-10 text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent"
            style={{
                backgroundImage: `linear-gradient(90deg, ${palette.blue}, ${palette.pink}, ${palette.yellow})`
            }}
            >
            {isLogin ? "Iniciar Sesión" : "Registro"}
            </h1>
            <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div className="input-box relative">
                <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange("email")}
                required
                className="peer w-full pl-10 px-4 py-3 bg-white/80 rounded-xl border border-[#61A0AF]/30 shadow-inner outline-none focus:ring-2 focus:ring-[#F06C9B] transition-all duration-300 placeholder:text-[#61A0AF]/60 text-[#034078] font-semibold"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#61A0AF] opacity-0 peer-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
                </span>
            </div>
            <div className="input-box relative">
                <input
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange("password")}
                required
                className="peer w-full pl-10 px-4 py-3 bg-white/80 rounded-xl border border-[#F06C9B]/30 shadow-inner outline-none focus:ring-2 focus:ring-[#F06C9B] transition-all duration-300 placeholder:text-[#F06C9B]/60 text-[#034078] font-semibold"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F06C9B] opacity-0 peer-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01"/><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
            </div>
            {!isLogin && (
                <>
                <div className="input-box relative">
                    <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    required
                    className="peer w-full pl-10 px-4 py-3 bg-white/80 rounded-xl border border-[#F06C9B]/30 shadow-inner outline-none focus:ring-2 focus:ring-[#F06C9B] transition-all duration-300 placeholder:text-[#F06C9B]/60 text-[#034078] font-semibold"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F06C9B] opacity-0 peer-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01"/><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                </div>
                <div className="input-box relative">
                    <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.nombre}
                    onChange={handleChange("nombre")}
                    required
                    className="peer w-full pl-10 px-4 py-3 bg-white/80 rounded-xl border border-[#61A0AF]/30 shadow-inner outline-none focus:ring-2 focus:ring-[#61A0AF] transition-all duration-300 placeholder:text-[#61A0AF]/60 text-[#034078] font-semibold"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#61A0AF] opacity-0 peer-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    </span>
                </div>
                <div className="flex gap-2">
                    <select
                    value={formData.estado}
                    onChange={handleChange("estado")}
                    required
                    className="w-1/2 px-3 py-2 rounded-xl border border-[#61A0AF]/30 bg-white/80 text-[#034078] focus:ring-2 focus:ring-[#61A0AF] transition-all duration-300"
                    >
                    <option value="" disabled>Estado</option>
                    {estados.map((estado) => (
                        <option key={estado} value={estado}>{estado}</option>
                    ))}
                    </select>
                    <select
                    value={formData.municipio}
                    onChange={handleChange("municipio")}
                    required
                    disabled={!formData.estado}
                    className="w-1/2 px-3 py-2 rounded-xl border border-[#61A0AF]/30 bg-white/80 text-[#034078] focus:ring-2 focus:ring-[#61A0AF] transition-all duration-300"
                    >
                    <option value="" disabled>Municipio</option>
                    {municipios.map((municipio) => (
                        <option key={municipio} value={municipio}>{municipio}</option>
                    ))}
                    </select>
                </div>
                <div className="input-box relative">
                    <input
                    placeholder="Colonia"
                    value={formData.colonia}
                    onChange={handleChange("colonia")}
                    type="text"
                    required
                    className="peer w-full pl-10 px-4 py-3 bg-white/80 rounded-xl border border-[#F06C9B]/60 shadow-inner outline-none focus:ring-2 focus:ring-[#F06C9B] transition-all duration-300 placeholder:text-[#F06C9B]/80 text-[#034078] font-semibold"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F06C9B] opacity-0 peer-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                    </span>
                </div>
                <div className="flex gap-2">
                    <input
                    placeholder="Calle"
                    value={formData.calle}
                    onChange={handleChange("calle")}
                    type="text"
                    required
                    className="w-2/3 pl-10 px-4 py-3 bg-white/80 rounded-xl border border-[#F06C9B]/60 shadow-inner outline-none focus:ring-2 focus:ring-[#F06C9B] transition-all duration-300 placeholder:text-[#F06C9B]/80 text-[#034078] font-semibold"
                    />
                    <input
                    placeholder="Número"
                    value={formData.numero}
                    onChange={e => {
                        if (!isNaN(e.target.value)) handleChange("numero")(e);
                    }}
                    type="text"
                    required
                    className="w-1/3 px-4 py-3 bg-white/80 rounded-xl border border-[#F06C9B]/60 shadow-inner outline-none focus:ring-2 focus:ring-[#F06C9B] transition-all duration-300 placeholder:text-[#F06C9B]/80 text-[#034078] font-semibold"
                    />
                </div>
                </>
            )}
            {isLogin && (
                <div className="flex flex-col gap-3">
                <button
                    type="button"
                    onClick={() => window.location.href = GOOGLE_AUTH_URL}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white border border-[#61A0AF]/40 shadow hover:bg-[#F9B9B7]/40 hover:shadow-lg transition-all duration-300 font-semibold text-[#034078] hover:text-[#F06C9B] focus:outline-none focus:ring-4 focus:ring-[#F06C9B]/30"
                >
                    <svg width="24" height="24" viewBox="0 0 48 48" className="inline-block">
                    <g>
                        <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6-6C34.5 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                        <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c2.7 0 5.2.9 7.2 2.5l6-6C34.5 5.1 29.5 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/>
                        <path fill="#FBBC05" d="M24 43c5.4 0 10.5-1.8 14.4-5l-6.6-5.4C29.5 34.9 26.9 36 24 36c-5.6 0-10.3-3.8-12-9H5.2v5.7C9.5 39.9 16.2 43 24 43z"/>
                        <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-3.5 5.4-6.3 6.6l6.6 5.4C41.2 37.2 44 31.9 44 24c0-1.3-.1-2.7-.4-3.5z"/>
                    </g>
                    </svg>
                    Iniciar sesión con Google
                </button>
                <div className="flex items-center gap-2 my-2">
                    <span className="flex-1 h-px bg-[#61A0AF]/30"></span>
                    <span className="text-xs text-[#034078]/60">o</span>
                    <span className="flex-1 h-px bg-[#61A0AF]/30"></span>
                </div>
                </div>
            )}
            {error && <div className="text-center text-[#F06C9B] font-semibold">{error}</div>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#61A0AF] via-[#F06C9B] to-[#F5D491] text-[#034078] font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#F06C9B]/40 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                boxShadow: `0 4px 24px 0 ${palette.pink}33`
                }}
            >
                {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#034078]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {isLogin ? "Iniciando..." : "Registrando..."}
                </>
                ) : (
                isLogin ? "Iniciar Sesión" : "Registrarse"
                )}
            </button>
            <div className="mt-6 text-center text-sm text-[#034078] flex items-center justify-center gap-2">
                {isLogin ? (
                <>
                    <span>¿No tienes cuenta?</span>
                    <button
                    className="text-[#F06C9B] hover:underline font-semibold transition-colors duration-200 flex items-center gap-1"
                    onClick={e => { e.preventDefault(); setIsLogin(false); }}
                    type="button"
                    >
                    Registrarse
                    </button>
                </>
                ) : (
                <>
                    <span>¿Ya tienes cuenta?</span>
                    <button
                    className="text-[#61A0AF] hover:underline font-semibold transition-colors duration-200 flex items-center gap-1"
                    onClick={e => { e.preventDefault(); setIsLogin(true); }}
                    type="button"
                    >
                    Iniciar Sesión
                    </button>
                </>
                )}
            </div>
            </form>
            {/* Glassmorphism overlay for extra effect */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#F06C9B] group-hover:shadow-[0_0_32px_0_#F06C9B] transition-all duration-500 z-10"></div>
        </div>
        {/* Animación de fondo */}
        <style>
            {`
            @keyframes gradient-move {
                0% { filter: blur(18px); opacity: 0.25; }
                50% { filter: blur(24px); opacity: 0.4; }
                100% { filter: blur(18px); opacity: 0.25; }
            }
            .animate-gradient-move {
                animation: gradient-move 6s ease-in-out infinite;
            }
            `}
        </style>
        </div>
    );
    };

    export default Login;