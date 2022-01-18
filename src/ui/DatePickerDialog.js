
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Button from '@mui/material/Button';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TextField from '@mui/material/TextField';
import useDerivedState from '@twipped/hooks/useDerivedState';
import useToggledState from '@twipped/hooks/useToggledState';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Temporal } from '@js-temporal/polyfill';
import { format } from 'date-fns-tz';

import PickersModalDialog from "@mui/lab/internal/pickers/PickersModalDialog";

export default function DatePickerDialog ({ date, onChange }) {
  const { state: open, on: openDialog, off: closeDialog }  = useToggledState(false);
  const [ value, setValue, getValue ] = useDerivedState(
    // MUI DatePicker wants a standard date, so we convert the Temporal.PlainDate into one
    () => new Date(date.year, date.month - 1, date.day),
    [ date.toString() ],
  );

  const handleSubmit = useCallback(() => {
    closeDialog();

    // MUI DatePicker spits out a GMT zoned date object, so we have to change it to local
    // before we can THEN convert it back into a Temporal Date.
    // Dates... Oy!
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const d = format(getValue(), 'yyyy-MM-dd', { timeZone });
    onChange && onChange(Temporal.PlainDate.from(d));
  });

  return (
    <>
      <Button
        endIcon={<DateRangeIcon />}
        color="inherit"
        onClick={openDialog}
      >
        {date.toLocaleString('en-US', { weekday: 'short', month: 'short', year: 'numeric', day: 'numeric' })}
      </Button>
      <PickersModalDialog
        showTodayButton
        open={open}
        // (5)
        onAccept={handleSubmit}
        onSetToday={() => {
          setValue(new Date());
        }}
        onDismiss={closeDialog}
        onClear={closeDialog}
      >
        <StaticDatePicker
          displayStaticWrapperAs="mobile"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
          maxDate={new Date()}
        />
      </PickersModalDialog>
    </>
  );
}

DatePickerDialog.propTypes = {
  date: PropTypes.instanceOf(Temporal.PlainDate),
  onChange: PropTypes.func,
};
