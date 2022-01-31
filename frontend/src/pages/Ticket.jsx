/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { getTicket, reset } from '../features/tickets/ticketSlice';

const Ticket = () => {
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets,
  );

  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
  }, [isError, message, dispatch, ticketId]);

  if (isLoading) return <Spinner />;

  if (isError) return <h3>Something went wrong!</h3>;

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-UK')}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
};

export default Ticket;