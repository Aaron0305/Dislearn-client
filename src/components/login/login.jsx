    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useUser } from '../../contexts/UserContext';

    const palette = {
    blue: "#61A0AF",
    pink: "#F06C9B",
    lightPink: "#F9B9B7",
    yellow: "#F5D491"
    };

    const API_URL = "https://dislearn-server.vercel.app/";
    const GOOGLE_AUTH_URL = `${API_URL}/auth/google/login`;

    const checkEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)\.[a-zA-Z]{2,}$/;
    return regex.test(email);
    };

    const checkPasswordStrength = (password) => password.length >= 8;

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
    const [estadosData, setEstadosData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login: contextLogin } = useUser();

    useEffect(() => {
        const fetchEstados = async () => {
        try {
            const res = await fetch(`${API_URL}/api/estados`);
            const data = await res.json();
            setEstadosData(data);
        } catch (error) {
            setErrorMsg("Error al cargar estados y municipios");
            console.error("Error al cargar estados:", error);
        }
        };
        fetchEstados();
    }, []);

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "estado" && { municipio: "" })
        }));
    };

    const municipios = estadosData.find(e => e.estado === formData.estado)?.municipios || [];

    const validateForm = () => {
        if (!checkEmailFormat(formData.email)) {
        setErrorMsg("El formato del correo electrónico no es válido");
        return false;
        }
        
        if (!checkPasswordStrength(formData.password)) {
        setErrorMsg("La contraseña debe tener al menos 8 caracteres");
        return false;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
        setErrorMsg("Las contraseñas no coinciden");
        return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        
        if (!validateForm()) return;
        
        setLoading(true);

        try {
        let response;
        if (isLogin) {
            response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            })
            });
        } else {
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
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userData),
            });
        }

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Error en el servidor");

        if (data.user) {
            contextLogin(data.user);
            navigate('/');
        }
        } catch (error) {
        setErrorMsg(error.message);
        console.error("Error en autenticación:", error);
        } finally {
        setLoading(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
        window.location.href = GOOGLE_AUTH_URL;
        } catch (error) {
        setErrorMsg("Error al intentar iniciar sesión con Google");
        setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const userParam = urlParams.get("user");
        const error = urlParams.get("error");

        if (error) {
        setErrorMsg("Error en la autenticación con Google");
        return;
        }

        if (token && userParam) {
        try {
            const user = JSON.parse(decodeURIComponent(userParam));
            localStorage.setItem("token", token);
            contextLogin(user);
            navigate("/");
        } catch (error) {
            console.error("Error al procesar autenticación:", error);
            setErrorMsg("Error al procesar la autenticación con Google");
        }
        }
    }, [navigate, contextLogin]);

    return (
        <div className="min-h-screen flex items-center justify-center"
        style={{
            background: `linear-gradient(135deg, ${palette.yellow} 0%, ${palette.lightPink} 40%, ${palette.pink} 70%, ${palette.blue} 100%)`
        }}>
        <div className="relative rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 backdrop-blur-xl group overflow-hidden"
            style={{
            background: `rgba(255,255,255,0.7)`,
            boxShadow: `0 8px 32px 0 ${palette.blue}33`,
            }}>
            <div className="absolute -inset-1 rounded-3xl z-0 pointer-events-none animate-gradient-move"
            style={{
                background: `linear-gradient(120deg, ${palette.blue} 0%, ${palette.pink} 50%, ${palette.yellow} 100%)`,
                filter: 'blur(18px)',
                opacity: 0.25,
            }}></div>

            <h1 className="relative z-10 text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent"
            style={{
                backgroundImage: `linear-gradient(90deg, ${palette.blue}, ${palette.pink}, ${palette.yellow})`
            }}>
            {isLogin ? "Iniciar Sesión" : "Registro"}
            </h1>

            <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="Correo electrónico" 
                value={formData.email} 
                onChange={handleChange("email")} 
                required 
                className="input" 
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={formData.password} 
                onChange={handleChange("password")} 
                required 
                className="input" 
            />

            {!isLogin && (
                <>
                <input 
                    type="password" 
                    placeholder="Confirmar Contraseña" 
                    value={formData.confirmPassword} 
                    onChange={handleChange("confirmPassword")} 
                    required 
                    className="input" 
                />
                <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    value={formData.nombre} 
                    onChange={handleChange("nombre")} 
                    required 
                    className="input" 
                />

                <div className="flex gap-2">
                    <select 
                    value={formData.estado} 
                    onChange={handleChange("estado")} 
                    required 
                    className="input w-1/2"
                    >
                    <option value="" disabled>Estado</option>
                    {estadosData.map(e => (
                        <option key={e.estado} value={e.estado}>{e.estado}</option>
                    ))}
                    </select>

                    <select 
                    value={formData.municipio} 
                    onChange={handleChange("municipio")} 
                    required 
                    className="input w-1/2" 
                    disabled={!formData.estado}
                    >
                    <option value="" disabled>Municipio</option>
                    {municipios.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                    </select>
                </div>

                <input 
                    placeholder="Colonia" 
                    value={formData.colonia} 
                    onChange={handleChange("colonia")} 
                    required 
                    className="input" 
                />
                <div className="flex gap-2">
                    <input 
                    placeholder="Calle" 
                    value={formData.calle} 
                    onChange={handleChange("calle")} 
                    required 
                    className="input w-2/3" 
                    />
                    <input 
                    placeholder="Número" 
                    value={formData.numero} 
                    onChange={e => !isNaN(e.target.value) && handleChange("numero")(e)} 
                    required 
                    className="input w-1/3" 
                    />
                </div>
                </>
            )}

            {isLogin && (
                <>
                <button 
                    type="button" 
                    onClick={handleGoogleLogin} 
                    className="google-button"
                    disabled={loading}
                >
                    <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Iniciar sesión con Google
                    </div>
                </button>
                <div className="text-center text-sm text-[#034078] my-3">o</div>
                </>
            )}

            {errorMsg && <div className="text-center text-[#F06C9B] font-semibold">{errorMsg}</div>}

            <button 
                type="submit" 
                disabled={loading} 
                className="submit-button"
            >
                {loading ? (
                isLogin ? "Iniciando..." : "Registrando..."
                ) : (
                isLogin ? "Iniciar Sesión" : "Registrarse"
                )}
            </button>

            <div className="mt-6 text-center text-sm text-[#034078] flex items-center justify-center gap-2">
                {isLogin ? (
                <>
                    <span>¿No tienes cuenta?</span>
                    <button 
                    className="text-[#F06C9B] hover:underline font-semibold" 
                    onClick={(e) => { e.preventDefault(); setIsLogin(false); }} 
                    type="button"
                    >
                    Registrarse
                    </button>
                </>
                ) : (
                <>
                    <span>¿Ya tienes cuenta?</span>
                    <button 
                    className="text-[#61A0AF] hover:underline font-semibold" 
                    onClick={(e) => { e.preventDefault(); setIsLogin(true); }} 
                    type="button"
                    >
                    Iniciar Sesión
                    </button>
                </>
                )}
            </div>
            </form>

            <style jsx>{`
            .input {
                padding: 12px;
                margin-top: 5px;
                background-color: rgba(255,255,255,0.8);
                border: 1px solid #ccc;
                border-radius: 0.75rem;
                width: 100%;
                font-weight: 600;
                color: #034078;
                outline: none;
                transition: border-color 0.3s;
            }
            .input:focus {
                border-color: ${palette.blue};
            }
            .google-button {
                width: 100%;
                padding: 12px;
                background: white;
                border: 1px solid #ccc;
                border-radius: 0.75rem;
                font-weight: 600;
                color: #034078;
                cursor: pointer;
                transition: all 0.3s;
            }
            .google-button:hover {
                background: #f8f8f8;
                border-color: ${palette.blue};
            }
            .google-button:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            .submit-button {
                width: 100%;
                padding: 12px;
                background: linear-gradient(to right, ${palette.blue}, ${palette.pink}, ${palette.yellow});
                border-radius: 0.75rem;
                color: white;
                font-weight: bold;
                border: none;
                cursor: pointer;
                transition: all 0.3s;
            }
            .submit-button:hover {
                opacity: 0.9;
                transform: translateY(-1px);
            }
            .submit-button:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none;
            }
            @keyframes gradient-move {
                0% { filter: blur(18px); opacity: 0.25; }
                50% { filter: blur(24px); opacity: 0.4; }
                100% { filter: blur(18px); opacity: 0.25; }
            }
            .animate-gradient-move {
                animation: gradient-move 6s ease-in-out infinite;
            }
            `}</style>
        </div>
        </div>
    );
    };

    export default Login;