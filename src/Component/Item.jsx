import './style.css';
import { useState, useEffect } from 'react'
import DateObject from "react-date-object";
import DataLocal from './DataLocal';


function Item() {
    const [suits, setSuits] = useState("")
    const [suitsOrder, setSuitsOrder] = useState("")
    const [suitName, setSuitName] = useState("Shawl collar")
    const [sadri, setSadri] = useState("")
    const [sadriOrder, setSadriOrder] = useState("")
    const [sadriName, setSadriName] = useState("Shawl collar")
    const [shirts, setShirts] = useState("")
    const [shirtsOrder, setShirtsOrder] = useState("")
    const [pants, setPants] = useState("")
    const [pantsOrder, setPantsOrder] = useState("")
    const [waiscoat, setWaiscoat] = useState("")
    const [waiscoatOrder, setWaiscoatOrder] = useState("")


    const [showData, setShowData] = useState(false)
    let total = 0, qntDetails = []

    let Date = new DateObject();

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
            name: "Sadri",
            category: sadriName,
            order: sadriOrder,
            quantity: sadri,
            qntDetails,
            price: 70,
            totalPrice: 0
        },
        {
            name: "shirt",
            quantity: shirts,
            order: shirtsOrder,
            qntDetails,
            price: 40,
            totalPrice: 0
        },
        {
            name: "Pants",
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
        setSuits("")
        setSuitsOrder("")
        setSadri("")
        setSadriOrder("")
        setShirts("")
        setShirtsOrder("")
        setPants("")
        setPantsOrder("")
        setWaiscoat("")
        setWaiscoatOrder("")
        setSuitName("Shawl collar")
        setSadriName("Shawl collar")
    }
    const AddData = (itemsDetails) => {
        itemsDetails.qntDetails = []
        const qntArray = {
            date: Date.format(),
            order: itemsDetails.order,
            category: itemsDetails.category,
            qnt: itemsDetails.quantity,
        }
        let sum = 0;
        sum = Number(itemsDetails.quantity) * itemsDetails.price
        itemsDetails.totalPrice += sum;
        itemsDetails.qntDetails.push(qntArray)
        setProd(prod => [...prod, itemsDetails])
    }
    const addNewDataInExistingItem = (item, newValue, newOrderValue, newItemType) => {
        qntDetails = []
        const qntArray = {
            date: Date.format(),
            order: newOrderValue,
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
        if(newValue==='' && newOrderValue===''){
            alert("please enter a value")
        }
        else{

            let newProd = [];
            for (let i = 0; i < prod.length; i++) {
                if (prod[i].name === item.name) {
                newProd[i] = prod[i]
                let s= newProd[i].qntDetails[qntIdx].qnt;
                let t= newProd[i].qntDetails[qntIdx].order;
                newProd[i].qntDetails[qntIdx].qnt = newValue!==''? Number(newValue):s;
                newProd[i].qntDetails[qntIdx].order = newOrderValue !== ''? Number(newOrderValue): t;
                newProd[i].qntDetails[qntIdx].category = newItemType;
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
    const editt = (itemsDetails) => {
        itemsDetails.qntDetails = []
        const qntArray = {
            date: Date.format(),
            order: itemsDetails.order,
            category: itemsDetails.category,
            qnt: itemsDetails.quantity,
        }
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
            }
            else { newProd[i] = prod[i] }
        }
        setProd(newProd)
    }
    const submit = () => {
        if (suits === '' && sadri === '' && shirts === '' && pants === '' && waiscoat === '') {
            alert("Please Enter atleast one")
        }
        else {
            for (let i = 0; i < itemsDetails.length; i++) {
                if (itemsDetails[i].quantity !== "") {
                    if (prod.length !== 0) {
                        let a = 0;
                        for (let k = 0; k < prod.length; k++) {
                            if (prod[k].name === itemsDetails[i].name) {
                                editt(itemsDetails[i], k)
                                clearDataInput();
                                a++;
                            }
                        }
                        if (a === 0) { AddData(itemsDetails[i]) }
                    }
                    else { AddData(itemsDetails[i]) }
                }
            }
            clearDataInput()
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

    return (
        <>
            <div className=''>
                <h1 className='text-center'>Welcome</h1>
                <div className='input-group flex-nowrap my-2'>
                    <span className="input-group-text" id="addon-wrapping">Suit</span>
                    <select value={suitName} onChange={(e) => setSuitName(e.target.value)} className="form-select" aria-label="Default select example">
                        <option >Shawl collar</option>
                        <option>D B</option>
                        <option>S B</option>
                        <option>Prince</option>
                        <option>Three piece</option>
                        <option>coat/blazer</option>
                    </select>
                    <input style={{ width: "100px" }} value={suits} onChange={(e) => setSuits(e.target.value)} type="number" className="form-control" placeholder="Enter no. of suits" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    <input style={{ width: "100px" }} value={suitsOrder} onChange={(e) => setSuitsOrder(e.target.value)} type="text" className="form-control" placeholder="Order no. suits" aria-label="Enter here" aria-describedby="addon-wrapping" />
                </div>
                <div className='input-group flex-nowrap my-2'>
                    <span className="input-group-text" id="addon-wrapping">Sadri</span>
                    <select value={sadriName} onChange={(e) => { setSadriName(e.target.value) }} className="suit-selected form-select " aria-label="Default select example">
                        <option>Shawl collar</option>
                        <option>noraml collar</option>
                    </select>
                    <input style={{ width: "100px" }} value={sadri} onChange={(e) => setSadri(e.target.value)} type="number" className="form-control" placeholder="Enter no. of sadri" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    <input style={{ width: "100px" }} value={sadriOrder} onChange={(e) => setSadriOrder(e.target.value)} type="number" className="form-control" placeholder="Order no. sadri" aria-label="Enter here" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group flex-nowrap my-2 " >
                    <span className="input-group-text" id="addon-wrapping"> Shirts</span>
                    <input style={{ width: "100px" }} value={shirts} onChange={(e) => setShirts(e.target.value)} type="number" className="form-control" placeholder="Enter no. of shirts" aria-label="First Name" aria-describedby="addon-wrapping" />
                    <input style={{ width: "100px" }} value={shirtsOrder} onChange={(e) => setShirtsOrder(e.target.value)} type="number" className="form-control" placeholder="Order no. shirts" aria-label="Last Name" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group flex-nowrap my-2">
                    <span className="input-group-text" id="addon-wrapping">Pants</span>
                    <input style={{ width: "100px" }} value={pants} onChange={(e) => setPants(e.target.value)} type="number" className="form-control" placeholder="Enter no. of pants" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    <input style={{ width: "100px" }} value={pantsOrder} onChange={(e) => setPantsOrder(e.target.value)} type="number" className="form-control" placeholder="Order no.pants" aria-label="Enter here" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group flex-nowrap my-2">
                    <span className="input-group-text" id="addon-wrapping">waiscoats</span>
                    <input style={{ width: "100px" }} value={waiscoat} onChange={(e) => setWaiscoat(e.target.value)} type="number" className="form-control" placeholder="Enter no. of waiscoat" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    <input style={{ width: "100px" }} value={waiscoatOrder} onChange={(e) => setWaiscoatOrder(e.target.value)} type="number" className="form-control" placeholder="Order no. waiscoat" aria-label="Enter here" aria-describedby="addon-wrapping" />
                </div>
                <div className='btns'>
                    <div>
                        <button onClick={submit} type="submit" className="btn btn-sm btn-primary">
                            Add</button>
                        <button onClick={Previe} type="submit" className="btn btn-sm btn-success mx-3">
                            preview</button>
                    </div>
                    <button onClick={clear} type="submit" className="btn btn-sm btn-danger">
                        Delete all
                    </button>
                </div>
            </div>
            {showData === true && prod.length !== 0 ? (
                <div className='elseSpan'>
                    <DataLocal prod={prod}
                        total={total}
                        showData={showData}
                        addNewDataInExistingItem={addNewDataInExistingItem}
                        editqntDetails={editqntDetails}
                        delItem={delItem}
                        delItemQnt={delItemQnt} />
                </div>

            ) : prod.length === 0 ? <span className='elseSpan' >Please add an items</span>
                : <span className='elseSpan' >Click on preview to show the data</span>
            }
        </>
    )
}
export default Item;