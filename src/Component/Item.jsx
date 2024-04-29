import './style.css';
import { useState, useEffect } from 'react'
import DateObject from "react-date-object";
import DataLocal from './DataLocal';

function Item() {
    const [suits, setSuits] = useState("1")
    const [suitsOrder, setSuitsOrder] = useState("")
    const [suitName, setSuitName] = useState("S B")
    const [coat, setCoat] = useState("1")
    const [coatOrder, setCoatOrder] = useState("")
    const [coatName, setCoatName] = useState("S B")
    const [sadri, setSadri] = useState("1")
    const [sadriOrder, setSadriOrder] = useState("")
    const [sadriName, setSadriName] = useState("Shawl collar")
    const [shirts, setShirts] = useState("1")
    const [shirtsOrder, setShirtsOrder] = useState("")
    const [pants, setPants] = useState("1")
    const [pantsOrder, setPantsOrder] = useState("")
    const [waiscoat, setWaiscoat] = useState("1")
    const [waiscoatOrder, setWaiscoatOrder] = useState("")
    const [mila, setMila] = useState('')

    const [value, setValue] = useState("")
    const [inputValue, setInputValue] = useState('')
    const [orderValue, setOrderValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [aler, setAler] = useState(0)

    const [showData, setShowData] = useState(false)
    let total = 0, qntDetails = []
    let Date = new DateObject();

    const [valueProd, setValueProd] = useState(
        localStorage.getItem('amounts') === null ?
            [] :
            JSON.parse(localStorage.getItem('amounts'))
    )
    useEffect(() => {
        localStorage.setItem("amounts", JSON.stringify(valueProd));
    })
    function deleteAmount() {
        localStorage.removeItem('amounts');
        setValueProd(0)
    }

    const [prod, setProd] = useState(
        localStorage.getItem('item') === null ? [] :
            JSON.parse(localStorage.getItem("item")))
    if (prod.length !== 0) {
        for (let i = 0; i < prod.length; i++) {
            total += prod[i].totalPrice;
        }
    }
    const itemsDetails = [
        {
            name: "Suit",
            category: suitName,
            order: suitsOrder,
            quantity: suits,
            qntDetails,
            price: 150,
            totalPrice: 0
        },
        {
            name: "Coat",
            category: coatName,
            order: coatOrder,
            quantity: coat,
            qntDetails,
            price: 150,
            totalPrice: 0
        },
        {
            name: "Sadri",
            category: sadriName,
            order: sadriOrder,
            quantity: sadri,
            qntDetails,
            price: 70,
            totalPrice: 0
        },
        {
            name: "Shirt",
            quantity: shirts,
            order: shirtsOrder,
            qntDetails,
            price: 40,
            totalPrice: 0
        },
        {
            name: "Pant",
            quantity: pants,
            order: pantsOrder,
            qntDetails,
            price: 30,
            totalPrice: 0
        },
        {
            name: "Waiscoat",
            quantity: waiscoat,
            order: waiscoatOrder,
            qntDetails,
            price: 50,
            totalPrice: 0
        },
    ]
    useEffect(() => {
        localStorage.setItem("item", JSON.stringify(prod))
    },)
    const clearDataInput = () => {
        setSuits("1")
        setSuitsOrder("")
        setSadri("1")
        setSadriOrder("")
        setShirts("1")
        setShirtsOrder("")
        setPants("1")
        setPantsOrder("")
        setWaiscoat("1")
        setWaiscoatOrder("")
        setInputValue('')
        setOrderValue('')
        setSuitName("S B")
        setSadriName("Shawl collar")
    }
    const AddData = (itemsDetails, newValue, newOrderValue, newItemType) => {
        qntDetails = []
        const qntArray = {
            order: itemsDetails.order,
            date: Date.format(),
            category: itemsDetails.category,
            qnt: itemsDetails.quantity,
        }
        let a = 0;
        if (prod !== null) {
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
        if (suits === '' && sadri === '' && shirts === '' && pants === '' && waiscoat === '') {
            alert("Please Enter atleast one")
        }
        else {
            for (let i = 0; i < itemsDetails.length; i++) {
                if (itemsDetails[i].name === value) {
                    let a = 0;
                    if (prod.length !== 0) {
                        for (let k = 0; k < prod.length; k++) {
                            if (prod[k].name === itemsDetails[i].name) {
                                // editt(itemsDetails[i])
                                AddData(itemsDetails[i])
                                clearDataInput();
                                a++;
                            }
                        }
                    }
                    if (a === 0) { AddData(itemsDetails[i]) }
                }
            }
            setAler(1)
            setTimeout(() => {
                setAler(0)
            }, 3000);
        } clearDataInput()
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
            setProd(prod.filter((e) => {
                return (e !== prod[itemIdx])
            }))
        }
    }
    const clear = () => {
        if (prod.length === 0) {
            alert("you have already no items in your storage")
            clearDataInput();
        }
        else if (window.confirm("Are you sure to delete all the items")) {
            clearDataInput();
            localStorage.clear();
            setProd([])
            setShowData(!showData)
        }
    }
    const changeValue = (e) => {
        if (value !== '') {
            setInputValue(e.target.value)
        }
        if (value === 'Suit') {
            setSuits(e.target.value)
            console.log("1")
        }
        if (value === 'Sadri') {
            setSadri(e.target.value)
            console.log("2")
        }
        if (value === 'Shirt') {
            setShirts(e.target.value)
            console.log("3")
        }
        if (value === 'Pant') {
            setPants(e.target.value)
            console.log("4")
        }
        if (value === 'Waiscoat') {
            setWaiscoat(e.target.value)
            console.log("5")
        }
        if (value === 'milaAmount') {
            setMila(e.target.value)
        }
    }
    const changeOrderValue = (e) => {
        if (value !== '') {
            setOrderValue(e.target.value)
        }
        if (value === 'Suit') {
            setSuitsOrder(e.target.value)
        }
        if (value === 'Sadri') {
            setSadriOrder(e.target.value)
        }
        if (value === 'Shirt') {
            setShirtsOrder(e.target.value)
        }
        if (value === 'Pant') {
            setPantsOrder(e.target.value)
        }
        if (value === 'Waiscoat') {
            setWaiscoatOrder(e.target.value)
        }
    }
    function changeCategory(e) {
        if (value === 'Suit') {
            setCategoryValue(e.target.value)
            setSuitName(e.target.value)
        }
        if (value === 'Sadri') {
            setCategoryValue(e.target.value)
            setSadriName(e.target.value)
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

    const changeAmount = (e) => {
        console.log(mila)
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
                        <label className='liItem' for={a}>{a}</label>
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
                        {value === 'Suit' || value === 'Sadri' ||value==='Coat'? (
                            <select value={categoryValue}
                                onChange={changeCategory}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                {value === 'Suit' ? (
                                    <>
                                        <option>S B</option>
                                        <option>Shawl collar</option>
                                        <option>D B</option>
                                        <option>Prince</option>
                                        <option>Three piece</option>
                                    </>
                                ) : value=== 'Coat'?(
                                    <>
                                        <option>S B</option>
                                        <option>Shawl collar</option>
                                        <option>D B</option>
                                        <option>Prince</option>
                                    </>
                                ):
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