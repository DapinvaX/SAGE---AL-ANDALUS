import React, { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/tasks/")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            {tasks.map((task) => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
