import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api/index";

import { Button } from "./Button";

function Deck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentCards, setCurrentCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadCurrentDeck() {
            try {
                setIsLoading(true);
                const deckToSet = await readDeck(deckId, abortController.signal);
                setCurrentDeck(deckToSet);
                setCurrentCards(deckToSet.cards);
            } catch (error) {
                console.log("loadCurrentDeck Aborted");
            } finally {
                setIsLoading(false);
            }
        }
        loadCurrentDeck();
        return () => abortController.abort();
    }, [deckId]);

    const handleDeleteCard = async (cardId) => {
        if (window.confirm("Delete this card?")) {
            await deleteCard(cardId);
            const updatedDeck = await readDeck(deckId);
            setCurrentDeck(updatedDeck);
            setCurrentCards(updatedDeck.cards);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!currentDeck) {
        return <p>No deck found.</p>;
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        View Deck
                    </li>
                </ol>
            </nav>
            <div>
                <h2> {currentDeck.name} </h2>
                <h4> {currentDeck.description} </h4>
                <Link to={`${location.pathname}/edit`}>
                    <Button> Edit Deck </Button>
                </Link>
                <Link to={`${location.pathname}/study`}>
                    <Button> Study Deck </Button>
                </Link>
                <Link to={`${location.pathname}/cards/new`}>
                    <Button> Add Cards </Button>
                </Link>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        if (window.confirm("Delete this deck?")) {
                            deleteDeck(currentDeck.id);
                            navigate("/");
                        }
                    }}
                >
                    Delete
                </button>
            </div>

            <div>
                {currentCards && currentCards.length > 0 ? (
                    currentCards.map((card) => (
                        <div key={card.id}>
                            <div className="card border-primary mb-3">
                                <div className="card-body">
                                    <h4 className="card-text text-danger"> Front </h4>
                                    <p className="card-text"> {card.front} </p>
                                    <br />
                                    <h4 className="card-text text-danger"> Back </h4>
                                    <p className="card-text"> {card.back} </p>

                                    <Link to={`/decks/${currentDeck.id}/cards/${card.id}/edit`}>
                                        <Button> Edit Card </Button>
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteCard(card.id)}
                                    >
                                        Delete Card
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No cards found in this deck.</p>
                )}
            </div>
        </div>
    );
}

export default Deck;
