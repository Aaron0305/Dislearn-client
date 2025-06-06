    // src/components/LoadingSpinner/index.jsx
    export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#3A6EA5]"></div>
        </div>
    );
    }