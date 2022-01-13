import React, { useEffect, useState } from 'react'
import { Pane, Dialog, TextInput, Select } from 'evergreen-ui'
import axios from 'axios'
export const EditDialog = ({ isShown, setIsShown, user, setUser }) => {

    let [username, setUsername] = useState('')
    let [groups, setGroups] = useState([])
    let [group, setGroup] = useState(user.group)

    useEffect(() => {
        setUsername(user.username)
        fetchGroups()
    }, [])

    async function fetchGroups() {
        const response = await axios.get('http://localhost:8000/groups/')
        setGroups(response.data)
    }

    function patchUser() {
        const response = axios.patch(
            'http://localhost:8000/users/' + user.id + '/',
            {
                username,
                group
            }
        )
        console.log(response.data)
        setIsShown(false)
    }

    return (
        <Pane>
            <Dialog
                isShown={isShown}
                title="Edit the user"
                shouldCloseOnOverlayClick={false}
                confirmLabel="Save"
                onCloseComplete={patchUser}
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
    )
}
