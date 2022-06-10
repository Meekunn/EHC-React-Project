import "./schoolcollection.css";
import {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth";
import { auth, db } from "../config/firebase";
import {doc, setDoc, collection, getDocs, query, where} from "firebase/firestore";

 function SchoolCollection() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(null);

    const provider = new GoogleAuthProvider();

    const handleSignIn = () => {
        signInWithPopup(auth, provider).then((res) => {
            alert(res.user.displayName);
        });
    };

    const addTodo = async () => {
        const id = uuidv4();
        await setDoc(doc(db, "todos", id), {
            todo: todo,
            id: id,
            user: user.uid
        })
            .then((res) => {
                setTodos([{ todo: todo, id: id }, ...todos]);
            })
            .catch((e) => alert("Error while adding todo"));
    };

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUser(user);
        } else {
            alert("Login to make request");
        }
    });

    const handleGetTodos = async () => {
        const citiesRef = collection(db, "todos");
        const q = query(citiesRef, where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let todoItems = [];
        querySnapshot.forEach((doc) => {
            todoItems.push(doc.data());
        });
        setTodos(todoItems);
    };

    useEffect(() => {
        if (user) {
            handleGetTodos();
        }
    }, [user]);

    return (
        <section className="school">

            {/* {user && user.displayName} */}
           <form>
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="add item"
              />
              <button onClick={addTodo}>Add Item</button>
            </form>

            <article>
                <ul>
                    {todos.map((t, i) => {
                        return <li key={t.id}>{t.todo}</li>;
                    })}
                </ul>
            </article>

            <button onClick={handleSignIn}>Sign In With Google</button>
            <button onClick={() => signOut(auth)}>Sign Out</button>
        </section>
    );
}
export default SchoolCollection
