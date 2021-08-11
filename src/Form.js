import React,{useState} from 'react'
import "./scss/form.scss"
import { useHistory } from 'react-router-dom';



function Form(props) {
    const History = useHistory();
    const [name, setName] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        const Creds = {
            name: e.target.name.value,
            room: e.target.room.value
        }

        props.setRoom(Creds.room);
        props.setName(Creds.name);
        console.log(Creds);

        props.socket.emit("join-room",Creds);

        History.push("/chat");
    };

    return (
        <div className="form">
        <form onSubmit={onSubmit}>
              <h1>Chat App</h1>
              <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required={true}/>
              <div className="form-select">
                  <span>Room</span>
              <select name="room" >
                  <option className="option" value="java">Java</option>
                  <option className="option" value="c++">C++</option>
                  <option className="option" value="Pyton">Python</option>
              </select>
              </div>
              <div>
              <button type="submit" disabled={name===''?true:false}>Submit</button>
              </div>
        </form>
    </div>

    )
}

export default Form
