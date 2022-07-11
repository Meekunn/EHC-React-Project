//EDIT FUNCTION LOGIC DRAFT

function Edit() {
    const [toBeUpdated, setToBeUpdated] = React.useState(null);

    const update = async () => {
        await setDoc(
            doc(db, "todo", toBeUpdated.id),
            {
                title: toBeUpdated.title
            },
            { merge: true }
        )
            .then((res) => {
                alert("Updated");
            })
            .catch((err) => alert("error occurs"));
    }
    return (
        <div className="App">
            {toBeUpdated && (
                <div>
                    <input
                        value={toBeUpdated.title}
                        onChange={(e) =>
                            setToBeUpdated({ ...toBeUpdated, title: e.target.value })
                        }
                    />
                    <button onClick={update}>Update</button>
                </div>
            )}
        </div>
    )
}

export default Edit;