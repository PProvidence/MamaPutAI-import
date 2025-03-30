import { format } from 'date-fns';

const formatDate = (date, formatString) => {
  return format(date, formatString);
};

export default formatDate;
