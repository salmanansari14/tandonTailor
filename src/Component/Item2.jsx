import "./style.css";
import { useState, useEffect } from "react";
import DateObject from "react-date-object";
import DataLocal from "./DataLocal";
import InputComponent from "./InputComponent";

function Item2() {
  const [inputValue, setInputValue] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const [value, setValue] = useState("");
  const [mila, setMila] = useState("");
  const [aler, setAler] = useState(0);
  const [showData, setShowData] = useState(false);

  let total = 0,
    qntDetails = [],
    Date = new DateObject();
  // console.log(Date.format('DD/MM/YYYY'),'LFGH')

  const [prod, setProd] = useState(
    localStorage.getItem("item2") === null
      ? []
      : JSON.parse(localStorage.getItem("item2"))
  );
  if (prod.length !== 0) {
    for (let i = 0; i < prod.length; i++) {
      total += prod[i].totalPrice;
    }
  }
  const [valueProd, setValueProd] = useState(
    localStorage.getItem("amounts") === null
      ? []
      : JSON.parse(localStorage.getItem("amounts"))
  );

  useEffect(() => {
    localStorage.setItem("amounts", JSON.stringify(valueProd));
  });
  useEffect(() => {
    localStorage.setItem("item2", JSON.stringify(prod));
  });

  const [itemsDetails, setItemDetails] = useState([
    {
      name: "Three piece Suit",
      order: "",
      quantity: "1",
      qntDetails,
      price: 200,
      totalPrice: 0,
    },
    {
      name: "Suit",
      category: "SB",
      order: "",
      quantity: "1",
      qntDetails,
      price: 150,
      totalPrice: 0,
    },
    {
      name: "Coat",
      category: "SB",
      order: "",
      quantity: "1",
      qntDetails,
      price: 120,
      totalPrice: 0,
    },
    {
      name: "Sadri",
      category: "Shawl collar",
      order: "",
      quantity: "1",
      qntDetails,
      price: 70,
      totalPrice: 0,
    },
    {
      name: "Kurta",
      order: "",
      quantity: "1",
      qntDetails,
      price: 40,
      totalPrice: 0,
    },
    {
      name: "Pajama",
      category: "Shalwar",
      order: "",
      quantity: "1",
      qntDetails,
      price: 40,
      totalPrice: 0,
    },
    {
      name: "Shirt",
      quantity: "1",
      order: "",
      qntDetails,
      price: 40,
      totalPrice: 0,
    },
    {
      name: "Pant",
      quantity: "1",
      order: "",
      qntDetails,
      price: 30,
      totalPrice: 0,
    },
    {
      name: "Waiscoat",
      quantity: "1",
      order: "",
      qntDetails,
      price: 50,
      totalPrice: 0,
    },
  ]);
  function deleteAmount() {
    if (window.confirm("Are you sure to delete Mila Amount")) {
      localStorage.removeItem("amounts");
      setValueProd([]);
    }
  }
  const clearDataInput = () => {
    itemsDetails.map((s, ind) => {
      if (value === s.name) {
        let newObject = itemsDetails;
        newObject[ind] = {
          ...newObject[ind],
          quantity: "1",
          order: "",
          category:
            s.name === "Sadri"
              ? "Shawl collar"
              : s.name === "Pajama"
              ? "Shalwar"
              : "SB",
        };
        setItemDetails(newObject);
        setInputValue("");
        setOrderValue("");
      }
      return null;
    });
  };
  const AddData = (itemsDetails) => {
    itemsDetails.qntDetails = [];
    let qntArray = {
      order: itemsDetails.order,
      date: Date.format("DD/MM/YYYY"),
      category: itemsDetails.category,
      qnt: itemsDetails.quantity,
    };
    let a = 0;
    if (prod.length !== 0) {
      let newProd = [];
      for (let i = 0; i < prod.length; i++) {
        if (prod[i].name === itemsDetails.name) {
          console.log(itemsDetails.name, prod[i].name);
          prod[i].qntDetails.push(qntArray);
          let sum = 0;
          for (let j = 0; j < prod[i].qntDetails.length; j++) {
            sum += Number(prod[i].qntDetails[j].qnt);
          }
          prod[i].totalPrice = sum * prod[i].price;
          newProd[i] = prod[i];
          console.log("g");
          a++;
        } else {
          newProd[i] = prod[i];
        }
      }
      setProd(newProd);
    }
    if (a === 0) {
      let sum = 0;
      sum = Number(itemsDetails.quantity) * itemsDetails.price;
      itemsDetails.totalPrice += sum;
      itemsDetails.qntDetails.push(qntArray);
      setProd((prod) => [...prod, itemsDetails]);
    }
  };
  const addNewDataInExistingItem = (
    item,
    newValue,
    newOrderValue,
    newItemType
  ) => {
    qntDetails = [];
    const qntArray = {
      order: newOrderValue,
      date: Date.format("DD/MM/YYYY"),
      category: newItemType,
      qnt: newValue,
    };
    let newProd = [];
    for (let i = 0; i < prod.length; i++) {
      if (prod[i].name === item.name) {
        prod[i].qntDetails.push(qntArray);
        let sum = 0;
        for (let j = 0; j < prod[i].qntDetails.length; j++) {
          sum += Number(prod[i].qntDetails[j].qnt);
        }
        prod[i].totalPrice = sum * prod[i].price;
        newProd[i] = prod[i];
      } else {
        newProd[i] = prod[i];
      }
    }
    setProd(newProd);
  };

  const editqntDetails = (
    item,
    qntIdx,
    newValue,
    newOrderValue,
    newItemType
  ) => {
    if (newValue === "" && newOrderValue === "") {
      alert("please enter a value");
    } else {
      let newProd = [];
      for (let i = 0; i < prod.length; i++) {
        if (prod[i].name === item.name) {
          newProd[i] = prod[i];
          let s = newProd[i].qntDetails[qntIdx].qnt;
          let t = newProd[i].qntDetails[qntIdx].order;
          let u = newProd[i].qntDetails[qntIdx].category;
          newProd[i].qntDetails[qntIdx].qnt =
            newValue !== "" ? Number(newValue) : s;
          newProd[i].qntDetails[qntIdx].order =
            newOrderValue !== "" ? newOrderValue : t;
          newProd[i].qntDetails[qntIdx].category =
            newItemType === newProd[i].qntDetails[qntIdx].category
              ? u
              : newItemType;
          let sum = 0;
          for (let j = 0; j < prod[i].qntDetails.length; j++) {
            sum += Number(newProd[i].qntDetails[j].qnt);
          }
          newProd[i].totalPrice = sum * newProd[i].price;
        } else {
          newProd[i] = prod[i];
        }
      }
      setProd(newProd);
    }
  };

  const submit = () => {
    if (aler !== 0) {
      alert("please add after 3 second");
    } else {
      for (let i = 0; i < itemsDetails.length; i++) {
        if (itemsDetails[i].name === value) {
          AddData(itemsDetails[i]);
        }
      }
      clearDataInput();
      setValue("");
      setAler(1);

      setTimeout(() => {
        setAler(0);
      }, 2000);
    }
  };

  const delItemQnt = (itemsIndex, indexOfqntDetails) => {
    if (
      window.confirm(
        `Are you sure to delete ${prod[itemsIndex].name}'s quantity details ?`
      )
    ) {
      if (prod[itemsIndex].qntDetails.length === 1) {
        setProd(prod.filter((e, i) => i !== itemsIndex));
        return;
      }
      let DemoProd = [];
      for (let i = 0; i < prod.length; i++) {
        if (i === itemsIndex) {
          prod[i].totalPrice -=
            prod[i].qntDetails[indexOfqntDetails].qnt * prod[i].price;
          prod[i].qntDetails.splice(indexOfqntDetails, 1);
          DemoProd[i] = prod[i];
        }
        DemoProd[i] = prod[i];
      }
      setProd(DemoProd);
    }
  };

  const delItem = (itemIdx) => {
    if (window.confirm(`Are you sure to delete ${prod[itemIdx].name} ?`)) {
      setProd(prod.filter((e, i) => i !== itemIdx));
    }
  };

  const Previe = () => {
    if (prod.length === 0) {
      alert("No items to display, please add a new items");
    } else {
      setShowData(!showData);
    }
  };
  const clear = () => {
    if (prod.length === 0) {
      alert("you have already no items in your storage");
      clearDataInput();
    } else if (window.confirm("Are you sure to delete all the items")) {
      localStorage.removeItem('item2');
      setProd([]);
      clearDataInput();
      setShowData(!showData);
    }
  };

  const changeValue = (e) => {
    if (value !== "") {
      setInputValue(e.target.value);
      itemsDetails.map((s, ind) => {
        if (value === s.name) {
          let newObject = itemsDetails,
            i = ind;
          newObject[i] = { ...newObject[i], quantity: e.target.value };
          setItemDetails(newObject);
        }
        return null;
      });
    }
  };
  const changeOrderValue = (e) => {
    if (value !== "") {
      setOrderValue(e.target.value);
      itemsDetails.map((s, ind) => {
        if (value === s.name) {
          let newObject = itemsDetails;
          let i = ind;
          newObject[i] = { ...newObject[i], order: e.target.value };
          setItemDetails(newObject);
        }
        return null;
      });
    }
  };
  const changeCategory = (e) => {
    if (value !== "") {
      setCategoryValue(e.target.value);
      itemsDetails.map((s, ind) => {
        if (value === s.name) {
          let newObject = itemsDetails;
          let i = ind;
          newObject[i] = { ...newObject[i], category: e.target.value };
          setItemDetails(newObject);
        }
        return null;
      });
    }
  };

  const changeAmount = (e) => {
    setMila(e.target.value);
  };
  const changeSubmit = () => {
    if (mila === "") {
      alert("please enter the amount");
      return;
    }
    let MilaTotal = 0;
    for (let i = 0; i < valueProd.length; i++) {
      MilaTotal = Number(MilaTotal + valueProd[i]);
    }
    if (total < mila) {
      alert("please enter amount less than total price");
    } else {
      MilaTotal += Number(mila);
      if (MilaTotal > total) {
        alert(
          "your total mila amount is greater than total amount, please enter the amount which is less than total"
        );
      } else {
        setValueProd((valueProd) => [...valueProd, Number(mila)]);
        setMila("");
        setAler(1);
        setTimeout(() => {
          setAler(0);
        }, 3000);
      }
    }
  };
  const checkBoxArray = [
    "Shirt",
    "Three piece Suit",
    "Pant",
    "Suit",
    "Coat",
    "Kurta",
    "Pajama",
    "Sadri",
    "Waiscoat",
    "milaAmount",
  ];

  return (
    <div className="home">
      <h1 className="text-center">Your are on Others</h1>
      <div className="text-center">
        <h5>
          {value === ""
            ? "Check the box to add a data"
            : `Enter the value of ${value}`}
        </h5>
      </div>
      <div className="select-item">
        {checkBoxArray.map((a, i) =>
          checkBoxArray[i] !== "milaAmount" || total !== 0 ? (
            <div className="form-check form-check-inline">
              <input
                className="liItem"
                type="radio"
                onChange={(e) => {
                  setValue(e.target.id);
                }}
                id={a}
                name="drone"
                value={a}
              />
              <label className="liItem" htmlFor={a}>
                {a}
              </label>
            </div>
          ) : null
        )}
      </div>
      
      <div className="content">
        <InputComponent
          value={value}
          inputValue={inputValue}
          orderValue={orderValue}
          categoryValue={categoryValue}
          mila={mila}
          changeValue={changeValue}
          changeOrderValue={changeOrderValue}
          changeCategory={changeCategory}
          changeAmount={changeAmount}
        />
        <div className="btns">
          <div>
            {value !== "" ? (
              <button
                onClick={value === "milaAmount" ? changeSubmit : submit}
                type="submit"
                className="btn btn-sm btn-primary"
              >
                Save
              </button>
            ) : null}
            {prod.length !== 0 ? (
              <button
                onClick={Previe}
                type="submit"
                className="btn btn-sm btn-success mx-3"
              >
                {showData === false ? " Show" : "Hide"}
              </button>
            ) : null}
          </div>
          {prod.length !== 0 ? (
            <button
              onClick={clear}
              type="submit"
              className="btn btn-sm btn-danger"
            >
              Delete all
            </button>
          ) : null}
        </div>
        {aler !== 0 ? (
          <div className="alert alert-success my-2" role="alert">
            Data successfully save {value} !
          </div>
        ) : null}
      </div>
      {showData === true && prod.length !== 0 ? (
        <div className="elseSpan">
          <DataLocal
            prod={prod}
            total={total}
            showData={showData}
            addNewDataInExistingItem={addNewDataInExistingItem}
            AddData={AddData}
            editqntDetails={editqntDetails}
            delItem={delItem}
            delItemQnt={delItemQnt}
            valueProd={valueProd}
            deleteAmount={deleteAmount}
          />
        </div>
      ) : prod.length === 0 ? (
        <span className="elseSpan">Please add an items</span>
      ) : (
        <span className="elseSpan">Click on Show button to show the data</span>
      )}
    </div>
  );
}
export default Item2;
