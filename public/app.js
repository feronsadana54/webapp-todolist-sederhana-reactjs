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
          data: select
        };
        const idxData = data.findIndex(element => {
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
      setData([...data, {
        id: new Date().getTime(),
        data: select
      }]);
      setSelect("");
    } else {
      alert("Silahkan isi terlebih dahulu");
    }
  }
  function handlerDelete(id) {
    const hapus = data.filter(note => {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Web App TodoList"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("form", {
    onSubmit: handlerSubmit
  }, /*#__PURE__*/React.createElement("span", null, "Masukkan nilai"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    onChange: function (e) {
      setSelect(e.target.value);
    },
    placeholder: "ex. learning",
    value: select
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? "Simpan Perubahan" : "Submit"), edit.id ? /*#__PURE__*/React.createElement("button", {
    type: "submit",
    onClick: handlerCancel
  }, "Cancel") : ""), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h4", null, "List TodoList"), data.length > 0 ? /*#__PURE__*/React.createElement("ul", null, data.map(value => {
    return /*#__PURE__*/React.createElement("li", {
      key: value.id,
      ref: inputRef
    }, value.data, /*#__PURE__*/React.createElement("button", {
      onClick: handlerEdit.bind(this, value)
    }, "edit"), /*#__PURE__*/React.createElement("button", {
      onClick: handlerDelete.bind(this, value.id)
    }, "hapus"));
  })) : /*#__PURE__*/React.createElement("p", null, "Tidak ada data!"));
}
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);