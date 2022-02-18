/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';
import { addNote, getNotes } from '../features/notes/noteSlice';
import { closeTicket, getTicket } from '../features/tickets/ticketSlice';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, dispatch, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ noteText, ticketId }));
    setNoteText('');
    closeModal();
  };

  if (isLoading || notesIsLoading) return <Spinner />;

  if (isError) {
    return (
      <>
        <BackButton url="/tickets" />
        <h3>Something went wrong!</h3>
      </>
    );
  }

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
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} type="button" className="btn btn-sm">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button type="button" className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Add your note here"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          <div className="form--group">
            <button type="submit" className="btn btn-sm">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <p>There are no notes for this ticket yet.</p>
      )}

      {ticket.status !== 'closed' && (
        <button
          type="button"
          className="btn btn-block btn-danger"
          onClick={onTicketClose}
        >
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
