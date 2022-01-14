import { React, useState, useEffect } from 'react'
import { Navbar } from '../components/core/Navbar'
import {
    Table,
    IconButton,
    TrashIcon,
    EditIcon,
    Pane,
    Dialog,
    Select,
    TextInput,
} from 'evergreen-ui'
import axios from 'axios'
import { store } from 'react-notifications-component';


export const Users = () => {
    const BASE_ENDPOINT = 'http://localhost:8000/users/'

    let [users, setUsers] = useState([])
    let [editIsShown, setEditIsShown] = useState(false)
    let [newIsShown, setNewIsShown] = useState(false)
    let [currentUser, setCurrentUser] = useState(users)
    let [username, setUsername] = useState('')
    let [groups, setGroups] = useState([])
    let [group, setGroup] = useState(0)

    let [newUser, setNewUser] = useState({ username: '', group: 1 })

    useEffect(() => {
        fetchGroups()
        getUsers()
        setUsername(currentUser.username)
        setGroup(currentUser.group)
    }, [currentUser])

    async function getUsers() {
        const res = await axios.get(BASE_ENDPOINT)
        setUsers(res.data)
    }

    async function fetchGroups() {
        const response = await axios.get('http://localhost:8000/groups/')
        setGroups(response.data)
    }

    async function deleteUser(e, userId) {
        await axios.delete(BASE_ENDPOINT + userId + '/')
        await getUsers()
    }

    function getGroupName(user) {
        try {
            const groupName = groups.filter(group => group.id === user.group)[0].name
            return groupName
        }
        catch {
            return ''
        }
    }

    function notify() {
        store.addNotification({
            title: "Error",
            message: "Username must contain at least 6 characters",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
    }

    async function patchUser() {
        if (username.match(/^[a-zA-Z0-9]{6,16}$/)) {
            await axios.patch(
                BASE_ENDPOINT + currentUser.id + '/',
                {
                    username,
                    group
                }
            )
            await getUsers()
            setEditIsShown(false)
        }
        else {
            notify()
        }
    }

    async function addNewUser() {
        if (newUser.username.match(/^[a-zA-Z0-9]{6,16}$/)) {
            await axios.post(
                BASE_ENDPOINT,
                { ...newUser }
            )
            await getUsers()
            setNewIsShown(false)
            setNewUser({ username: '', group: 0 })
        }
        else {
            notify()
        }
    }

    return (
        <div>

            <Navbar currentPage={'users'} newIsShown={newIsShown} setNewIsShown={setNewIsShown} isGroupExists={groups.length > 0} />
            <div className="content-table">
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>Username</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Created</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Group</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {users.map((user) => (
                            <Table.Row key={user.id}>
                                <Table.TextCell>{user.username}</Table.TextCell>
                                <Table.TextCell>{user.created}</Table.TextCell>
                                <Table.TextCell display="flex">{getGroupName(user)}</Table.TextCell>
                                <Table.TextCell display="flex" alignItems="center" justifyContent="center">
                                    <IconButton
                                        icon={TrashIcon}
                                        intent="danger"
                                        onClick={(e) => deleteUser(e, user.id)}
                                    />
                                    <IconButton
                                        icon={EditIcon}
                                        marginLeft="7px"
                                        onClick={() => {
                                            setEditIsShown(!editIsShown)
                                            setCurrentUser(user)
                                        }}
                                    />
                                </Table.TextCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <Pane>
                <Dialog
                    isShown={editIsShown}
                    title="Edit the user"
                    shouldCloseOnOverlayClick={false}
                    confirmLabel="Save"
                    onConfirm={patchUser}
                    onCancel={(e) => {
                        setEditIsShown(false)
                        setCurrentUser(users[0])
                    }}
                >
                    <p>Username: </p>
                    <TextInput value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} name="username-input" placeholder="Username..." />
                    <p>Group: </p>
                    <Select
                        width={280}
                        value={group}
                        onChange={event => setGroup(event.target.value)}
                    >
                        {groups.map((gr) => (
                            <option key={gr.id} value={gr.id}>
                                {gr.name}
                            </option>
                        ))}

                    </Select>
                </Dialog>
            </Pane>
            <Pane>
                <Dialog
                    isShown={newIsShown}
                    title="Add new user"
                    shouldCloseOnOverlayClick={false}
                    confirmLabel="Save"
                    onConfirm={addNewUser}
                    onCancel={(e) => {
                        setNewIsShown(false)
                        setNewUser({ username: '', group: 0 })
                    }}
                >
                    <p>Username: </p>
                    <TextInput value={newUser.username} onChange={(e) => {
                        setNewUser({ username: e.target.value, group: newUser.group })
                    }} name="username-input" placeholder="Username..." />
                    <p>Group: </p>
                    <Select
                        width={280}
                        value={newUser.group}
                        onChange={event => setNewUser({ username: newUser.username, group: event.target.value })}
                    >
                        {groups.map((gr) => (
                            <option key={gr.id} value={gr.id}>
                                {gr.name}
                            </option>
                        ))}

                    </Select>
                </Dialog>
            </Pane>
        </div>
    )
}
