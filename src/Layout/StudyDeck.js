import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Card from "./Card";

function StudyDeck() {
    const params = useParams();
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentCards, setCurrentCards] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([]);
            setCurrentCards([]);
            try {
                const response = await readDeck(params.deckId);
                setCurrentDeck(response);
                const { cards } = response;
                setCurrentCards(cards);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    }, [params]);

    if (currentDeck) {
        return (
            <div>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/"> Home </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/decks/${currentDeck.id}`}>
                                    {" "}
                                    View Deck{" "}
                                </Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Study Deck
                            </li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <h1>{currentDeck.name}</h1>
                    <h2>Study</h2>
                </div>
                <Card currentCards={currentCards} />
            </div>
        );
    }
    return <p>Loading...</p>;
}

export default StudyDeck;
