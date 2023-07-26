const root = document.querySelector("#root");

function App() {
  const [select, setSelect] = React.useState("");
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [cancel, setCancel] = React.useState(false);

  // ref
  const inputRef = React.useRef(null);

  function handlerSubmit(event) {
    event.preventDefault();

    if (edit.id) {
      if (select != "") {
        const arr = {
          id: edit.id,
          data: select,
        };

        const idxData = data.findIndex((element) => {
          return element.id == edit.id;
        });

        const temp = [...data];
        temp[idxData] = arr;

        setData(temp);
        setSelect("");
        setEdit({});
      } else {
        alert("Silahkan isi terlebih dahulu!");
      }

      return handlerCancel;
    }

    if (select != "") {
      setData([
        ...data,
        {
          id: new Date().getTime(),
          data: select,
        },
      ]);
      setSelect("");
    } else {
      alert("Silahkan isi terlebih dahulu");
    }
  }

  function handlerDelete(id) {
    const hapus = data.filter((note) => {
      return note.id !== id;
    });
    handlerCancel();
    return setData(hapus);
  }

  function handlerEdit(select) {
    setSelect(select.data);
    setEdit(select);
  }

  function handlerCancel() {
    setSelect("");
    setEdit({});
  }

  return (
    <>
      <h1>Web App TodoList</h1>
      <br />
      <br />
      <br />
      <form onSubmit={handlerSubmit}>
        <span>Masukkan nilai</span>
        <input
          type="text"
          onChange={function (e) {
            setSelect(e.target.value);
          }}
          placeholder="ex. learning"
          value={select}
        />
        <button type="submit">{edit.id ? "Simpan Perubahan" : "Submit"}</button>
        {edit.id ? (
          <button type="submit" onClick={handlerCancel}>
            Cancel
          </button>
        ) : (
          ""
        )}
      </form>
      <br />
      <br />
      <h4>List TodoList</h4>
      {data.length > 0 ? (
        <ul>
          {data.map((value) => {
            return (
              <li key={value.id} ref={inputRef}>
                {value.data}
                <button onClick={handlerEdit.bind(this, value)}>edit</button>
                <button onClick={handlerDelete.bind(this, value.id)}>
                  hapus
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Tidak ada data!</p>
      )}
    </>
  );
}

ReactDOM.render(<App />, root);
