import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const InputBlock = ({ text, onRemove }) => {
  return (
    <div className="flex items-center text-settingsGreen border border-gray-300 p-2 rounded-md shadow-sm space-x-2">
      <span>{text}</span>
      <button onClick={onRemove} className="text-gray-500 hover:text-red-500 transition duration-300">
        <X size={16} />
      </button>
    </div>
  );
};

InputBlock.propTypes = {
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default InputBlock;
