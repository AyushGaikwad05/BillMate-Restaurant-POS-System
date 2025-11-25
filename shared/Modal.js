export default function Modal({ title, onClose, isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-2xl p-5 shadow-xl w-full max-w-lg relative">
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <h2 className="text-xl text-[#f5f5f5] font-semibold">{title}</h2>
          <button
            className="text-gray-400 text-2xl hover:text-gray-200 transition"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="p-5 text-gray-200">{children}</div>
      </div>
    </div>
  );
}
