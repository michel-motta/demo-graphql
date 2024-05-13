import { gql, useMutation } from '@apollo/client'
import React, { FormEvent, useState } from 'react';
import { GET_USER } from '../App';


const CREATE_USER = gql`
    mutation ($name: String!){
        createUser(name: $name) {
            id
            name
        }
    }
`;
"use client"

export default function NewUserForm() {
    const [name, setName] = useState('')
    const [createUser, { data }] = useMutation(CREATE_USER)

    function handleCreateUser(event: FormEvent) {
        event.preventDefault();

        if(!name) {
            return;
        }

        createUser({
            variables: {
                name
            },
            refetchQueries: [GET_USER]
        })
    }

    return (
        <form onSubmit={handleCreateUser}>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <button type="submit">Enviar</button>
        </form>
    )
}