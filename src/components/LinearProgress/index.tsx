import './linearprogress.scss'

const LinearProgress = ({bgColor, label}: ILinearProgressProps) => {

    const linearStyles = {
        background: `${bgColor}`,
    }

    return (
        <div className='linear-container'>
            <div className='linear' style={linearStyles}></div> 
            <p className='loading' role='progressbar'>{label}</p>
        </div>
    )
}

export default LinearProgress