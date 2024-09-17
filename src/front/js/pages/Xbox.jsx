import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Xbox = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    const xboxData = async () => {
        await actions.getXbox()
    }
    
    const handleXboxDetails = async (id) => {
        await actions.getXboxDetailsId(id)
        navigate("/xboxdetails")
    }
    const handleAddToFavourites = async (gameId) => {
        await actions.addToFavourites(gameId);
    };
    useEffect(() => {
        xboxData()
    },[])


    return(
        <div className="container w-75">
            <h1>Xbox Games</h1>
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
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-2 justify-content-center card-body">
                {store.xbox && store.xbox.map((item) => (
                    <div key={item.id}>
                        <div className="atropos-card card-row text-white h-100 border-0" style={{ display: "flex", flexDirection: "column", height: "100%"}}>
                            <img src={item.medias_game[0].url} className="atropos-img" alt={item.title} style={{ objectFit: 'contain', flexShrink: 0}} />
                            <div className="p-3" style={{ flexGrow: 1 }}>
                                <h5 className="fs-4">{item.title}</h5>
                            </div>
                            <footer className="p-3 mb-1 d-flex justify-content-between align-items-center" style={{ background: "transparent", flexShrink: 0 }}>
                                <strong>€{item.game_characteristics[1].store.price}</strong>
                                <span><button onClick={() => handlePcDetails(item.id)} className="btn btn-primary">Info</button>
                                <button onClick={() => handleAddToFavourites(item.id)} className="btn btn-secondary">
                                <i className="fa-regular fa-heart"></i>
                                </button></span>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}