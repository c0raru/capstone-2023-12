import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext([])

export function NoticeProvider({children}) {

    useEffect(() => {
    }, [])

    function list(fixed=false) {
        return axios.get("/notice/?" + (fixed ? "fixed=true" : ""))
    }

    function detail(id) {
        return axios.get("/notice/" + id + "/")
    }

    const context = {
        list,
        detail
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export function useNotice() {
    return useContext(Context);
}

export default {
    NoticeProvider, useNotice
}
