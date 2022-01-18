import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { map, reduce, truthy, sizeOf } from '@twipped/utils';
import { Temporal } from '@js-temporal/polyfill';
import Paper from '@mui/material/Paper';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ASSESSMENTS from '../assessments.js';


export default function Menu ({ date, state }) {
  const navigate = useNavigate();

  const buttons = map(ASSESSMENTS, ({ displayName, questions }, assessmentName) => {
    const answers = state?.[assessmentName] || {};
    const count = reduce(questions, (c, question, qid) => (
      truthy(answers[qid]) ? c + 1 : c
    ), 0);
    const total = sizeOf(questions);

    return (
      <Button
        key={assessmentName}
        variant="contained"
        elevation={6}
        component={Paper}
        endIcon={<ChevronRightIcon />}
        onClick={() => navigate(`/${date.toString()}/${assessmentName}`)}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{displayName}</Typography>
          <Typography variant="caption">({count}/{total})</Typography>
        </Stack>
      </Button>
    );
  });

  return (
    <Stack spacing={2}>
      {buttons}
    </Stack>
  );
}
Menu.propTypes = {
  date: PropTypes.instanceOf(Temporal.PlainDate),
  state: PropTypes.object,
};
