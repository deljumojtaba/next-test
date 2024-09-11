import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (startDate: string, endDate: string) => void;
}

const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ isOpen, onClose, onSave }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSave = () => {
    onSave(startDate?.toISOString() || '', endDate?.toISOString() || '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-3xl max-w-md w-full font-poppins">
        <h2 className="text-lg font-bold text-center mb-6 text-primary">Set Start and End Dates</h2>

        <div className="flex flex-col space-y-6 mb-6">
          <div className="flex flex-col bg-gray-100 p-4 rounded-md">
            <label className="text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className="w-full p-2 border border-gray-300 rounded-md"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex flex-col bg-gray-100 p-4 rounded-md">
            <label className="text-sm font-medium text-gray-700 mb-2">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              className="w-full p-2 border border-gray-300 rounded-md"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={onClose} className="bg-gray-300 text-red-500 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-secondary text-white px-4 py-2 rounded">OK</button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectionModal;
