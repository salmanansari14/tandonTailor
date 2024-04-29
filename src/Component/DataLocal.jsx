import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown, IoMdClose } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Dialog } from '@mui/material';
import QntDetailsInfo from "./QntDetailsIinfo";

function DataLocal({ prod,
    total,
    editqntDetails,
    addNewDataInExistingItem,
    delItem,
    delItemQnt,
    valueProd,
    deleteAmount }) {

    const [showDetails, setShowDetails] = useState(false)
    const [addToggle, setAddToggle] = useState(false)
    const [editToggle, setEditToggle] = useState(false)
    const [newValue, setNewValue] = useState('')
    const [newOrderValue, setNewOrderValue] = useState('')
    const [newItemType, setNewItemType] = useState('Shawl collar')

    const [item, setItem] = useState({})
    const [itemEdit, setItemEdit] = useState([])
    const [qntEditIdx, setQntEditIdx] = useState({})

    const exportData = async () => {
        const doc = new jsPDF()
        autoTable(doc, { html: '#my-table' })
        doc.save("data.pdf");
    }
    const setQntdlgValue = (itemIdx) => {
        setItem(itemIdx)
        setAddToggle(!addToggle)
    }
    const addQntDetails = (item, newValue, newOrderValue, newItemType) => {
        addNewDataInExistingItem(item, newValue, newOrderValue, newItemType)
        setAddToggle(!addToggle)
        setNewValue('')
        setNewOrderValue('')
        setNewItemType('Shawl collar')
    }
    const editqntValue = (item, qntIdx) => {
        setItemEdit(item)
        setQntEditIdx(qntIdx)
        setEditToggle(!editToggle)

    }
    const editqnt = (item, qntIdx, newValue, newOrderValue, newItemType) => {
        console.log(item.qntDetails[qntIdx].category === newItemType)
        if (newValue === '' && newOrderValue === '' && item.qntDetails[qntIdx].category === newItemType) {
            alert("please add a value")
            setEditToggle(!editToggle)
            return
        }
        editqntDetails(item, qntIdx, newValue, newOrderValue, newItemType)
        setEditToggle(!editToggle)
        setNewValue('')
        setNewOrderValue('')
        setNewItemType('Shawl collar')
    }
    let quntities = []
    for (let i = 0; i < prod.length; i++) {
        let a = 0
        for (let j = 0; j < prod[i].qntDetails.length; j++) {
            quntities[i] = 0;
            a = Number(a + Number(prod[i].qntDetails[j].qnt));
        }
        quntities[i] = a;
    }
    let MilaTotal = Number()
    for (let i = 0; i < valueProd.length; i++) {
        MilaTotal = Number(MilaTotal + valueProd[i]);
    }

    const closeDialog = (a) => {
        if (a === 'addtoggle') {
            setAddToggle(!addToggle)
        }
        else {
            setEditToggle(!editToggle)
        }
    }
    const  [itemdetails, setItemDetails]=useState()
    const showItemDetails = (itemIdx) => {
        setItemDetails(itemIdx)
        setShowDetails(!showDetails)
        console.log(showDetails)
    }
    return (
        <>
            <div className="tablecontainer" id="dd">
                <table id="my-table" className="my-10 table table-striped table-bordered">
                    <thead className="table-bordered">
                        <tr className="table-dark">
                            <th className="text-center">ITEMS</th>
                            <th className="text-center" >QNT</th>
                            <th>Rs.</th>
                            <th className="text-center">TOTAL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {prod && prod.map((item, itemIdx) => (
                            <tr className="table-bordered">
                                <td className="aligner" >{item.name}</td>
                                <td className="text-center ">
                                    <tr style={{ display: "inline" }}>
                                        <div style={{ border: "0.5px solid rgb(222, 224, 224)" }}>
                                            <span style={{ margin: "10px 25px" }}>
                                                {quntities[itemIdx]}
                                            </span>
                                            {
                                                showDetails === true &&itemIdx===itemdetails ? (
                                                    <IoIosArrowBack onClick={() => { setItemDetails('e') }} />
                                                ) :
                                                    <IoIosArrowDown onClick={() => { showItemDetails(itemIdx) }} />
                                            }
                                            {
                                                showDetails === true && itemIdx===itemdetails ? (
                                                    <span className="qnticon addicon">
                                                        <MdAdd style={{ margin: '7px 18px' }} onClick={() => { setQntdlgValue(item) }} />
                                                    </span>
                                                ) : null
                                            }
                                        </div>
                                    </tr>
                                    {showDetails === true && itemdetails===itemIdx ? (
                                        <tr className=" table-active table-bordered text-center">
                                            <th>Order</th>
                                            <th>Date</th>
                                            {item.name === "Suit" || item.name === "Sadri" ?
                                                (<th>Types</th>) :
                                                null}
                                            <th>QNT</th>
                                            <th></th>
                                        </tr>
                                    ) : null}
                                    {showDetails === true ? (
                                        item.qntDetails && item.qntDetails.map((qntItem, qntIdx) => (
                                            // <tr className="text-center">
                                            //     <td>{qntItem.date}</td>
                                            //     {qntItem.order !== "" ?
                                            //         (<td>{qntItem.order}</td>) :
                                            //         <td>-</td>}
                                            //     {item.name === "Suit" || item.name === "Sadri" ?
                                            //         (<td>{qntItem.category}</td>) :
                                            //         null}
                                            //     <td>{qntItem.qnt}</td>
                                            //     <td>
                                            //         <span className="qnticon">
                                            //             <MdOutlineModeEdit className="editt" onClick={() => { editqntValue(item, qntIdx) }} />
                                            //         </span>
                                            //         <span className="qnticon">
                                            //             <RiDeleteBinLine className="iconn" onClick={() => { delItemQnt(itemIdx, qntIdx) }} />
                                            //         </span>
                                            //     </td>
                                            // </tr>
                                                <QntDetailsInfo
                                                    qntItemDate={qntItem.date}
                                                    qntItemOrder={qntItem.order}
                                                    qntItemCategory={qntItem.category}
                                                    qntItemQnt={qntItem.qnt}
                                                    itemName={item.name}
                                                    itemIdx={itemIdx}
                                                    itemdetails={itemdetails}
                                                    qntIdx={qntIdx}
                                                    item={item}
                                                    delItemQnt={delItemQnt}
                                                    editqntValue={editqntValue}
                                                />
                                        ))
                                    ) : null
                                    }
                                </td>
                                <td>{item.price}</td>
                                <td className="text-center">{item.totalPrice}</td>
                                <td className="text-center">
                                    <span className="iconn">
                                        <RiDeleteBinLine onClick={() => { delItem(itemIdx) }} />
                                    </span>
                                </td>
                            </tr>
                        ))
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total={total}</td>
                            <td></td>
                        </tr>
                        {
                            valueProd !== 0 ? (
                                <tr className="text-center">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-center">
                                        <th className="table-bordered">
                                            <div style={{ border: "0.5px solid rgb(222, 224, 224)" }}>
                                                <span style={{ margin: "10px 25px" }}>
                                                    {MilaTotal}
                                                </span>
                                                {
                                                    showDetails === true ? (
                                                        <IoIosArrowBack onClick={() => { setShowDetails(!showDetails) }} />
                                                    ) :
                                                        <IoIosArrowDown onClick={() => { setShowDetails(!showDetails) }} />
                                                }
                                            </div>
                                            <td>y</td>
                                            <td>55</td>
                                        </th>
                                        {valueProd && valueProd.map((amount) => (
                                            <tr className="table-bordered">
                                                <td>Mila={amount}</td>
                                            </tr>
                                        ))}
                                    </td>
                                    <td>
                                        <span className="qnticon">
                                            <RiDeleteBinLine onClick={deleteAmount} className="iconn" />
                                        </span>
                                    </td>
                                </tr>
                            ) : null
                        }
                        {
                            valueProd !== 0 ? (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Due={total - MilaTotal}</td>
                                    <td></td>
                                </tr>
                            ) : null
                        }
                    </tbody>
                </table>

                <Dialog open={addToggle}
                    onClose={() => { setAddToggle(!addToggle) }}
                >
                    <IoMdClose onClick={() => { closeDialog("addtoggle") }} style={{ width: 'fit-content', fontSize: '30px' }} />
                    <div style={{ margin: "40px", width: "400px", height: "200px" }}>
                        <h4>Add a new value of {item.name}</h4>
                        <div className="input-group flex-nowrap my-2 "  >
                            <span className="input-group-text" id="addon-wrapping">{item.name}</span>
                            {
                                item.name === 'Suit' ? (
                                    <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option >Shawl collar</option>
                                        <option>D B</option>
                                        <option>S B</option>
                                        <option>Prince</option>
                                        <option>Three piece</option>
                                        <option>coat/blazer</option>
                                    </select>
                                ) : item.name === 'Sadri' ? (
                                    <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option >Shawl collar</option>
                                        <option>Normal collar</option>
                                    </select>
                                ) : null
                            }
                            <input style={{ width: "100px" }} type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="form-control" placeholder="Enter no." aria-label="First Name" aria-describedby="addon-wrapping" />
                            <input style={{ width: "100px" }} type="text" value={newOrderValue} onChange={(e) => setNewOrderValue(e.target.value)} className="form-control" placeholder="Order no. shirts" aria-label="Last Name" aria-describedby="addon-wrapping" />
                        </div>
                        <div style={{ width: 'fit-content', display: 'block', margin: "60px auto" }}>
                            <button className="btn btn-success" onClick={() => { addQntDetails(item, newValue, newOrderValue, newItemType) }}>Submit</button>
                        </div>
                    </div>
                </Dialog>
                <Dialog open={editToggle}
                    onClose={closeDialog}
                >
                    <IoMdClose onClick={closeDialog} style={{ width: 'fit-content', fontSize: '30px' }} />
                    <div style={{ margin: "40px", width: "400px", height: "200px" }}>
                        <h4>Add a new value of {itemEdit.name}</h4>
                        <div className="input-group flex-nowrap my-2 "  >
                            <span className="input-group-text" id="addon-wrapping">{itemEdit.name}</span>
                            {
                                itemEdit.name === 'Suit' ? (
                                    <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option >Shawl collar</option>
                                        <option>D B</option>
                                        <option>S B</option>
                                        <option>Prince</option>
                                        <option>Three piece</option>
                                        <option>coat/blazer</option>
                                    </select>
                                ) : itemEdit.name === 'Sadri' ? (
                                    <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option >Shawl collar</option>
                                        <option>Normal collar</option>
                                    </select>
                                ) : null
                            }
                            <input style={{ width: "100px" }} type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="form-control" placeholder="Enter no." aria-label="First Name" aria-describedby="addon-wrapping" />
                            <input style={{ width: "100px" }} type="text" value={newOrderValue} onChange={(e) => setNewOrderValue(e.target.value)} className="form-control" placeholder="Order no. shirts" aria-label="Last Name" aria-describedby="addon-wrapping" />
                        </div>
                        <div style={{ width: 'fit-content', display: 'block', margin: "60px auto" }}>
                            <button className="btn btn-success"
                                onClick={() => { editqnt(itemEdit, qntEditIdx, newValue, newOrderValue, newItemType) }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Dialog>

                <button type="button" onClick={exportData} className="btn btn-danger">Print</button>
            </div>
        </>
    )
}
export default DataLocal