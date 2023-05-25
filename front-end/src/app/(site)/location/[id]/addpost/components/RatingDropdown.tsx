import Select from 'react-select';
import { useEffect, useState } from 'react';
import styling from "../page.module.css";

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
    { value: 1, label: '★ (Poor)' },
    { value: 2, label: '★★ (Average)' },
    { value: 3, label: '★★★ (Good)' },
    { value: 4, label: '★★★★ (Outstanding)' },
    { value: 5, label: '★★★★★ (Excellent)' },
  ];

  const handleRatingChange = (selectedOption: RatingOption | null) => {
    setSelectedRating(selectedOption);
    const rating = selectedOption ? (selectedOption as RatingOption).value : null;
    onRatingSelect(rating);
  };

  return (
    <Select<RatingOption, false>
      className={styling.rating}
      options={ratingOptions}
      value={selectedRating}
      onChange={handleRatingChange}
      placeholder="Select rating"
    />
  );
};

export default RatingDropdown;

