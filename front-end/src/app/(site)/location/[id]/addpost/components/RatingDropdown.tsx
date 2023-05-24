import Select from 'react-select';
import { useEffect, useState } from 'react';

interface RatingOption {
  value: number;
  label: string;
}

interface RatingDropdownProps {
    onRatingSelect: (rating: number | null) => void;
  }

const RatingDropdown: React.FC<RatingDropdownProps> = ({onRatingSelect}) => {
  const [selectedRating, setSelectedRating] = useState<RatingOption | null>(null);

  // Rating Options
  const ratingOptions: RatingOption[] = [
    { value: 1, label: '1 Star (Poor)' },
    { value: 2, label: '2 Star (Average)' },
    { value: 3, label: '3 Star (Good)' },
    { value: 4, label: '4 Star (Outstading)' },
    { value: 5, label: '5 Star (Excellent)' },
  ];

  const handleRatingChange = (selectedOption: RatingOption | null) => {
    setSelectedRating(selectedOption);
    const rating = selectedOption ? (selectedOption as RatingOption).value : null;
    onRatingSelect(rating);
  };

  return (
    <Select<RatingOption, false>
      options={ratingOptions}
      value={selectedRating}
      onChange={handleRatingChange}
      placeholder="Select a rating"
    />
  );
};

export default RatingDropdown;

