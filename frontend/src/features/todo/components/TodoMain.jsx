import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import TaskCard from './TaskCard';

import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/AuthSlice.jsx'


const TodoMain = () => {
    
    return (
        <div className='container-fluid mt-2'>
            <div className='row'>
                <div className='col-2'>
                    <LeftSideBar />
                </div>
                <div className='col-8 border border-top-0 border-bottom-0 border-dark'>
                    <div className='container-fluid'>
                        <div className="row mb-3">
                            <div className="col-lg-4 col-md-6">
                                <div className="input-group">
                                    <input className="form-control" style={{'boxShadow':'none'}} type="search" placeholder="Search Todo" aria-label="Search" />
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            {[...Array(6)].map(() => (
                                <TaskCard />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-2'>
                    <RightSideBar />
                </div>
            </div>
        </div>
    )
}

export default TodoMain;