
import { useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Temporal } from '@js-temporal/polyfill';
import useLocalStorage from '@twipped/hooks/useLocalStorage';
import ASSESSMENTS from '../assessments.js';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import Assessment from './Assessment.js';
import DatePickerDialog from './DatePickerDialog';
import Menu from './Menu';

export default function Main () {
  let { date, assessment } = useParams();
  const navigate = useNavigate();

  try {
    // using the Temporal API here because we only care about days, and Date objects suck for that.
    date = Temporal.PlainDate.from(date);
  } catch (e) {
    // if the date isn't parsable, use today
    date = Temporal.Now.plainDate();
  }

  const [ state, setState, getState ] = useLocalStorage(`assessment:${date.toString()}`, {});

  const handleSave = useCallback((st) => {
    setState({ ...getState(), [assessment]: st });
    navigate(`/${date.toString()}/`);
  }, [ assessment ]);

  const handleDate = useCallback((v) => {
    navigate(`/${v.toString()}/`);
  });

  let output = null;

  if (assessment && ASSESSMENTS[assessment]) {
    output = (
      <Assessment
        key={assessment + date.toString()}
        name={assessment}
        assessment={ASSESSMENTS[assessment]}
        date={date}
        state={state[assessment]}
        onSave={handleSave}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <AppBar>
        <Toolbar>
          {output ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back to assessments"
                component={Link}
                to={`/${date.toString()}/`}
              >
                <ChevronLeftIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {ASSESSMENTS[assessment].displayName}
              </Typography>
            </>
          ) : (
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Select Assessment
            </Typography>
          )}
          <DatePickerDialog date={date} onChange={handleDate} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ flexGrow: 1, p: 3 }} maxWidth="sm">
        {output || <Menu key={date.toString()} date={date} state={state} onChange={setState} />}
      </Container>
    </Box>
  );
}
