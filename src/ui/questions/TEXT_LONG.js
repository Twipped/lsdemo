
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function SCALE ({ qid, question, value, onChange }) {

  const handleChange = useCallback((ev) => {
    onChange && onChange({ [qid]: ev.target.value });
  });

  return (
    <FormControl component={Paper} variant="outlined" elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>{question.caption}</Typography>
      <TextField
        id={qid}
        multiline
        value={value}
        onChange={handleChange}
        minRows={3}
      />
    </FormControl>
  );
}

SCALE.propTypes = {
  qid: PropTypes.string,
  question: PropTypes.shape({
    type: PropTypes.oneOf([ 'TEXT_LONG' ]).isRequired,
    caption: PropTypes.string.isRequired,
  }),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
