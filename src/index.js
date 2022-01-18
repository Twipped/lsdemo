
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Temporal } from '@js-temporal/polyfill';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Main from './ui/Main';

const App = () => {
  const mdTheme = createTheme();

  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Routes>
            <Route path=":date">
              <Route path=":assessment" element={<Main />} />
              <Route index element={<Main />} />
            </Route>
            <Route path="*" element={<Navigate to={`/${Temporal.Now.plainDateISO().toString()}`} />} />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
};

const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);
render(<App />, mountPoint);
