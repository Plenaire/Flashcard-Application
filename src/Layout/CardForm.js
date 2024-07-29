import React, { useState } from "react";
import { createCard, updateCard } from "../utils/api";

const CardForm = ({ deckId, card, handleDone, isCreateMode }) => {
    const [front, setFront] = useState(card ? card.front : "");
    const [back, setBack] = useState(card ? card.back : "");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedCard = { front, back };

        if (isCreateMode) {
            await createCard(deckId, updatedCard);
        } else {
            await updateCard({ ...card, ...updatedCard });
        }

        handleDone();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">Front</label>
            <br />
            <textarea
                id="front"
                className="form-control"
                rows="3"
                required
                value={front}
                onChange={(event) => setFront(event.target.value)}
            />
            <br />
            <label htmlFor="back">Back</label>
            <br />
            <textarea
                id="back"
                className="form-control"
                rows="3"
                required
                value={back}
                onChange={(event) => setBack(event.target.value)}
            />
            <br />
            <button className="btn btn-secondary mr-2" onClick={handleDone}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary mr-2">
                {isCreateMode ? "Save" : "Submit"}
            </button>
        </form>
    );
};

export default CardForm;
