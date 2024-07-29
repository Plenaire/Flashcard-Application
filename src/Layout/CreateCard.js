import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

function CreateCard() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [currentDeck, setCurrentDeck] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([]);
            try {
                const response = await readDeck(deckId);
                setCurrentDeck(response);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    }, [deckId]);

    const handleDone = () => {
        navigate(`/decks/${deckId}`);
    };

    if (currentDeck) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${currentDeck.id}`}>
                                {currentDeck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Create Card
                        </li>
                    </ol>
                </nav>
                <h2>{currentDeck.name}</h2>
                <h3>Add Card</h3>
                <CardForm
                    deckId={deckId}
                    handleDone={handleDone}
                    isCreateMode={true}
                />
            </div>
        );
    }
    return <p>Loading...</p>;
}

export default CreateCard;
