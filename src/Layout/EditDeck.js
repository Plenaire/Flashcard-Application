import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck() {
    const { deckId } = useParams();
    const navigate = useNavigate();

    const [currentDeck, setCurrentDeck] = useState(null);
    const [name, setName] = useState("Loading...");
    const [description, setDescription] = useState("Loading...");

    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([]);
            try {
                const response = await readDeck(deckId);
                setCurrentDeck(response);
                setName(response.name);
                setDescription(response.description);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    }, [deckId]);

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const deck = {
            ...currentDeck,
            name,
            description,
        };
        updateDeck(deck)
            .then((response) => {
                console.log(response);
                setCurrentDeck(response);
                navigate(`/decks/${currentDeck.id}`);
            });
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate(`/decks/${currentDeck.id}`);
    };

    if (currentDeck) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active">
                            <Link to={`/decks/${deckId}`}> View Deck </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit Deck
                        </li>
                    </ol>
                </nav>
                <h2>Edit Deck</h2>
                <form onSubmit={handleEditSubmit}>
                    <label>Name</label>
                    <br />
                    <input
                        type="text"
                        required
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                    />
                    <br />
                    <label>Description</label>
                    <br />
                    <textarea
                        required
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                    />
                    <br />
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
    return <p>Loading...</p>;
}
export default EditDeck;