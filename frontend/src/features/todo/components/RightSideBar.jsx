import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync, selectLoggedInUser } from '../../auth/AuthSlice.jsx';
import {
  deleteAllTodos,
} from '../TodoSlice';
import { useNavigate } from 'react-router-dom';
import WarningModal from './WarningModal';

const RightSideBar = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  const [modalState, setModalState] = useState({ isOpen: false, action: null });

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  const handleLogout = () => {
    setModalState({
      isOpen: true,
      action: 'logout',
    });
  };

  const handleDeleteAll = () => {
    setModalState({
      isOpen: true,
      action: 'delete',
    });
  };

  const confirmAction = () => {
    if (modalState.action === 'logout') {
      dispatch(logoutAsync());
    } else if (modalState.action === 'delete') {
      dispatch(deleteAllTodos())
    }
    setModalState({ isOpen: false, action: null });
  };

  const cancelAction = () => {
    setModalState({ isOpen: false, action: null });
  };

  const name = loggedInUser?.email.substring(0, loggedInUser?.email.indexOf("@"));

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '97vh' }}>
      <div className="row w-100 mb-3">
        <div className="col text-center">
          <h4>{name}</h4>
        </div>
        <div className="col text-end">
          <button type="button" className="btn btn-outline-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="row mt-auto">
        <button type="button" className="btn btn-outline-danger" onClick={handleDeleteAll}>
          Delete All Todos
        </button>
      </div>

      <WarningModal
        title={modalState.action === 'logout' ? 'Confirm Logout' : 'Confirm Delete'}
        body={
          modalState.action === 'logout'
            ? 'Are you sure you want to log out?'
            : 'Are you sure you want to delete all tasks? This action cannot be undone.'
        }
        isOpen={modalState.isOpen}
        onConfirm={confirmAction}
        onCancel={cancelAction}
        confirmText={modalState.action === 'logout' ? 'Logout' : 'Delete'}
      />
    </div>
  );
};

export default RightSideBar;
