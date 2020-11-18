import "date-fns";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React from "react";
import { useSetReadTimes } from "../../hooks/useGroup";
import { differenceInDays } from "date-fns";

const ActiveBookCard = styled(Card)`
  ${({ theme }) => `
        display: flex;
        padding: ${theme.spacing(2)}px;
        margin-top: ${theme.spacing(1)}px;
        .book-media {
            height: 150px;
            width: 100px;
        }
    `}
`;

export const ActiveBook = ({ book, groupId }: any) => {
  const [setReadTimes] = useSetReadTimes(groupId, book.id);
  const [startDate, setStartDate] = React.useState(new Date(book.startDate));
  const [endDate, setEndDate] = React.useState(new Date(book.endDate));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <ActiveBookCard>
      <CardMedia
        className="book-media"
        image={book.volumeInfo?.imageLinks?.thumbnail || "/"}
      />
      <CardContent>
        <Typography variant="h5">{book.volumeInfo.title}</Typography>
        <Typography variant="subtitle1">
          {book.volumeInfo.authors.join(", ")}
        </Typography>
        <Typography variant="body1">
          Pages: {book.volumeInfo.pageCount}
        </Typography>
      </CardContent>
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-start"
            disabled={!!book?.startDate || false}
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-end"
            disabled={!!book?.endDate || false}
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        {!book.endDate && !book.startDate && (
          <Button
            onClick={() => setReadTimes({ startDate, endDate })}
            variant="contained"
          >
            lez fek'n reed eet!
          </Button>
        )}
        <Typography variant="h6">
          Days left: {differenceInDays(new Date(book.endDate), new Date())}
        </Typography>
      </CardContent>
    </ActiveBookCard>
  );
};
