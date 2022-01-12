import {React, useState, useEffect} from 'react'
import { Table, IconButton, TrashIcon, EditIcon } from 'evergreen-ui'
import axios from 'axios'

export const Users = () => {
    let [profiles, setProfiles] = useState([])

    useEffect(() => {
        getUsers()
        console.log(profiles)
    }, [])

    async function getUsers() {
        const res = await axios.get('http://localhost:8000/users/')
        setProfiles(res.data)
    }

    return (
        <div>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Username</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Created</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Group</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={240}>
                    {profiles.map((profile) => (
                        <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
                            <Table.TextCell>{profile.username}</Table.TextCell>
                            <Table.TextCell>{profile.created}</Table.TextCell>
                            <Table.TextCell>{profile.group }</Table.TextCell>
                            <Table.TextCell display="flex" alignItems="center">
                                <IconButton icon={TrashIcon} intent="danger" />
                                <IconButton icon={EditIcon} marginLeft="7px" />
                            </Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </div>
    )
}
