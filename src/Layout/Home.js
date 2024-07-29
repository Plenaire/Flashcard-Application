import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

import { Button } from "./Button";

function Home() {
    const [deckList, setDeckList] = useState([]);

    useEffect(() => {
        async function loadDecks() {
            try {
                const response = await listDecks();
                setDeckList(response);
            } catch (error) {
                console.log(error);
            }
        }

        loadDecks();
    }, []);

    if (deckList) {
        return (
            <div>
                <Link to="/decks/new">
                    <Button> Create Deck </Button>
                </Link>
                <div />
                {deckList.map((deck) => (
                    <div key={deck.id} className="card mb-3">
                        <div className="card-body">
                            <h4 className="title"> {deck.name} </h4>
                            <h6 className="card-subtitle mb-2 text-muted"> {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"} </h6>
                            <p className="card-text"> {deck.description} </p>
                            <Link to={`/decks/${deck.id}`}>
                                <Button> View </Button>
                            </Link>
                            <Button
                                danger
                                onClick={async () => {
                                    if (window.confirm("Delete this deck?")) {
                                        await deleteDeck(`${deck.id}`);
                                        setDeckList((prevDeckList) =>
                                            prevDeckList.filter((d) => d.id !== deck.id)
                                        );
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return <p> Loading... </p>;
    }
}

export default Home;
