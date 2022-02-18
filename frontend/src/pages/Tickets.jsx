import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getTickets, reset } from '../features/tickets/ticketSlice';

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      {tickets.length > 0 ? (
        <div className="tickets">
          <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div />
          </div>
          {tickets.map((ticket) => (
            // eslint-disable-next-line no-underscore-dangle
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <p>There are not tickets yet.</p>
      )}
      {/*
      The Link below redirects to NewTicket.jsx, but it's redirected back here
      because somehow isSuccess is not resetting to false, I believe.
      */}
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        New Ticket
      </Link>
    </>
  );
};

export default Tickets;
