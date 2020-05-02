import { ErrorType } from '@Type/errorType';

interface IError {
  name: string;
  code: number;
}

const Errors: { [key in ErrorType]: IError } = {
  Not_Found: {
    name: 'Not Found',
    code: 404,
  },
  Wrong_Data: {
    name: 'Wrong Data',
    code: 412,
  },
  Database_Error: {
    name: 'Database Error',
    code: 500,
  },
  Exist_Data: {
    name: 'Exist Data',
    code: 412,
  },
  Forbidden: {
    name: 'Forbidden',
    code: 403,
  },
};

export default Errors;
