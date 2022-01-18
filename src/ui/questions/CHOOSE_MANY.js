
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { map } from '@twipped/utils';

export default function CHOOSE_MANY ({ qid, question, value, onChange }) {

  value = value || [];

  const handleChange = useCallback((ev) => {
    const set = new Set(value || []);
    const { name, checked } = ev.target;
    if (checked) set.add(name);
    else set.delete(name);
    onChange && onChange({ [qid]: Array.from(set) });
  }, [ value ]);

  return (
    <FormControl component={Paper} variant="outlined" elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>{question.caption}</Typography>
      {map(question.options, (opt) => (
        <FormControlLabel
          key={opt}
          value={opt}
          control={<Checkbox name={opt} checked={value.includes(opt)} onChange={handleChange} />}
          label={opt}
          labelPlacement="end"
        />
      ))}
    </FormControl>
  );
}

CHOOSE_MANY.propTypes = {
  qid: PropTypes.string,
  question: PropTypes.shape({
    type: PropTypes.oneOf([ 'CHOOSE_MANY' ]).isRequired,
    caption: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
  }),
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};
