import { RiErrorWarningFill } from "react-icons/ri"
import "./snackbar.scss"

const Snackbar = ({ focusValue, value, validValue, info1, info2, info3 }: ISnackbar) => {
	return (
		<div className={focusValue && value && !validValue ? "instructions" : "offscreen"}>
			<p id="uidnote" className="warning">
				<RiErrorWarningFill
					color="#620a24"
					style={{ marginRight: "0.4rem", fontSize: "1rem" }}
				/>
				{info1}.<br />
				{info2}
				<br />
				{info3}
			</p>
		</div>
	)
}

export default Snackbar
