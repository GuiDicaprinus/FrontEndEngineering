import { NextPage } from "next";
import {Task} from "../types/Task";


type ListProps = {
    tasks : Task[]
}

export const List : NextPage<ListProps> = ({ tasks }) => {
    return (
        <div className={"container-list" + (tasks && tasks.length > 0 ? "" : " empty")}>
            { tasks && tasks.length > 0
                ?
                // eslint-disable-next-line react/jsx-key
                tasks.map(task => <p>{task.name}</p>)
                :
                <>
                    <img src="/empty.svg" alt="Nenhuma tarefa encontrada"/>
                    <p>Você ainda não possui tarefas cadastradas!</p>
                </>
            }
        </div>
    );
}