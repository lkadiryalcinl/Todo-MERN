import React, { useState } from 'react';
import TaskModal from './TaskModal';

const LeftSideBar = () => {
    const [modalState, setModalState] = useState({ isOpen: false, taskData: null });

    const openCreateModal = () => {
        setModalState({ isOpen: true, taskData: null });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, taskData: null });
    };

    const handleTaskSubmit = (task) => {
        if (modalState.taskData) {
            console.log('Updating task:', task); 
        } else {
            console.log('Creating task:', task); 
        }
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
                    <div className="btn-group-vertical row w-100" role="group" aria-label="Basic example">
                        <a href="#" className="btn btn-secondary">Today</a>
                        <a href="#" className="btn btn-secondary active">All</a>
                        <a href="#" className="btn btn-secondary">Important</a>
                        <a href="#" className="btn btn-secondary">Completed</a>
                        <a href="#" className="btn btn-secondary">Uncompleted</a>
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
