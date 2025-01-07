import React, { useState } from "react";

function TaskForm({ onSubmit, task }) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState(task?.priority || "baja");
    const [status, setStatus] = useState(task?.status || false);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState(false); // Estado para habilitar la previsualización

    // Validar campos del formulario
    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "El título es obligatorio.";
        else if (title.length < 3)
            newErrors.title = "El título debe tener al menos 3 caracteres.";
        if (description.length > 200)
            newErrors.description = "La descripción no puede superar los 200 caracteres.";
        return newErrors;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        await onSubmit({ title, description, priority, status });
        setIsSubmitting(false);
    };

    // Manejar la previsualización
    const handlePreview = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setPreview(true); // Activar la previsualización
    };

    // Cerrar la previsualización
    const closePreview = () => setPreview(false);

    return (
        <div>
            <form
                onSubmit={preview ? handleSubmit : handlePreview}
                style={styles.form}
            >
                <div style={styles.field}>
                    <label htmlFor="title" style={styles.label}>
                        Título
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            ...styles.input,
                            borderColor: errors.title ? "red" : "#ccc",
                        }}
                    />
                    {errors.title && <small style={styles.error}>{errors.title}</small>}
                </div>

                <div style={styles.field}>
                    <label htmlFor="description" style={styles.label}>
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            ...styles.textarea,
                            borderColor: errors.description ? "red" : "#ccc",
                        }}
                    ></textarea>
                    {errors.description && (
                        <small style={styles.error}>{errors.description}</small>
                    )}
                </div>

                <div style={styles.field}>
                    <label htmlFor="priority" style={styles.label}>
                        Prioridad
                    </label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        style={styles.select}
                    >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>

                <div style={styles.field}>
                    <label htmlFor="status" style={styles.label}>
                        <input
                            id="status"
                            type="checkbox"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                        />
                        Completada
                    </label>
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    disabled={isSubmitting}
                >
                    {preview ? (isSubmitting ? "Guardando..." : "Confirmar") : "Previsualizar"}
                </button>
            </form>

            {preview && (
                <div style={styles.preview}>
                    <h3>Previsualización de la tarea</h3>
                    <p>
                        <strong>Título:</strong> {title}
                    </p>
                    <p>
                        <strong>Descripción:</strong> {description}
                    </p>
                    <p>
                        <strong>Prioridad:</strong> {priority}
                    </p>
                    <p>
                        <strong>Estado:</strong> {status ? "Completada" : "Pendiente"}
                    </p>
                    <button onClick={closePreview} style={styles.secondaryButton}>
                        Volver a editar
                    </button>
                </div>
            )}
        </div>
    );
}

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    field: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "0.5rem",
    },
    input: {
        padding: "0.5rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    textarea: {
        padding: "0.5rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        resize: "vertical",
    },
    select: {
        padding: "0.5rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "0.75rem",
        fontSize: "1rem",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    secondaryButton: {
        padding: "0.75rem",
        fontSize: "1rem",
        backgroundColor: "#6c757d",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "1rem",
    },
    error: {
        color: "red",
        fontSize: "0.85rem",
    },
    preview: {
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#e9ecef",
        borderRadius: "8px",
        textAlign: "left",
    },
};

export default TaskForm;
