
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { range } from '@twipped/utils';

export default function SCALE ({ qid, question, value, onChange }) {

  const handleChange = useCallback((ev) => {
    onChange && onChange({ [qid]: Number(ev.target.value) });
  });

  return (
    <FormControl component={Paper} variant="outlined" elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>{question.caption}</Typography>
      <RadioGroup row aria-label="rating" name={qid} defaultValue={1} value={value || 1} onChange={handleChange} sx={{ justifyContent: 'space-around' }}>
        {range(1, 5, (v) => (
          <FormControlLabel
            key={v}
            value={v}
            control={<Radio />}
            label={String(v)}
            labelPlacement="top"
            sx={{ m: 0 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

SCALE.propTypes = {
  qid: PropTypes.string,
  question: PropTypes.shape({
    type: PropTypes.oneOf([ 'SCALE' ]).isRequired,
    caption: PropTypes.string.isRequired,
  }),
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
