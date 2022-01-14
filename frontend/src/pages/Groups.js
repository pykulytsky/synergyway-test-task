import { React, useState, useEffect } from 'react'
import { Navbar } from '../components/core/Navbar'
import {
    Table,
    IconButton,
    TrashIcon,
    EditIcon,
    Pane,
    Dialog,
    TextInput,
} from 'evergreen-ui'
import axios from 'axios'
import { store } from 'react-notifications-component';

export const Groups = () => {
    const BASE_ENDPOINT = 'http://localhost:8000/groups/'

    let [editIsShown, setEditIsShown] = useState(false)
    let [newIsShown, setNewIsShown] = useState(false)
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [groups, setGroups] = useState([])
    let [currentGroup, setCurrentGroup] = useState(groups)
    let [newGroup, setNewGroup] = useState({name: '', description: ''})

    useEffect(() => {
        fetchGroups()
        setName(currentGroup.name)
        setDescription(currentGroup.description)
    }, [currentGroup])

    async function fetchGroups() {
        const response = await axios.get(BASE_ENDPOINT)
        setGroups(response.data)
    }

    function notify(message="Name or description is invalid") {
        store.addNotification({
            title: "Error",
            message,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }

    async function deleteGroup(e, groupId) {
        try {
            const res = await axios.delete(BASE_ENDPOINT + groupId + '/')
        await fetchGroups()
        }
        catch {
            notify("Group deletion is impossible because at least one user is assigned to this group.")
        }
    }

    async function patchGroup() {
        if (name.match(/^[a-zA-Z0-9]+$/) && description.length > 1) {
            await axios.patch(
                BASE_ENDPOINT + currentGroup.id + '/',
                {
                    name,
                    description
                }
            )
            await fetchGroups()
            setEditIsShown(false)
        }
        else {
            notify()
        }
    }

    async function addNewGroup() {
        if (newGroup.name.match(/^[a-zA-Z0-9]+$/) && newGroup.description.length > 1) {
            await axios.post(
                BASE_ENDPOINT,
                {...newGroup}
            )
            await fetchGroups()
            setNewIsShown(false)
            setNewGroup({name: '', description: ''})
        }
        else {
            notify()
        }
    }

    return (
        <div>
            <Navbar currentPage={'groups'} newIsShown={newIsShown} setNewIsShown={setNewIsShown} />

            <div className="content-table">
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>ID</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Desctiption</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {groups.map((group) => (
                            <Table.Row key={group.id}>
                                <Table.TextCell>{group.id}</Table.TextCell>
                                <Table.TextCell>{group.name}</Table.TextCell>
                                <Table.TextCell>{group.description}</Table.TextCell>
                                <Table.TextCell display="flex" alignItems="center">
                                    <IconButton
                                        icon={TrashIcon}
                                        intent="danger"
                                        onClick={(e) => deleteGroup(e, group.id)}
                                    />
                                    <IconButton
                                        icon={EditIcon}
                                        marginLeft="7px"
                                        onClick={() => {
                                            setEditIsShown(!editIsShown)
                                            setCurrentGroup(group)
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
                    title="Edit the group"
                    shouldCloseOnOverlayClick={false}
                    confirmLabel="Save"
                    onConfirm={patchGroup}
                    onCancel={(e) => {
                        setEditIsShown(false)
                        setCurrentGroup(groups[0])
                    }}
                >
                    <p>Name: </p>
                    <TextInput value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} name="name-input" placeholder="Name..." />
                    <p>Description: </p>
                    <TextInput value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} name="description-input" placeholder="Description..." />

                </Dialog>
            </Pane>
            <Pane>
                <Dialog
                    isShown={newIsShown}
                    title="Add new group"
                    shouldCloseOnOverlayClick={false}
                    confirmLabel="Save"
                    onConfirm={addNewGroup}
                    onCancel={(e) => {
                        setNewIsShown(false)
                        setNewGroup({name: '', description: ''})
                    }}
                >
                    <p>Name: </p>
                    <TextInput value={newGroup.name} onChange={(e) => {
                        setNewGroup({name: e.target.value, description: newGroup.description})
                    }} name="name-input" placeholder="Name..." />
                    <p>Description: </p>
                    <TextInput value={newGroup.description} onChange={(e) => {
                        setNewGroup({name: newGroup.name, description: e.target.value})
                    }} name="description-input" placeholder="Description..." />

                </Dialog>
            </Pane>
        </div>
    )
}
