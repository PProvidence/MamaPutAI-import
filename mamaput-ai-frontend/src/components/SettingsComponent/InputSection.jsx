import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { useState } from "react";
import InputBlock from "./inputBlocks";

const InputSection = ({ title, list, setList }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() && !list.includes(newItem)) {
      setList([...list, newItem]);
      setNewItem("");
      setIsOpened(false);
    }
  };

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="settings-section">
      <h2 className="settings--form-heading">{title}</h2>

      {/* List Items */}
      <div className="flex gap-3 flex-wrap">
        {list.map((item, index) => (
          <InputBlock key={index} text={item} onRemove={() => removeItem(index)} />
        ))}
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={() => setIsOpened(!isOpened)}
        className="mt-4 text-settingsGreen flex items-center space-x-2 hover:text-green-700 transition duration-300"
      >
        <Plus size={16} />
        <span>Add new {title.toLowerCase()}</span>
      </button>

      {/* Input Field */}
      {isOpened && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Enter ${title.toLowerCase()}...`}
            className="form-input-field"
          />
          <button
            onClick={addItem}
            className="bg-settingsGreen text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

// 🔹 Prop Validation
InputSection.propTypes = {
  title: PropTypes.string.isRequired, // Must be a string
  list: PropTypes.arrayOf(PropTypes.string).isRequired, // Must be an array of strings
  setList: PropTypes.func.isRequired, // Must be a function
};

export default InputSection;
