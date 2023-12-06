import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { gameServiceFactory } from '../services/gameService';
import * as pictureService from '../services/pictureService';
import { Path } from '../constants/constants';

export const PictureContext = createContext();

export const PictureProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [picture, setPicture] = useState([]);
    const pictureService = pictureService();

    useEffect(() => {
        pictureService.getAll()
            .then(result => {
                setPicture(result)
            })
    }, []);

    const onCreatePictureSubmit = async (data) => {
        const newPicture = await pictureService.create(data);

        setPicture(state => [...state, newPicture]);

        navigate(Path.Gallery);
    };

    const onPictureEditSubmit = async (values) => {
        const result = await gameService.edit(values._id, values);

        setGames(state => state.map(x => x._id === values._id ? result : x))

        navigate(`/catalog/${values._id}`);
    };

    const deleteGame = (gameId) => {
        setGames(state => state.filter(game => game._id !== gameId));
    };

    const getGame = (gameId) => {
        return games.find(game => game._id === gameId);
    };

    const contextValues = {
        games,
        onCreateGameSubmit,
        onGameEditSubmit,
        deleteGame,
        getGame,
    };

    return (
        <GameContext.Provider value={contextValues}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);

    return context;
};