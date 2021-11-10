import React, { useState } from 'react'
import axios from "axios";

function Main() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('c');
    const [output, setOutput] = useState('');
    const handleSubmit = async () => {
        const payload = {
            language,
            code 
        };
        try {
            const { data } = await axios.post("http://localhost:5000/run", payload);
            setOutput(data.output);
        } catch({response}) {
            if(response) {
                const errMessage = response.data.err.stderr;
                setOutput(errMessage);
            } else {
                setOutput("Error: Server Down. Recheck the Server and try again!")
            }
        }
    }
    return (
        <div className="main">
            <h1>Online Compiler</h1>
            <div>
                <select
                    value={language}
                    onChange={(e) => {
                        const shouldSwitch = window.confirm(
                          "Are you sure you want to change language? WARNING: Your current code will be lost."
                        );
                        if (shouldSwitch) {
                          setLanguage(e.target.value);
                        }
                      }}
                >
                    <option value="c">C</option>
                    <option value="py">Python</option>
                    <option value="cpp">C++</option>
                </select>
            </div>
            <textarea rows="20" cols="75" value={code} onChange={(e) => {setCode(e.target.value)}}></textarea>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <p>{output}</p>
        </div>
    )
}

export default Main
