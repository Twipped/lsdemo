
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { map } from '@twipped/utils';
import useDerivedState from '@twipped/hooks/useDerivedState';
import { Temporal } from '@js-temporal/polyfill';

import SCALE from './questions/SCALE.js';
import CHOOSE_ONE from './questions/CHOOSE_ONE.js';
import CHOOSE_MANY from './questions/CHOOSE_MANY.js';
import TEXT_LONG from './questions/TEXT_LONG.js';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const QUESTION_TYPES = {
  SCALE,
  CHOOSE_ONE,
  CHOOSE_MANY,
  TEXT_LONG,
};

export default function Assessment ({ assessment, state, onSave }) {
  const { questions } = assessment;

  const [ answers, setAnswers, getAnswers ] = useDerivedState(() => state || {}, [ state ], { alwaysMerge: true, comparator: true });

  const saveAnswers = useCallback(() => {
    onSave && onSave(getAnswers());
  });

  const handleChange = useCallback((st) => setAnswers({ ...getAnswers(), ...st }));

  return (
    <Stack spacing={3}>
      {map(questions, (question, qid) => {
        const Q = QUESTION_TYPES[question.type];
        if (!Q) return null;
        return <Q {...{ qid, question, value: answers[qid], onChange: handleChange, key: qid }} />;
      })}
      <Box sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={saveAnswers}>Save</Button>
      </Box>
    </Stack>
  );
}
Assessment.propTypes = {
  assessment: PropTypes.object,
  date: PropTypes.instanceOf(Temporal.PlainDate),
  state: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};
