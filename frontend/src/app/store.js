import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import noteReducer from '../features/notes/noteSlice';
import ticketReducer from '../features/tickets/ticketSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});

export default store;
