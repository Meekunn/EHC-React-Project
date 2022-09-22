/* eslint-disable */
import "./circularprogress.scss";
import { CgFormatSlash } from "react-icons/cg";
interface IProgressData {
	completed?: number;
	total?: number;
}
const CircularProgress = ({ completed, total }: IProgressData) => {
	return (
		<div className="circular-container">
			<div className="circular-progress">
				<span>2/7</span>
			</div>
		</div>
	);
};

export default CircularProgress;
