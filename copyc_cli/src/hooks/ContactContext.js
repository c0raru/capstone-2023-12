import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext([])

export function ContactProvider({children}) {

    useEffect(() => {
    }, [])

    function get_category() {
        return axios.get("/contact/category/types")
    }

    function list() {
        return axios.get("/contact/")
    }

    function detail(id) {
        return axios.get("/contact/" + id + "/")
    }

    function write(category, title) {
        return axios.post("/contact/", {category, title})
    }

    const context = {
        get_category,
        list,
        detail,
        write
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export function useContact() {
    return useContext(Context);
}

export default {
    ContactProvider, useContact
}
