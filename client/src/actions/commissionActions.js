import {
  GET_COMMISSIONS,
  ADD_COMMISSION,
  DELETE_COMMISSION
} from '../actions/types';

export const getCommissions = () => {
  return {
    type: GET_COMMISSIONS
  }
}