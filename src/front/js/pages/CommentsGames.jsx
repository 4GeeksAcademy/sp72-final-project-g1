import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Row, Alert } from 'react-bootstrap';
import "../../styles/Comments.css";

export const CommentsGames = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({ commentsPerGame: "" });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            actions.getCommentsGames(store.currentPC.id);
        }, 1000);

        return () => clearTimeout(timer);


    }, [store.currentPC]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const saved = localStorage.getItem("User");
        const user = JSON.parse(saved);
        const updatedFormData = {
            body: formData.commentsPerGame,
            game_id: store.currentPC.id,
            user_id: store.currentUser.id
        };
        actions.createComments(updatedFormData);
        setFormData({ commentsPerGame: "" });
        actions.getCommentsGames(store.currentPC.id);
    };

    const handleDelete = async (delete_comment) => {
        try {
            const response = await actions.deleteComment(delete_comment);
            if (response.ok) {
                //Console.log("Comentario eliminado");
                setErrorMessage("");
                actions.getCommentsGames(store.currentPC.id);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error("Error en el frontend al eliminar el comentario", error);
            setErrorMessage("Error al eliminar el comentario. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container py-3">
            <Row className="card-row">
                <h1>Escribe tu Reseña</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h4>Tu reseña:</h4>
                        <textarea
                            name="commentsPerGame"
                            value={formData.commentsPerGame}
                            onChange={handleChange}
                            rows="4"
                            style={{ width: '100%', height: '20%' }}
                        />
                    </div>
                    <button type="submit" className="button-container">
                        <span className="button-content">
                            <span>Enviar reseña</span>
                        </span>
                    </button>
                </form>
                {errorMessage && (
                    <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                        {errorMessage}
                    </Alert>
                )}
                <div id="reviews" className="container mt-3">
                    <h2>Reseñas:</h2>
                    <div>
                        {store.commentsPerGame2.length > 0 ? (
                            store.commentsPerGame2.map((item, index) => (
                                <div key={index} className="d-flex flex-column my-3 p-3 border rounded" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                    <div className="mb-3">
                                        <strong className="comments">{item.user_alias}</strong>
                                        <p className="mb-0">{item.body}</p>
                                    </div>
                                    <div className="mt-auto text-end">
                                        <i onClick={() => handleDelete(item.id)} className="fa-solid fa-trash-can trash-icon" style={{ cursor: 'pointer', color: 'black' }}
                                            onMouseOver={(e) => e.target.style.color = 'red'}
                                            onMouseOut={(e) => e.target.style.color = 'black'}>
                                        </i>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay reseñas todavía.</p>
                        )}
                    </div>
                </div>
            </Row>
        </div>
    );
};