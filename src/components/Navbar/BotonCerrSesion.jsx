    import PropTypes from 'prop-types';

    export default function BotonCerrSesion({ onClick, variant = 'desktop' }) {
    const baseStyles = "relative overflow-hidden rounded-full group transition-all duration-300 flex items-center";
    const variants = {
        desktop: "px-6 py-2",
        mobile: "w-full px-4 py-3 justify-center"
    };

    return (
        <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]}`}
        >
        <span className={`absolute inset-0 w-full h-full bg-gradient-to-br from-[#EAC4D5] to-[#B8E0D2] group-hover:from-[#EAC4D5] group-hover:to-[#95B8D1] transition-all duration-300`}></span>
        <span className="relative flex items-center text-black font-medium">
            <span className="mr-2">👋</span>
            Cerrar sesión
        </span>
        </button>
    );
    }

    BotonCerrSesion.propTypes = {
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['desktop', 'mobile'])
    };