import React from 'react';

const Input = ({ name, setName }: InputProps) => {
    return (
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
        />
      </div>
    );
};

export default Input;

interface InputProps {
    name: string;
    setName: (name: string) => void;
}