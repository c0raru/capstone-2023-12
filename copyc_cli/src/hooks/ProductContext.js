import axios from 'axios';

import { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext([])

export function ProductProvider({children}) {

    useEffect(() => {
    }, [])

    function search(page, query="", best=false, limit=99999) {
        return axios.get("/product/product/?page=" + page + "&query=" + encodeURIComponent(query) + "&best=" + best + "&limit=" + limit)
    }

    function detail(id) {
        return axios.get("/product/product/" + id + "/")
    }

    function like(id) {
        return axios.post("/product/like/", {"product": id})
    }

    function is_like(id) {
        return axios.get("/product/like/" + id + "/")
    }

    function dislike(id) {
        return axios.delete("/product/like/" + id + "/")
    }

    const context = {
        search,
        detail,
        like,
        is_like,
        dislike
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export function useProduct() {
    return useContext(Context);
}

export default {
    ProductProvider, useProduct
}
