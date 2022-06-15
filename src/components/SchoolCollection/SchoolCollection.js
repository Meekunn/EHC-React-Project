import { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const SchoolCollection = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodo = async () => {
        let day = new Date().getDay();
         await addDoc(collection(db, "school/school/todo"), {
            todo,
            day
        });
        getColl();
    };

    const getColl = async () => {
        const querySnapshot = await getDocs(collection(db, "school/school/todo"));
        let items = [];
        querySnapshot.forEach((doc) => {
            items = [...items, {...doc.data(), id: doc.id}];
        });
        setTodos(items);
    };
    useEffect(() => {
        getColl();
    }, []);

    return (
        <div className="App">
            <input value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button onClick={addTodo}>add</button>
            <ul>
                {todos.map((td) => {
                    return <li key={td.id}>{td.todo}</li>;
                })}
            </ul>
        </div>
    );
}

export default SchoolCollection;