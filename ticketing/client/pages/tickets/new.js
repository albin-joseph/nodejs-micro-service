import { useState } from "react";

const NewTicket = () => {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    const onBlur = () => {
        const value = parseFloat(price);
        if(isNaN(value)) {
           return; 
        }
        setPrice(value.toFixed(2));
    };

    return (
        <div>
            <h1>Create a Ticket</h1>
            <form>
                <div className="form-group row mb-2">
                    <label>Title</label>
                    <input 
                        className="form-control" 
                        value={title} 
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group  row mb-2">
                    <label>Price</label>
                    <input 
                        className="form-control" 
                        onBlur={onBlur}
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default NewTicket;