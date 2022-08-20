import { useMatch } from "react-router-dom"
import Collection from "./Collection"

const Personal = () => {

    const match = useMatch('/dashboard/personal')

    return match ? (
        <Collection collectionName={'personal'} />
    ) : (
        <div>Page not Found</div>
    );
}

export default Personal