import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

function QntDetailsInfo({
    qntItemDate,
    qntItemOrder,
    qntItemCategory,
    qntItemQnt,
    itemName,
    itemIdx,
    itemdetails,
    qntIdx,
    item,
    delItemQnt,
    editqntValue,
    show }) {
    return (
        <>
            {
            itemIdx === itemdetails ? (
                <tr className="text-center" style={{ border: "0.5px solid rgb(163, 163, 163)" }}>
                    {qntItemOrder !== "" ?
                        (<td>{qntItemOrder}</td>) :
                        <td>-</td>}
                    <td>{qntItemDate}</td>
                    {itemName === "Suit" || itemName === "Sadri" || itemName === "Coat" || itemName === 'Pajama' ?
                        (<td>{qntItemCategory}</td>) :
                        null}
                    <td>{qntItemQnt}</td>
                    <td>
                        <span className="qnticon">
                            <MdOutlineModeEdit className="editt" onClick={() => { editqntValue(item, qntIdx) }} />
                        </span>
                        <span className="qnticon">
                            <RiDeleteBinLine className="iconn" onClick={() => { delItemQnt(itemIdx, qntIdx) }} />
                        </span>
                    </td>
                </tr>
            ) : null}
        </>
    )
}
export default QntDetailsInfo;
