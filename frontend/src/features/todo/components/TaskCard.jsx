import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const date = new Date(task.date);

    return (
        <div className="card col-lg-4 col-md-6 col-sm-12">
            <div className="card-body">
                <div className="d-flex flex-column h-100">
                    <div className="d-flex flex-column justify-content-between flex-grow-1">
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        <span>{date.toLocaleDateString()}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex gap-2">
                            {task.completed ? (
                                <a href="#" className="btn btn-success">Completed</a>
                            ) : (
                                <a href="#" className="btn btn-danger">Incomplete</a>
                            )}
                        </div>
                        <div className="d-flex gap-2">
                            <a href="#" className="btn btn-outline-warning">
                                <i className={`bi ${task.favorited ? 'bi-star-fill' : 'bi-star'}`}></i>
                            </a>
                            <a href="#" className="btn btn-outline-danger" onClick={onDelete}>
                                <i className="bi bi-trash"></i>
                            </a>
                            <a href="#" className="btn btn-outline-primary" onClick={onEdit}>
                                <i className="bi bi-three-dots-vertical"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
