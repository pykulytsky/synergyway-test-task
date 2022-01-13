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

export const Groups = () => {
    let [editIsShown, setEditIsShown] = useState(false)
    let [newIsShown, setNewIsShown] = useState(false)
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [groups, setGroups] = useState([])
    let [currentGroup, setCurrentGroup] = useState(groups)
    let [newGroup, setNewGroup] = useState({name: '', description: ''})
    let [isEditValid, setIsEditValid] = useState(false)
    let [isNewValid, setIsNewValid] = useState(false)

    useEffect(() => {
        fetchGroups()
        setName(currentGroup.name)
        setDescription(currentGroup.description)
    }, [currentGroup])

    async function fetchGroups() {
        const response = await axios.get('http://localhost:8000/groups/')
        setGroups(response.data)
    }

    async function deleteGroup(e, groupId) {
        try {
            const res = await axios.delete('http://localhost:8000/groups/' + groupId + '/')
        console.log(res.data)
        await fetchGroups()
        }
        catch {
            alert("Group deletion is impossible because at least one user is assigned to this group.")
        }
    }

    async function patchGroup() {
        if (name.match(/^[a-zA-Z\-]+$/) && description.match(/^[a-zA-Z\-]+$/)) {
            const response = await axios.patch(
                'http://localhost:8000/groups/' + currentGroup.id + '/',
                {
                    name,
                    description
                }
            )
            console.log(response.data)
            await fetchGroups()
            setEditIsShown(false)
        }
        else {
            alert("Inputs must be valid")
        }
    }

    async function addNewGroup() {
        if (newGroup.name.match(/^[a-zA-Z\-]+$/) && newGroup.descriptio.match(/^[a-zA-Z\-]+$/)) {
            console.log(newGroup)
            const response = await axios.post(
                'http://localhost:8000/groups/',
                {...newGroup}
            )
            console.log(response.data)
            await fetchGroups()
            setNewIsShown(false)
        }
        else {
            alert("Inputs must be valid")
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
                    onCloseComplete={patchGroup}
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
                    onCloseComplete={addNewGroup}
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
