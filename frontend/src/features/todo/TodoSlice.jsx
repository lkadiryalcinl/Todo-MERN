import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getalltodos, gettodobyid, createtodo, updatetodo, deletetodo,deletealltodos } from './TodoApi';

// Initial State
const initialState = {
    todos: [],
    selectedTodo: null,
    status: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: null,
};

// Async Thunks
export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    const response = await getalltodos();
    return response;
});

export const fetchTodoById = createAsyncThunk('todo/fetchTodoById', async (id) => {
    const response = await gettodobyid(id);
    return response;
});

export const createTodo = createAsyncThunk('todo/createTodo', async (content) => {
    const response = await createtodo(content);
    return response;
});

export const updateTodo = createAsyncThunk('todo/updateTodo', async ({ id, content }) => {
    const response = await updatetodo(id, content);
    return response;
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
    const response = await deletetodo(id);
    return response;
});

export const deleteAllTodos = createAsyncThunk('todo/deleteAllTodos', async () => {
    const response = await deletealltodos();
    return response;
});

// Slice
const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetStatus: (state) => {
            state.status = 'idle';
        },
        setSelectedTodo: (state, action) => {
            state.selectedTodo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            
            // Fetch Todo by ID
            .addCase(fetchTodoById.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchTodoById.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.selectedTodo = action.payload;
            })
            .addCase(fetchTodoById.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

            // Create Todo
            .addCase(createTodo.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.todos = [...state.todos, action.payload.todo]
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

            // Update Todo
            .addCase(updateTodo.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const updatedId = action.meta.arg.id;
                const index = state.todos.findIndex((todo) => todo._id === updatedId);
                if (index !== -1) {
                    state.todos[index] = action.payload.todo; 
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

            // Delete Todo
            .addCase(deleteTodo.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.todos = state.todos.filter((todo) => todo._id !== action.meta.arg);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

            // Delete Todo
            .addCase(deleteAllTodos.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteAllTodos.fulfilled, (state,action) => {
                state.status = 'fulfilled'
                state.todos = []
            })
            .addCase(deleteAllTodos.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message;
            })
    },
});

export const selectTodos = (state) => state.TodoSlice.todos;
export const selectSelectedTodo = (state) => state.TodoSlice.selectedTodo;
export const selectTodoStatus = (state) => state.TodoSlice.status;
export const selectTodoError = (state) => state.TodoSlice.error;

export const { clearError, resetStatus, setSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;
