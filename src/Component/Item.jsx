import './style.css';
import { useState, useEffect } from 'react'
import DateObject from "react-date-object";
import DataLocal from './DataLocal';

function Item() {

    const [inputValue, setInputValue] = useState('')
    const [orderValue, setOrderValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')

    const [value, setValue] = useState("")
    const [mila, setMila] = useState('')
    const [aler, setAler] = useState(0)
    const [showData, setShowData] = useState(false)

    let total = 0, qntDetails = [], Date = new DateObject();

    const [prod, setProd] = useState(
        localStorage.getItem('item') === null ? [] :
            JSON.parse(localStorage.getItem("item")))
    if (prod.length !== 0) {
        for (let i = 0; i < prod.length; i++) {
            total += prod[i].totalPrice;
        }
    }
    const [valueProd, setValueProd] = useState(
        localStorage.getItem('amounts') === null ?
            [] :
            JSON.parse(localStorage.getItem('amounts'))
    )

    useEffect(() => {
        localStorage.setItem("amounts", JSON.stringify(valueProd));
    })
    useEffect(() => {
        localStorage.setItem("item", JSON.stringify(prod))
    },)

    const [itemsDetails, setItemDetails] = useState([
        {
            name: "Suit",
            category: 'SB',
            order: '',
            quantity: '1',
            qntDetails,
            price: 150,
            totalPrice: 0
        },
        {
            name: "Coat",
            category: 'SB',
            order: '',
            quantity: '1',
            qntDetails,
            price: 150,
            totalPrice: 0
        },
        {
            name: "Sadri",
            category: 'Shawl collar',
            order: '',
            quantity: '1',
            qntDetails,
            price: 70,
            totalPrice: 0
        },
        {
            name: "Shirt",
            quantity: '1',
            order: '',
            qntDetails,
            price: 40,
            totalPrice: 0
        },
        {
            name: "Pant",
            quantity: '1',
            order: '',
            qntDetails,
            price: 30,
            totalPrice: 0
        },
        {
            name: "Waiscoat",
            quantity: '1',
            order: '',
            qntDetails,
            price: 50,
            totalPrice: 0
        },
    ])
    function deleteAmount() {
        localStorage.removeItem('amounts');
        setValueProd(0)
    }
    const clearDataInput = () => {
        itemsDetails.map((s, ind) => {
            if (value === s.name) {
                let newObject = itemsDetails;
                let i = ind;
                newObject[i] = { ...newObject[i], quantity: '1', order: '', category: 'SB' }
                setItemDetails(newObject);
                setInputValue('')
                setOrderValue('')
            }
        })
    }
    const AddData = (itemsDetails) => {
        itemsDetails.qntDetails = []
        const qntArray = {
            order: itemsDetails.order,
            date: Date.format(),
            category: itemsDetails.category,
            qnt: itemsDetails.quantity,
        }
        let a = 0;
        if (prod.length !== 0) {
            let newProd = [];
            for (let i = 0; i < prod.length; i++) {
                if (prod[i].name === itemsDetails.name) {
                    prod[i].qntDetails.push(qntArray)
                    let sum = 0;
                    for (let j = 0; j < prod[i].qntDetails.length; j++) {
                        sum += Number(prod[i].qntDetails[j].qnt);
                    }
                    prod[i].totalPrice = sum * prod[i].price;
                    newProd[i] = prod[i]
                    a++;
                }
                else { newProd[i] = prod[i] }
            }
            setProd(newProd)
        }
        if (a === 0) {
            let sum = 0;
            sum = Number(itemsDetails.quantity) * itemsDetails.price
            itemsDetails.totalPrice += sum;
            itemsDetails.qntDetails.push(qntArray)
            setProd(prod => [...prod, itemsDetails])
        }
    }
    const addNewDataInExistingItem = (item, newValue, newOrderValue, newItemType) => {
        qntDetails = []
        const qntArray = {
            order: newOrderValue,
            date: Date.format(),
            category: newItemType,
            qnt: newValue,
        }
        let newProd = [];
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].name === item.name) {
                prod[i].qntDetails.push(qntArray)
                let sum = 0;
                for (let j = 0; j < prod[i].qntDetails.length; j++) {
                    sum += Number(prod[i].qntDetails[j].qnt);
                }
                prod[i].totalPrice = sum * prod[i].price;
                newProd[i] = prod[i]
            }
            else { newProd[i] = prod[i] }
        }
        setProd(newProd)
    }

    const editqntDetails = (item, qntIdx, newValue, newOrderValue, newItemType) => {
        if (newValue === '' && newOrderValue === '') {
            alert("please enter a value")
        }
        else {
            let newProd = [];
            for (let i = 0; i < prod.length; i++) {
                if (prod[i].name === item.name) {
                    newProd[i] = prod[i]
                    let s = newProd[i].qntDetails[qntIdx].qnt;
                    let t = newProd[i].qntDetails[qntIdx].order;
                    let u = newProd[i].qntDetails[qntIdx].category;
                    newProd[i].qntDetails[qntIdx].qnt = newValue !== '' ? Number(newValue) : s;
                    newProd[i].qntDetails[qntIdx].order = newOrderValue !== '' ? newOrderValue : t;
                    newProd[i].qntDetails[qntIdx].category = newItemType === newProd[i].qntDetails[qntIdx].category ? u : newItemType;
                    console.log(newValue, newOrderValue, newItemType)
                    let sum = 0;
                    for (let j = 0; j < prod[i].qntDetails.length; j++) {
                        sum += Number(newProd[i].qntDetails[j].qnt);
                    }
                    newProd[i].totalPrice = sum * newProd[i].price;
                }
                else { newProd[i] = prod[i] }
            }
            setProd(newProd)
        }
    }

    const submit = () => {
        if (itemsDetails[0].name === '' && itemsDetails[1].name === '' && itemsDetails[2].name === ''
            && itemsDetails[3].name === '' && itemsDetails[4].name === '' && itemsDetails[5].name === '') {
            alert("Please Enter atleast one")
        }
        if (aler !== 0) {
            alert("please add after 3 second")
        }
        else {
            for (let i = 0; i < itemsDetails.length; i++) {
                if (itemsDetails[i].name === value) {
                    AddData(itemsDetails[i])
                }
            }
            clearDataInput();
            setAler(1)
            setTimeout(() => {
                setAler(0)
            }, 3000);
        }
    }
    const Previe = () => {
        if (prod.length === 0) { alert("No items to display, please add a new items") }
        else { setShowData(!showData) }
    }

    const delItemQnt = (itemsIndex, indexOfqntDetails) => {
        let DemoProd = [];
        for (let i = 0; i < prod.length; i++) {
            if (i === itemsIndex) {
                prod[i].totalPrice -= prod[i].qntDetails[indexOfqntDetails].qnt * prod[i].price
                prod[i].qntDetails.splice(indexOfqntDetails, 1);
                DemoProd[i] = prod[i]
            } DemoProd[i] = prod[i];
        }
        setProd(DemoProd)
    }
    const delItem = (itemIdx) => {
        if (window.confirm(`Are you sure to delete ${prod[itemIdx].name} ?`)) {
            setProd(prod.filter((e, i) => i !== itemIdx))
        }
    }
    const clear = () => {
        if (prod.length === 0) {
            alert("you have already no items in your storage")
            clearDataInput();
        }
        else if (window.confirm("Are you sure to delete all the items")) {
            localStorage.clear();
            setProd([])
            clearDataInput();
            setShowData(!showData)
        }
    }
    const changeValue = (e) => {
        if (value !== '') {
            setInputValue(e.target.value)
            itemsDetails.map((s, ind) => {
                if (value === s.name) {
                    let newObject = itemsDetails;
                    let i = ind;
                    newObject[i] = { ...newObject[i], quantity: e.target.value }
                    setItemDetails(newObject);
                }
            })
        }
    }
    const changeOrderValue = (e) => {
        if (value !== '') {
            setOrderValue(e.target.value)
            itemsDetails.map((s, ind) => {
                if (value === s.name) {
                    let newObject = itemsDetails;
                    let i = ind;
                    newObject[i] = { ...newObject[i], order: e.target.value }
                    setItemDetails(newObject);
                    
                }
            })
        }
    }
    function changeCategory(e) {
        if (value !== '') {
            setCategoryValue(e.target.value)
            itemsDetails.map((s, ind) => {
                if (value === s.name) {
                    let newObject = itemsDetails;
                    let i = ind;
                    newObject[i] = { ...newObject[i], category: e.target.value }
                    setItemDetails(newObject);
                    
                }
            })
        }
    }

    const changeAmount = (e) => {
        if (total < mila) {
            alert('please enter amount less than total price')
        }
        if (mila === '') {
            alert('please enter the amount')
        }
        else {
            setValueProd(valueProd => ([...valueProd, Number(mila)]))
            setMila('')
            setAler(1)
            setTimeout(() => {
                setAler(0)
            }, 3000);
        }
    }
    const checkBoxArray = [
        "Suit",
        "Coat",
        "Sadri",
        "Shirt",
        "Pant",
        "Waiscoat",
        "milaAmount"
    ]

    return (
        <>
            <h1 className='text-center'>Welcome</h1>
            <div className='select-item'>
                {checkBoxArray.map((a) => (
                    <div className="form-check form-check-inline">
                        <input className='liItem'
                            type="radio"
                            onChange={(e) => { setValue(e.target.id) }}
                            id={a}
                            name="drone"
                            value={a}
                        />
                        <label className='liItem' htmlFor={a}>{a}</label>
                    </div>
                ))}
            </div>
            <div className='text-center'>
                <h4>
                    {value === '' ? ("Check the box to add a data"
                    ) : `Enter the value of ${value}`}
                </h4>
            </div>
            <div className='content'>
                {value !== '' ? (
                    <div className="input-group flex-nowrap my-2 " >
                        <span className="input-group-text" id="addon-wrapping">{value}</span>
                        {value === 'Suit' || value === 'Sadri' || value === 'Coat' ? (
                            <select value={categoryValue}
                                onChange={changeCategory}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                {value === 'Suit' ? (
                                    <>
                                        <option>SB</option>
                                        <option>Shawl collar</option>
                                        <option>DB</option>
                                        <option>Prince</option>
                                        <option>Three piece</option>
                                    </>
                                ) : value === 'Coat' ? (
                                    <>
                                        <option>SB</option>
                                        <option>Shawl collar</option>
                                        <option>DB</option>
                                        <option>Prince</option>
                                    </>
                                ) :
                                    <>
                                        <option>Shawl collar</option>
                                        <option>Normal collar</option>
                                    </>
                                }
                            </select>
                        ) : null
                        }
                        {value !== 'milaAmount' ? (
                            <select value={inputValue}
                                onChange={changeValue}
                                className="suit-selected form-select"
                                aria-label="Default select example"
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        ) :
                            <input style={{ width: "100px" }}
                                value={mila} onChange={(e) => { setMila(e.target.value) }}
                                type="text"
                                className="form-control"
                                placeholder="Enter Mila Amount"
                                aria-label="Last Name"
                                aria-describedby="addon-wrapping"
                            />
                        }
                        {value !== 'milaAmount' ? (
                            <input style={{ width: "100px" }}
                                value={orderValue} onChange={changeOrderValue}
                                type="text"
                                className="form-control"
                                placeholder="Order no. shirts"
                                aria-label="Last Name"
                                aria-describedby="addon-wrapping"
                            />
                        ) : null
                        }
                    </div>
                ) : null}
                <div className='btns'>
                    <div>
                        {value !== '' ? (
                            <button onClick={value === 'milaAmount' ? (changeAmount) : submit}
                                type="submit"
                                className="btn btn-sm btn-primary">
                                Save</button>
                        ) : null
                        }
                        <button onClick={Previe} type="submit" className="btn btn-sm btn-success mx-3">
                            preview</button>
                    </div>
                    <button onClick={clear} type="submit" className="btn btn-sm btn-danger">
                        Delete all
                    </button>
                </div>
                {
                    aler !== 0 ? (
                        <div className="alert alert-success my-2" role="alert">
                            Data successfully save {value} !
                        </div>
                    ) : null
                }
            </div>
            {showData === true && prod.length !== 0 ? (
                <div className='elseSpan'>
                    <DataLocal prod={prod}
                        total={total}
                        showData={showData}
                        addNewDataInExistingItem={addNewDataInExistingItem}
                        editqntDetails={editqntDetails}
                        delItem={delItem}
                        delItemQnt={delItemQnt}
                        valueProd={valueProd}
                        deleteAmount={deleteAmount} />
                </div>
            ) : prod.length === 0 ? <span className='elseSpan' >Please add an items</span>
                : (<span className='elseSpan' >Click on preview to show the data</span>)
            }
        </>
    )
}
export default Item;