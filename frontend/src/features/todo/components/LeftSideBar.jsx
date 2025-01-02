import React, { useState } from 'react';
import TaskModal from './TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, setFilter } from '../TodoSlice';

const LeftSideBar = () => {
    const [modalState, setModalState] = useState({ isOpen: false, taskData: null });
    const dispatch = useDispatch();

    const activeFilter = useSelector((state) => state.TodoSlice.filter);

    const openCreateModal = () => {
        setModalState({ isOpen: true, taskData: null });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, taskData: null });
    };

    const handleTaskSubmit = (task) => {
            dispatch(createTodo(task));
    };

    const handleFilterChange = (filter) => {
        dispatch(setFilter(filter));
    };

    return (
        <div className="container">
            <div className="d-flex">
                <div className="row gap-2">
                    <h3 className="text-center">My Todo</h3>
                    <button className="btn btn-dark" onClick={openCreateModal}>
                        Add New Todo
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <hr className="border-top border-secondary" />
            </div>

            <div className="d-block">
                <h5 className="text-center">Todos</h5>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="btn-group-vertical row w-100" role="group" aria-label="Filter Todos">
                        {['Today', 'All', 'Important', 'Completed', 'Uncompleted'].map((filter) => (
                            <button
                                key={filter}
                                className={`btn btn-secondary ${
                                    activeFilter === filter ? 'active' : ''
                                }`}
                                onClick={() => handleFilterChange(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <TaskModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                onSubmit={handleTaskSubmit}
                taskData={modalState.taskData}
            />
        </div>
    );
};

export default LeftSideBar;
