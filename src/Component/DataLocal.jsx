import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { BiToggleRight } from "react-icons/bi";
import { SlArrowDown } from "react-icons/sl";

function DataLocal({ prod, total, delItem, delItemQnt }) {
    const [showQnt, setShowQnt] = useState(false)
    const exportData = async () => {
        const doc = new jsPDF()
        autoTable(doc, { html: '#ddf' })
        doc.save("data.pdf");
    }
    const styles = {
        // display: 'none'
    }
    const toggleQntDetails = () => {
        setShowQnt(!showQnt)
        console.log('rrr')
        // styles={
        //     display:'block'
        // }
    }
    const onChange = (itemName) => {
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].name === itemName) {
                delItem(prod[i])
            }
        }
    }
    const onChangeQnt = (itemName, qntItem) => {
        delItemQnt(itemName, qntItem)
    }
    const editOrAdd = (itemName) => {
        for (let i = 0; i < prod.length; i++) {
            console.log("gg")

        }
    }

    return (
        <>
            <div className="tablecontainer">
                <table id="my-table" className="my-10 table table-striped table-bordered">
                    <thead className="table-bordered">
                        <tr className="table-dark">
                            <th className="text-center">ITEMS</th>
                            <th className="text-center" >QNT</th>
                            <th>Rs.</th>
                            <th>TOTAL</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {prod && prod.map((item) => (
                            <tr className="table table-bordered">
                                <td className="aligner" >{item.name}</td>
                                <td className="text-center ">
                                    <tr className="table-active">
                                        <th>Date</th>
                                        <th>Order N.</th>
                                        {
                                            item.name === "Suit" || item.name === "Sadri" ? (
                                                <th>Types</th>
                                            ) : null
                                        }
                                        <th>QNT</th>
                                        <th></th>
                                    </tr>
                                    {item.qntDetails && item.qntDetails.map((qntItem, idx) => (
                                        // <>
                                            <tr onClick={() => { toggleQntDetails(idx) }} style={{ display: 'block' }}>
                                                <td>{qntItem.date}</td>
                                                {

                                                    qntItem.order !== "" ? (
                                                        <td>{qntItem.order}</td>
                                                    ) : <td>-</td>
                                                }
                                                {
                                                    item.name === "Suit" || item.name === "Sadri" ? (
                                                        <td>{qntItem.category}</td>
                                                    ) : null
                                                }
                                                <td>{qntItem.qnt}</td>
                                                <td>
                                                    <button onClick={() => { onChangeQnt(item, item.qntDetails.indexOf(qntItem)) }} className="btn btn-sm btn-danger">
                                                        Del
                                                    </button>
                                                </td>
                                            </tr>
                                            // {/* {idx === 0 ? ( */}
                                                // <>
                                                    // {/* <td>-</td>
                                                    // <td>-</td>
                                                    // <td>-</td>
                                                    // {
                                                        // item.name === "Suit" || item.name === "Sadri" ? (
                                                            // <>
                                                                // <td>-</td>
                                                                // <td>f<SlArrowDown onClick={toggleQntDetails} /></td>
                                                                // </>
                                                            // ) : (
                                                                // <td>f<SlArrowDown onClick={toggleQntDetails} /></td>
                                                            // )
                                                            
                                                        // } */}
                                                    // {/* <SlArrowDown onClick={toggleQntDetails} />
                                                // </>
                                            // ) : null 
                                            //}
                                        //</>
                                    ))
                                }
                                </td>
                                <td>{item.price}</td>
                                <td>{item.totalPrice}</td>
                                <td>
                                    <button onClick={() => { editOrAdd(item.name) }} className="btn btn-sm btn-primary">Add
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => { onChange(item.name) }} className="iconn btn btn-sm btn-danger">Del</button>
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
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onClick={exportData} className="btn btn-danger">Print</button>
            </div>
        </>
    )
}
export default DataLocal;