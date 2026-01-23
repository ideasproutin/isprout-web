import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import linkedinIcon from '../../assets/footer/Linkedin.png';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  description: string;
  fullDescription: string;
  linkedin: string;
}

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ isOpen, onClose, member }) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 z-40 flex items-center justify-center p-4 pt-24"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-[900px] max-h-[85vh] flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="bg-[#FFD700] px-4 md:px-6 py-3 flex justify-between items-center shrink-0">
                <h2 className="text-black font-bold text-lg md:text-xl">{member.name}</h2>
                <div className="flex items-center gap-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-[#ffffff] rounded hover:bg-[#005885] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={linkedinIcon}  alt="LinkedIn" className="w-4 h-4" />
                  </a>
                  <button
                      onClick={onClose}
                      className="w-8 h-8 flex items-center justify-center rounded bg-white text-black hover:bg-black/10 transition-colors text-lg font-semibold">
                      ✕
                    </button>

                </div>
              </div>

              {/* Content Area - Two Column Layout */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* LEFT PANEL - Text Content */}
                <div className="flex-1 p-6 md:p-8 overflow-y-auto order-2 md:order-1">
                  {/* Position Badge */}
                  <div className="bg-[#FFD700] inline-block px-4 py-2 rounded mb-4">
                    <p className="text-black font-bold text-sm md:text-base">{member.position}</p>
                  </div>

                  {/* Full Description */}
                  <div className="text-gray-700 text-[15px] md:text-base leading-relaxed space-y-4">
                    <p>{member.fullDescription}</p>
                  </div>
                </div>

                {/* RIGHT PANEL - Image */}
                <div className="md:w-[380px] lg:w-[420px] h-80 md:h-auto shrink-0 order-1 md:order-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 shrink-0">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded transition-colors"
                >
                  Close
                </button>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{color:'white'}}
                  className="px-6 py-2.5 bg-[#00275c] hover:bg-[#001a3d] text-white font-semibold rounded transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TeamMemberModal;
