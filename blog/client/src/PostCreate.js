import React, {useState} from "react";
import axios from 'axios';

export default () => {
    const [title, setTitle] = useState('')
    const onsubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        })
        setTitle('')
    }
    return <div>
        <form onSubmit={onsubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    className="form-control" 
                    style={{marginBottom: "20px"}}
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}