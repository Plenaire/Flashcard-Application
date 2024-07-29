import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import StudyDeck from "./StudyDeck";
import EditDeck from "./EditDeck";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";

function Layout() {
    return (
        <div className="container">
            <Header />
            <hr />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/decks/new" element={<CreateDeck />} />

                <Route path="/decks/:deckId" element={<Deck />} />

                <Route path="/decks/:deckId/study" element={<StudyDeck />} />

                <Route path="/decks/:deckId/edit" element={<EditDeck />} />

                <Route path="/decks/:deckId/cards/new" element={<CreateCard />} />

                <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default Layout;
