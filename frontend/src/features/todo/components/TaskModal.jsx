import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSubmit, taskData }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        if (taskData) {
            setTask(taskData);
        } else {
            setTask({ title: '', description: '' });
        }
    }, [taskData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(task);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{taskData ? 'Update Task' : 'Create Task'}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="taskTitle" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskTitle"
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskDescription" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="taskDescription"
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            {taskData ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
