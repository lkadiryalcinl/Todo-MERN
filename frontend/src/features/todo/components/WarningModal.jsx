import React from 'react'

const WarningModal = ({ title, body, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' ,isOpen = false}) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{body}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            {cancelText}
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;
