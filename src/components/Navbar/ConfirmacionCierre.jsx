    import PropTypes from 'prop-types';

    export default function ConfirmacionCierre({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 animate-fadeIn">
        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl animate-scaleIn">
            <div className="text-center mb-2">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Confirmar cierre de sesión</h3>
            <p className="text-gray-600 mt-2">¿Estás seguro de que deseas salir de tu cuenta?</p>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
            <button
                onClick={onCancel}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors min-w-[120px]"
            >
                Cancelar
            </button>
            <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#FF4D4D] to-[#F94444] text-white hover:from-[#FF4D4D] hover:to-[#E63C3C] transition-all min-w-[120px]"
            >
                Cerrar sesión
            </button>
            </div>
        </div>
        </div>
    );
    }

    ConfirmacionCierre.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
    };