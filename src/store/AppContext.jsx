import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

	const [users, setUsers] = useState(() => {
		const storedUsers = localStorage.getItem('users');
		try {
			return storedUsers ? JSON.parse(storedUsers) : [];
		} catch (error) {
			console.error("Error parsing users from localStorage:", error);
			return [];
		}
	});
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
	const [teacherName, setTeacherName] = useState(localStorage.getItem('teacherName') || '')
	const [teacherLastname, setTeacherLastname] = useState(localStorage.getItem('teacherLastname') || '')
	const [teacherImage, setTeacherImage] = useState(localStorage.getItem('teacherImage') || '')
	const [teacherJob, setTeacherJob] = useState(localStorage.getItem('teacherJob') || '')
	const [roomName, setRoomName] = useState(localStorage.getItem('roomName') || '')
	const [roomCapacity, setRoomCapacity] = useState(localStorage.getItem('roomCapacity') || '')
	const [gymName, setGymName] = useState(localStorage.getItem('gymName') || '')
	const [gymDescription, setGymDescription] = useState(localStorage.getItem('gymDescription') || '')
	const [gymImage, setGymImage] = useState(localStorage.getItem('gymImage') || '')
	const [gymPhone, setGymPhone] = useState(localStorage.getItem('gymPhone') || '')
	const [gymStreet, setGymStreet] = useState(localStorage.getItem('gymStreet') || '')
	const [gymLocation, setGymLocation] = useState(localStorage.getItem('gymLocation') || '')
	const [classStartTime, setClassStartTime] = useState(localStorage.getItem('classStartTime') || '')
	const [classEndTime, setClassEndTime] = useState(localStorage.getItem('classEndTime') || '')
	const [classDiscipline, setClassDiscipline] = useState(localStorage.getItem('classDiscipline') || '')
	const [classRoom, setClassRoom] = useState(localStorage.getItem('classRoom') || '')
	const [classTeacher, setClassTeacher] = useState(localStorage.getItem('classTeacher') || '')
	const [classKal, setClassKal] = useState(localStorage.getItem('classKal') || '')
	const [classDate, setClassDate] = useState(localStorage.getItem('classDate') || '')
	const [classType, setClassType] = useState(localStorage.getItem('classType') || '')
	const [inscriptionClass, setInscriptionClass] = useState(localStorage.getItem('inscriptionClass') || '')
	const [inscriptionUser, setInscriptionUser] = useState(localStorage.getItem('inscriptionUser') || '')


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

				const updatedUsers = [...users, data];
				setUsers(updatedUsers);
	
				// Guardar el nuevo valor en localStorage
				localStorage.setItem('users', JSON.stringify(updatedUsers));
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


				localStorage.setItem('token', data.token);
				localStorage.setItem('name', data.name);
				localStorage.setItem('lastname', data.lastname);
				localStorage.setItem('username', data.username);
				localStorage.setItem('email', data.email);
				localStorage.setItem('userId', data.userId);
				localStorage.setItem('role', data.role);
				setToken(data.token);
				setName(data.name);
				setLastname(data.lastname);
				setUsername(data.username);
				setEmail(data.email);
				setUserId(data.userId);
				setRole(data.role);
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
	};

	const addDisciplines = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/discipline', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: disciplineName,
					description: disciplineDescription,
					effort: disciplineEffort,
					image: disciplineImage
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
				setDisciplineEffort(data.effort);
				setDisciplineImage(data.image);
			} else {
				console.error("Token no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const getDisciplines = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/disciplines');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setDisciplines([...data]);
		} catch (error) {
			console.error('There was an error fetching the disciplines!', error);
		}
	};

	const deleteDiscipline = async (id) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/discipline/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setDisciplines(disciplines.filter(discipline => discipline.id !== id));

			console.log('Disciplines deleted successfully');
		} catch (error) {
			console.error('There was an error deleting discipline:', error);
		}
	};

	const addTeacher = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/teacher', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: teacherName,
					lastname: teacherLastname,
					job: teacherJob,
					image: teacherImage
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setTeachers([...teachers, data]);
				setTeacherName(data.name);
				setTeacherLastname(data.lastname);
				setTeacherJob(data.job);
				setTeacherImage(data.image);
			} else {
				console.error("Token no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const getTeachers = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/teachers');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setTeachers([...data]);
		} catch (error) {
			console.error('There was an error fetching the teachers!', error);
		}
	};

	const deleteTeacher = async (id) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/teacher/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setTeachers(teachers.filter(teacher => teacher.id !== id));

			console.log('Teacher deleted successfully');
		} catch (error) {
			console.error('There was an error deleting teacher:', error);
		}
	};

	const addRoom = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/room', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: roomName,
					capacity: roomCapacity
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setRooms([...rooms, data]);
				setRoomName(data.name);
				setRoomCapacity(data.capacity);
			} else {
				console.error("Room no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const getRooms = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/rooms');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setRooms([...data]);
		} catch (error) {
			console.error('There was an error fetching the rooms!', error);
		}
	};

	const deleteRoom = async (id) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/room/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setRooms(rooms.filter(room => room.id !== id));

			console.log('Room deleted successfully');
		} catch (error) {
			console.error('There was an error deleting room:', error);
		}
	};

	const addGym = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/gym', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: gymName,
					description: gymDescription,
					location: gymLocation,
					phone: gymPhone,
					street: gymStreet,
					logo: gymImage
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setGyms([...gyms, data]);
				setGymName(data.name);
				setGymDescription(data.description);
				setGymImage(data.logo);
				setGymLocation(data.location);
				setGymStreet(data.street);
				setGymPhone(data.phone);
			} else {
				console.error("Gym no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const deleteGym = async (id) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/gym/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setGyms(gyms.filter(gym => gym.id !== id));

			console.log('Gym deleted successfully');
		} catch (error) {
			console.error('There was an error deleting gym:', error);
		}
	};

	const getGyms = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/gyms');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setGyms([...data]);
		} catch (error) {
			console.error('There was an error fetching the gyms!', error);
		}
	};

	const getClasses = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/classes');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setClasses([...data]);
		} catch (error) {
			console.error('There was an error fetching the gyms!', error);
		}
	};

	const addClass = async () => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch('http://127.0.0.1:5000/add/class', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					discipline_id: classDiscipline,
					start_time: classStartTime,
					end_time: classEndTime,
					room_id: classRoom,
					teacher_id: classTeacher,
					date: classDate,
					type: classType
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setClasses([...classes, data]);
				setClassDiscipline(data.discipline_id || '');
				setClassStartTime(data.start_time || '');
				setClassEndTime(data.end_time || '');
				setClassRoom(data.room_id || '');
				setClassTeacher(data.teacher_id || '');
				setClassDate(data.date || '');
				setClassType(data.type || '');
			} else {
				console.error("Class no recibido:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const deleteClass = async (id) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/class/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setClasses(classes.filter(class_ => class_.id !== id));

			console.log('Class deleted successfully');
		} catch (error) {
			console.error('There was an error deleting the class:', error);
		}
	};


	const addImages = async (formData) => {
		try {

			const response = await fetch(`http://127.0.0.1:5000/upload/image`, {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Cuando obtiene la respuesta el response se pasa a formato json y lo guarda en fotosubida
			// Se hace el return de fotosubida
			const fotosubida = await response.json();
			return fotosubida; //
		}
		catch (error) {
			console.error("Network error:", error);
			return null;
		}
	};

	const addInscription = async (class_id, user_id) => {
		try {
			// Enviar la solicitud POST usando fetch
			const response = await fetch(`http://127.0.0.1:5000/add/inscription/${class_id}/${user_id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					class_id: class_id,
					user_id: user_id
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data) {
				setInscriptions([...inscriptions, data]);
				setInscriptionClass(data.class_id);
				setInscriptionUser(data.user_id);
			} else {
				console.error("Inscripciñón no recibida:", data);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	const getInscriptions = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/inscriptions');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log('Inscriptions fetched:', data); 
			setInscriptions([...data]);
		} catch (error) {
			console.error('There was an error fetching the inscriptions!', error);
		}
	};

	const deleteInscription = async (id) => {
		try {
			const response = await fetch(`http://127.0.0.1:5000/delete/inscription/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			setInscriptions(inscriptions.filter(inscription => inscription.id !== id));

			console.log('Inscription deleted successfully');
		} catch (error) {
			console.error('There was an error deleting the inscription:', error);
		}
	};


	const store = { users, name, email, password, username, lastname, role, token, userId, disciplines, disciplineName, disciplineDescription, disciplineEffort, disciplineImage, classes, teachers, rooms, inscriptions, favorites, gyms, teacherImage, teacherJob, teacherName, teacherLastname, roomName, roomCapacity, gymDescription, gymImage, gymLocation, gymName, gymPhone, gymStreet, classDiscipline, classEndTime, classStartTime, classTeacher, classRoom, classKal, classDate, classType, inscriptionClass, inscriptionUser }
	
	const actions = { signUp, logIn, logOut, setName, setUsername, setLastname, setRole, setEmail, setPassword, setToken, setUserId, setUsers, setClasses, setTeachers, setRooms, setInscriptions, setFavorites, setGyms, addDisciplines, setDisciplines, setDisciplineName, setDisciplineDescription, setDisciplineImage, setDisciplineEffort, addImages, getDisciplines, deleteDiscipline, setTeacherImage, setTeacherJob, setTeacherName, setTeacherLastname, addTeacher, getTeachers, deleteTeacher, setRoomName, setRoomCapacity, deleteRoom, getRooms, addRoom, addGym, setGymDescription, setGymImage, setGymLocation, setGymName, setGymPhone, setGymStreet, deleteGym, getGyms, getClasses, addClass, setClassDiscipline, setClassEndTime, setClassRoom, setClassStartTime, setClassTeacher, setClassKal, setClassDate, setClassType, deleteClass, addInscription, setInscriptionClass, setInscriptionUser, getInscriptions, deleteInscription}

	return (
		<AppContext.Provider value={{ store, actions }}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
