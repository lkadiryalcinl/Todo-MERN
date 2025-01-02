import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTodos,
    updateTodo,
    deleteTodo,
    selectFilteredTodos,
    selectSelectedTodo,
    clearError,
    resetStatus,
    selectTodoError,
    selectTodoStatus,
    setSelectedTodo,
    setSearchTerm,
} from '../TodoSlice';

import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import WarningModal from './WarningModal';

const TodoMain = () => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const selectedTodo = useSelector(selectSelectedTodo);
    const status = useSelector(selectTodoStatus);
    const error = useSelector(selectTodoError);

    const handleSearch = (event) => {
        dispatch(setSearchTerm(event.target.value));
    };

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (status === 'fulfilled') {
            dispatch(resetStatus());
        }
    }, [status, dispatch]);

    const handleEditTask = (updatedTask) => {
        if (!updatedTask || !updatedTask._id) {
            return;
        }
        dispatch(updateTodo({
            id: updatedTask._id,
            content: { ...updatedTask }, 
        }));
        clearModal();
    };

    const handleDeleteTask = (task) => {
        dispatch(deleteTodo(task._id));
        clearModal();
    };

    const setTaskModal = (task) => {
        dispatch(setSelectedTodo(task))
        setIsTaskModalOpen(true)
    }

    const setWarningModal = (task) => {
        dispatch(setSelectedTodo(task))
        setIsWarningModalOpen(true)
    }

    const clearModal = () => {
        dispatch(clearError())
        dispatch(setSelectedTodo(null))
        setIsTaskModalOpen(false)
        setIsWarningModalOpen(false)
    }

    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-2">
                    <LeftSideBar />
                </div>
                <div className="col-8 border border-top-0 border-bottom-0 border-dark">
                    <div className="container-fluid">
                        <div className="row mb-3">
                            <div className="col-4">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        style={{ boxShadow: 'none' }}
                                        type="search"
                                        placeholder="Search Todo"
                                        aria-label="Search"
                                        onChange={handleSearch}
                                    />
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row overflow-auto">
                            {filteredTodos.map((task, index) => (
                                <TaskCard
                                    key={task._id || index} 
                                    task={task}
                                    onEdit={() => setTaskModal(task)}
                                    onDelete={() => setWarningModal(task)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <RightSideBar />
                </div>
            </div>

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => clearModal()}
                onSubmit={(updatedTask) => handleEditTask(updatedTask)}
                taskData={selectedTodo}
            />

            <WarningModal
                title="Confirm Delete"
                body={`Are you sure you want to delete the task: "${selectedTodo?.title}"?`}
                isOpen={isWarningModalOpen}
                onConfirm={() => handleDeleteTask(selectedTodo)}
                onCancel={() => clearModal()}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
};

export default TodoMain;
