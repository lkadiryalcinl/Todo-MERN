import React from 'react'

const TaskCard = () => {
    
    return (
        <div class="card bg- col-lg-4 col-md-6 col-sm-12">
            <div class="card-body">
                <h5 class="card-title">Todo</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                <div className='row'>
                    <div className='col'>
                        <a href="#" class="btn btn-success">Completed</a>
                    </div>
                    <div className='col'>
                        <a className='btn btn-warning'>
                            <i class="bi bi-star"></i>
                        </a>
                        <a className='btn btn-danger'>
                            <i class="bi bi-trash"></i>
                        </a>
                        <a className='btn btn-primary'>
                            <i class="bi bi-three-dots-vertical"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard;