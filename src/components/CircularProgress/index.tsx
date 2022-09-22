/* eslint-disable @typescript-eslint/no-unused-vars */
import "./circularprogress.scss"
interface IProgressData {
	completed?: number
	total?: number
}
const CircularProgress = ({ completed, total }: IProgressData) => {
	return (
		<div className="circular-container">
			<div className="circular-progress">
				<span>2/7</span>
			</div>
		</div>
	)
}

export default CircularProgress
