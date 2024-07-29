import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const navigate = useNavigate();
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);

    useEffect(() => {
        async function loadInfo() {
            try {
                const response = await readDeck(deckId);
                setCurrentDeck(response);
                const card = response.cards.find((card) => card.id === parseInt(cardId));
                setCurrentCard(card);
            } catch (error) {
                console.log(error);
            }
        }
        loadInfo();
    }, [deckId, cardId]);

    const handleDone = () => {
        navigate(`/decks/${deckId}`);
    };

    if (currentDeck && currentCard) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/"> Home </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}> {currentDeck.name} </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit Card
                        </li>
                    </ol>
                </nav>
                <h2>Edit Card</h2>
                <CardForm
                    deckId={deckId}
                    card={currentCard}
                    handleDone={handleDone}
                    isCreateMode={false}
                />
            </div>
        );
    }
    return <p>Loading...</p>;
}

export default EditCard;
