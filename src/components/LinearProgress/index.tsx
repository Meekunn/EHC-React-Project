import './linearprogress.scss'

const LinearProgress = ({bgColor}: ILinearProgressProps) => {

    const linearStyles = {
        background: `${bgColor}`,
    }

    return (
        <div className='linear-container'>
            <div className='linear' style={linearStyles}></div>
            <p className='loading' role='progressbar'>Loading</p>
        </div>
    )
}

export default LinearProgress