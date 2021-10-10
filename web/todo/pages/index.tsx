import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
    GetTodosDocument,
    GetTodosQuery,
    Todo,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
} from "../generated/graphql";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const data = useGetTodosQuery();

    const [deleteTodoMutation, res2] = useDeleteTodoMutation();

    const deleteTodo = (todo: Todo) => {
        deleteTodoMutation({
            variables: {
                id: todo.id,
            },
            update(cache, { data }) {
                cache.modify({
                    fields: {
                        todos: (oldTodo = [], { readField }) => {
                            console.log(oldTodo);
                            return oldTodo.filter((todoRef) => {
                                return readField("id", todoRef) !== todo.id;
                            });
                        },
                    },
                });
            },
        });
    };

    return (
        <div className={styles.container}>
            {data.loading ? (
                <div>Loading</div>
            ) : (
                <>
                    <InputTodo />
                    {data.data?.todos.map((todo) => {
                        return (
                            <div key={"todo" + todo.id}>
                                <div>{todo.text}</div>
                                <div>{todo.title}</div>
                                <button onClick={() => deleteTodo(todo)}>
                                    delete
                                </button>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

function InputTodo() {
    const [createTodoMutation, result] = useCreateTodoMutation();
    const saveTodo = () => {
        const title = document.getElementById("title").value;
        const text = document.getElementById("text").value;
        console.log(title);
        console.log(text);
        createTodoMutation({
            variables: { title, text },
            //1) refetchQueries: [{ query: GetTodosDocument }],
            //2) update(store, { data }) {
            //     const oldData = store.readQuery<GetTodosQuery>({
            //         query: GetTodosDocument,
            //     });

            //     store.writeQuery<GetTodosQuery>({
            //         query: GetTodosDocument,
            //         data: {
            //             todos: [
            //                 ...oldData?.todos,
            //                 {
            //                     id: 123123,
            //                     text: data?.createTodo.text,
            //                     title: data?.createTodo.title,
            //                 },
            //             ],
            //         },
            //     });
            // },
            update(cache, { data }) {
                const id = cache.identify(data?.createTodo);
                cache.modify({
                    fields: {
                        todos: (oldTodo, { toReference }) => {
                            console.log(oldTodo);
                            return [...oldTodo, toReference(id)];
                        },
                    },
                });
            },
        });
    };
    return (
        <>
            <input id="text" type="text" />
            <input id="title" type="text" />
            <button onClick={saveTodo}>save todo</button>
        </>
    );
}

export default Home;
