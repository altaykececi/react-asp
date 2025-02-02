import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userNewId, setUserNewId] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [userUpEmail, setUserUpEmail] = useState("");
    const [userUpName, setUserUpName] = useState("");
    const [userUpId, setUserUpId] = useState("");


    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7270/Users/getusers");
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const postUser = async () => {
        try {
            await axios.post("https://localhost:7270/Users/adduser", {
                id: userNewId,
                name: userName,
                email: userEmail,
            });
            const getUser = await axios.get("https://localhost:7270/Users/getusers");
            setUsers(getUser.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteFun = async (id) => {
        try {
            await axios.delete(`https://localhost:7270/Users/deleteuser/${id}`);
            const getUser = await axios.get("https://localhost:7270/Users/getusers");
            setUsers(getUser.data);
        } catch (err) {
            console.error(err);
        }
    }

    const updateUser = async () => {
        try {
            await axios.put(`https://localhost:7270/Users/updateuser/${userUpId}`, {
                name: userUpName,
                email: userUpEmail
            });
            const updatedUsers = await axios.get("https://localhost:7270/Users/getusers");
            setUsers(updatedUsers.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name ? user.name : "Name not available"}
                        <button onClick={() => deleteFun(user.id)}>X</button>
                    </li>
                ))}
            </ul>

            <div>
                <p>Get user info: {userInfo ? userInfo.name : "No user selected"}</p>
                <input
                    type="text"
                    placeholder="User ID"
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button
                    onClick={async () => {
                        try {
                            const response = await axios.get(`https://localhost:7270/Users/${userId}`);
                            setUserInfo(response.data);
                        } catch (err) {
                            console.error(err);
                        }
                    }}
                >
                    Get User
                </button>
            </div>

            <div>
                <input type="text" placeholder="ID" onChange={(e) => setUserNewId(e.target.value)} />
                <input type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} />
                <input type="text" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} />
                <button onClick={postUser}>Gönder</button>
            </div>



            <h2>Güncelleme</h2>
            <input type="text" placeholder="ID" onChange={(e) => setUserUpId(e.target.value)} />
            <input type="text" placeholder="Name" onChange={(e) => setUserUpName(e.target.value)} />
            <input type="text" placeholder="Email" onChange={(e) => setUserUpEmail(e.target.value)} />

            <button onClick={()=>updateUser()}>Güncelle</button>


        </div>
    );
}

export default App;