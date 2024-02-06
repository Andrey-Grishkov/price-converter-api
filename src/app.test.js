import {RATE_URL} from "./utils/constants";
import {formattedDate} from "./utils/DataHandler";

test('Data test', () => {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  console.log('Date:', formattedDate);
  expect(formattedDate).toMatch(datePattern);
});
