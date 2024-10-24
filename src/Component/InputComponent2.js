
function InputComponent2({
    value,
    inputValue,
    orderValue,
    categoryValue,
    mila,
    changeValue,
    changeOrderValue,
    changeCategory,
    changeAmount,
}) {

    return (
        <>
            {value !== '' ? (
                <div className="input-group flex-nowrap my-2 " >
                    <span className="input-group-text" id="addon-wrapping">{value}</span>
                    {value === 'Suit' || value === 'Sadri' || value === 'Coat' || value === 'Pajama' ? (
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
                            ) : value === 'Pajama' ? (
                                <>
                                    <option>Shalwar</option>
                                    <option>Chudidar</option>
                                    <option>Aligarh</option>
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
                        <select
                            value={inputValue}
                            onChange={changeValue}
                            className="suit-selected form-select"
                            name="qntt"
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
                            value={mila} onChange={changeAmount}
                            type="text"
                            className="form-control"
                            placeholder="Enter Mila Amount"
                            aria-label="Last Name"
                            aria-describedby="addon-wrapping"
                        />
                    }
                    {value !== 'milaAmount' ? (
                        <input style={{ width: "100px" }}
                            value={orderValue}
                            onChange={changeOrderValue}
                            // onChange={changeValue}
                            type="text"
                            name="order"
                            className="form-control"
                            placeholder="Order no. shirts"
                            aria-label="Last Name"
                            aria-describedby="addon-wrapping"
                        />
                    ) : null
                    }
                </div>
            ) : null}
        </>
    )
}
export default InputComponent2;