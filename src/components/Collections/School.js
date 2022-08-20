import { useMatch } from "react-router-dom"
import Collection from "./Collection"

const School = () => {

    const match = useMatch('/dashboard/school')

    return match ? (
        <Collection collectionName={'school'} />
    ) : (
        <div>Page not Found</div>
    );
}

export default School