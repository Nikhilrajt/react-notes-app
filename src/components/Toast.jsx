function Toast({ message }) {
    if (!message) {
        return null;
    }

    return (
        <div className="fixed top-5 right-5 z-50 rounded-lg bg-gray-900 px-5 py-3 text-white shadow-lg">
            {message}
        </div>
    );
}

export default Toast;