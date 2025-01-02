import {axiosi} from '../../config/axios'

export const getalltodos=async()=>{
    try {
        const res=await axiosi.get("/todo")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const gettodobyid=async(id)=>{
    try {
        const res=await axiosi.get(`/todo/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const createtodo=async(content)=>{
    try {
        const res=await axiosi.post("/todo",content)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updatetodo = async (id, content) => {
    try {
        const res = await axiosi.patch(`/todo/${id}`, content);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deletetodo=async(id)=>{
    try {
        const res=await axiosi.delete(`/todo/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const deletealltodos=async()=>{
    try {
        const res=await axiosi.delete(`/todo`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const toggleTodoCompleted = async (task) => {
    try {
        const res = await axiosi.patch(`/todo/${task._id}/complete`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const toggleTodoFavorited = async (task) => {
    try {
        const res = await axiosi.patch(`/todo/${task._id}/favorite`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};