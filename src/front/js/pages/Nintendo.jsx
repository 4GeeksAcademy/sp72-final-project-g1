import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GameCard } from '../component/GameCard.jsx';

export const Nintendo = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const nintendoData = async () => {
        await actions.getNintendo();
    };

    const handleNintendoDetails = async (id) => {
        await actions.getNintendoDetailsId(id);
        navigate("/nintendodetails");
    };

    useEffect(() => {
        nintendoData();
    }, []);

    return (
        <div className="container w-75">
            <h1>Nintendo Games</h1>
            <div className="row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner mb-3">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="https://i.ytimg.com/vi/w2yZI9oGHPs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBnuPu0T3bxXpNxILvRt7izsrbRXg" className="d-block w-50 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="https://www.switchaboo.com/content/images/2020/11/D_tf0vQXYAAE_cL.jpg" className="d-block w-50 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ytimg.com/vi/hGGECWcbtU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDyRaZxFSDPt-A6PSwf2_vljRvCcw" className="d-block w-50 mx-auto" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-2 justify-content-center card-body">
                {store.nintendo && store.nintendo.map((item) => (
                    <div className="col">
                        <GameCard
                            key={item.id}
                            image={item.medias_game[0].url}
                            title={item.title}
                            price={item.game_characteristics[1].store.price}
                            click={() => handleNintendoDetails(item.id)}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

