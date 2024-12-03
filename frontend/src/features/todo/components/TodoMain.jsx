import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React,{useState} from 'react'
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import WarningModal from './WarningModal';


const mockTasks = [
    { id: 1, title: 'Complete React Project', description: 'Finish the React project with all required features.', completed: false, favorited: true, date: '2024-12-03' },
    { id: 2, title: 'Buy Groceries', description: 'Milk, bread, eggs, and fruits.', completed: true, favorited: false, date: '2024-12-02' },
    { id: 3, title: 'Learn JavaScript', description: 'Study ES6 and asynchronous JavaScript techniques.', completed: false, favorited: false, date: '2024-12-01' },
    { id: 4, title: 'Exercise', description: 'Go for a 30-minute run in the park.', completed: false, favorited: true, date: '2024-12-03' },
    { id: 5, title: 'Read a Book', description: 'Read 20 pages of a book on algorithms.', completed: true, favorited: true, date: '2024-11-30' },
    { id: 6, title: 'Fix Bug in API', description: 'Resolve the issue causing 500 errors in the login API.', completed: false, favorited: false, date: '2024-12-01' },
    { id: 7, title: 'Write Documentation', description: 'Update the README for the project with setup instructions.', completed: true, favorited: false, date: '2024-11-29' },
    { id: 8, title: 'Attend Meeting', description: 'Join the team sync meeting at 2 PM.', completed: false, favorited: true, date: '2024-12-03' },
    { id: 9, title: 'Clean the House', description: 'Vacuum the living room and clean the kitchen.', completed: true, favorited: false, date: '2024-12-01' },
    { id: 10, title: 'Prepare Presentation', description: 'Prepare slides for the upcoming client presentation.', completed: false, favorited: false, date: '2024-12-03' },
    { id: 11, title: 'Watch Tutorial', description: 'Watch a tutorial on React Hooks.', completed: true, favorited: true, date: '2024-11-28' },
    { id: 12, title: 'Submit Report', description: 'Submit the weekly progress report to the manager.', completed: false, favorited: false, date: '2024-12-02' },
    { id: 13, title: 'Plan Vacation', description: 'Research vacation destinations and book flights.', completed: false, favorited: true, date: '2024-12-01' },
    { id: 14, title: 'Call Mom', description: 'Catch up with mom for 30 minutes.', completed: true, favorited: false, date: '2024-11-30' },
    { id: 15, title: 'Organize Files', description: 'Sort and organize the project files on the computer.', completed: false, favorited: false, date: '2024-12-03' },
];

const TodoMain = () => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsTaskModalOpen(true);
    };

    const handleDeleteTask = (task) => {
        setTaskToDelete(task);
        setIsWarningModalOpen(true);
    };

    const handleWarningModalConfirm = () => {
        // Add delete task logic here
        console.log(`Task with ID ${taskToDelete.id} deleted`);
        setIsWarningModalOpen(false);
        setTaskToDelete(null);
    };

    const handleTaskModalSubmit = (updatedTask) => {
        // Add update task logic here
        console.log(`Task with ID ${updatedTask.id} updated`);
        setIsTaskModalOpen(false);
        setTaskToEdit(null);
    };

    const handleCloseModals = () => {
        setIsTaskModalOpen(false);
        setIsWarningModalOpen(false);
    };

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
                                    <input className="form-control" style={{ boxShadow: 'none' }} type="search" placeholder="Search Todo" aria-label="Search" />
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row overflow-auto" style={{ height: 'calc(100vh - 65px)' }}>
                            {mockTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={() => handleEditTask(task)}
                                    onDelete={() => handleDeleteTask(task)}
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
                onClose={handleCloseModals}
                onSubmit={handleTaskModalSubmit}
                taskData={taskToEdit}
            />

            <WarningModal
                title="Confirm Delete"
                body={`Are you sure you want to delete the task: "${taskToDelete?.title}"?`}
                isOpen={isWarningModalOpen}
                onConfirm={handleWarningModalConfirm}
                onCancel={handleCloseModals}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
};

export default TodoMain;
