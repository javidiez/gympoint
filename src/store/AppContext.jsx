import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [users, setUsers] = useState(localStorage.getItem('users') || []);
    const [disciplines, setDisciplines] = useState(localStorage.getItem('disciplines') || []);
    const [classes, setClasses] = useState(localStorage.getItem('classes') || []);
    const [favorites, setFavorites] = useState(localStorage.getItem('favorites') || []);
    const [teachers, setTeachers] = useState(localStorage.getItem('teachers') || []);
    const [inscriptions, setInscriptions] = useState(localStorage.getItem('inscriptions') || []);
    const [rooms, setRooms] = useState(localStorage.getItem('rooms') || []);
    const [gyms, setGyms] = useState(localStorage.getItem('gyms') || []);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || ''); 
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [lastname, setLastname] = useState(localStorage.getItem('lastname') || '');
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState(localStorage.getItem('token') || '')
	const [role, setRole] = useState(localStorage.getItem('role') || '')
	const [disciplineName, setDisciplineName] = useState(localStorage.getItem('disciplineName') || '')
	const [disciplineDescription, setDisciplineDescription] = useState(localStorage.getItem('disciplineDescription') || '')
	const [disciplineEffort, setDisciplineEffort] = useState(localStorage.getItem('disciplineEffort') || '')
	const [disciplineImage, setDisciplineImage] = useState(localStorage.getItem('disciplineImage') || '')



    

    const signUp = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/users/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					email,
					password,
                    role
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data.access_token) {
				// Guardar el token en el estado

				setUsers([...users, data]);
				// Guardar el token en sessionStorage
				localStorage.setItem('token', data.access_token);
				setToken(data.access_token);
				setUsername(data.username);
				setEmail(data.email);
                setRole(data.role);
				await logIn(email, password);
			} else {
				console.error("Token no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

    const logIn = async (email, password) => {
		try {
			const resp = await fetch(`http://127.0.0.1:5000/login`, {
				method: "POST",
				body: JSON.stringify({ username, email, password }),
				headers: { "Content-Type": "application/json" }
			});
			const data = await resp.json();

			if (data.token) {

				// Guardar el token en sessionStorage
				localStorage.setItem('token', data.token);
				localStorage.setItem('name', data.name);
				localStorage.setItem('lastname', data.lastname);
				localStorage.setItem('username', data.username);
				localStorage.setItem('email', data.email);
				localStorage.setItem('userId', data.userId);  // Guardar userId
				localStorage.setItem('role', data.role); // Guardar is_admin como string 'true' o 'false'
				setToken(data.token);
				setName(data.name);
				setLastname(data.lastname);
				setUsername(data.username);
				setEmail(data.email);
				setUserId(data.userId);
				setRole(data.role); // Asegúrate de que sea booleano
				console.log("Success:", data);
			} else {
				console.error("Token no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

    const logOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('password');
		localStorage.removeItem('email');
		localStorage.removeItem('userId');
		setToken('');
		setUsername('');
		setEmail('');
		setPassword('');
		setUserId('');
	}

	const addDisciplines = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/disciplines', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					description,
					image,
                    effort
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setDisciplines([...disciplines, data]);
				setDisciplineName(data.name);
				setDisciplineDescription(data.description);
                setDisciplineImage(data.image);
                setDisciplineEffort(data.effort);
			} else {
				console.error("Token no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

    const store = {users, name, email, password, username, lastname, role, token, userId, disciplines, disciplineName, disciplineDescription, disciplineEffort, disciplineImage, classes, teachers, rooms, inscriptions, favorites, gyms}
    const actions = {signUp, logIn, logOut, setName, setUsername, setLastname, setRole, setEmail, setPassword, setToken, setUserId, setUsers, setClasses, setTeachers, setRooms, setInscriptions, setFavorites, setGyms, addDisciplines, setDisciplines, setDisciplineName, setDisciplineDescription, setDisciplineImage, setDisciplineEffort}

    return (
        <AppContext.Provider value={{ store, actions }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
