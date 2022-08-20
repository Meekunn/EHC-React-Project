import { useMatch } from "react-router-dom" 
import Collection from "./Collection"

const Work = () => {

    const match = useMatch('/dashboard/work')

    return match ? (
        <Collection collectionName={'work'} />
    ) : (
        <div>Page not Found</div>
    )
}

export default Work