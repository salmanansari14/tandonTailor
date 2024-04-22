import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddToPhotos, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine, RiFileAddLine } from "react-icons/ri";
import { Dialog } from '@mui/material';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/CloseIcon';


function DataLocal({ prod, total, editqntDetails, addNewDataInExistingItem, delItem, delItemQnt }) {

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
        console.log(item.qntDetails[qntIdx].category===newItemType)
        if (newValue === '' && newOrderValue === '' && item.qntDetails[qntIdx].category===newItemType) {
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
                            <tr className="table table-bordered">
                                <td className="aligner" >{item.name}</td>
                                <td className="text-center ">
                                    <tr className="" style={{ display: "inline" }}>
                                        <div style={{ border: "0.5px solid rgb(222, 224, 224)" }}>
                                            <span style={{ margin: "10px 25px" }}>
                                                {quntities[itemIdx]}
                                            </span>
                                            {
                                                showDetails === true ? (
                                                    <IoIosArrowBack onClick={() => { setShowDetails(!showDetails) }} />
                                                ) :
                                                    <IoIosArrowDown onClick={() => { setShowDetails(!showDetails) }} />
                                            }
                                            {
                                                showDetails === true ? (
                                                    <span className="qnticon">
                                                        <RiFileAddLine style={{ margin: '7px 18px' }} onClick={() => { setQntdlgValue(item) }} />
                                                    </span>
                                                ) : null
                                            }
                                        </div>
                                    </tr>
                                    {
                                        showDetails === true ? (
                                            <tr className=" table-active table-bordered text-center">
                                                <th>Date</th>
                                                <th>Order N.</th>
                                                {item.name === "Suit" || item.name === "Sadri" ?
                                                    (<th>Types</th>) :
                                                    null}
                                                <th>QNT</th>
                                                <th>-</th>
                                            </tr>
                                        ) : null
                                    }
                                    {showDetails === true ? (
                                        item.qntDetails && item.qntDetails.map((qntItem, qntIdx) => (
                                            <tr style={{ margin: "10px" }} className="text-center">
                                                <td>{qntItem.date}</td>
                                                {qntItem.order !== "" ?
                                                    (<td>{qntItem.order}</td>) :
                                                    <td>-</td>}
                                                {item.name === "Suit" || item.name === "Sadri" ?
                                                    (<td>{qntItem.category}</td>) :
                                                    null}
                                                <td>{qntItem.qnt}</td>
                                                <td>
                                                    <span className="qnticon">
                                                        <MdOutlineModeEdit className="editt" onClick={() => { editqntValue(item, qntIdx) }} />
                                                    </span>

                                                    <span className="qnticon">
                                                        <RiDeleteBinLine className="iconn" onClick={() => { delItemQnt(itemIdx, qntIdx) }} />
                                                    </span>
                                                </td>
                                            </tr>
                                            // ):null
                                        ))
                                    ) : null
                                    }
                                </td>
                                <td>{item.price}</td>
                                <td className="text-center">{item.totalPrice}</td>
                                <td>
                                    <RiDeleteBinLine style={{ color: "red" }} className="iconn" onClick={() => { delItem(itemIdx) }} />
                                </td>
                            </tr>
                        ))
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total}=Total</td>
                            <td></td>
                        </tr>
                        <tr className="text-center">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-center">{total}=Advance</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total}=</td>
                            <td></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total}=Due</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <Dialog open={addToggle}
                    onClose={() => { setAddToggle(!addToggle) }}
                >
                    <button >
                        close
                    </button>
                    {/* <IconButton onClick={onclose}>
                        <CloseIcon/>
                    </IconButton> */}
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
                    onClose={() => { setEditToggle(!editToggle) }}
                >
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