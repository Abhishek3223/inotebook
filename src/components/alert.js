import React from 'react'

const Alert = (props) => {
    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{(props.alert.type).toUpperCase()}</strong>: {props.alert.msg}
            </div>}
        </div>
    )
}

export default Alert