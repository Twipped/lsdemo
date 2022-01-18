
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { map } from '@twipped/utils';

export default function CHOOSE_ONE ({ qid, question, value, onChange }) {

  const handleChange = useCallback((ev) => {
    onChange && onChange({ [qid]: ev.target.value });
  });

  return (
    <FormControl component={Paper} variant="outlined" elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>{question.caption}</Typography>
      <RadioGroup
        name={qid}
        defaultValue={question.options[0] || ''}
        value={value || question.options[0] || ''}
        onChange={handleChange}
      >
        {map(question.options, (opt) => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={opt}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

CHOOSE_ONE.propTypes = {
  qid: PropTypes.string,
  question: PropTypes.shape({
    type: PropTypes.oneOf([ 'CHOOSE_ONE' ]).isRequired,
    caption: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
  }),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
