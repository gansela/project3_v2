import React, { useState } from "react"

export default function useStateWithHandler(initialState : any) {

    const [data, setData] = useState(initialState)

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    }


    return [data, handleChange];

}