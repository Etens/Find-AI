"use client";

import { useState } from "react";
import { SearchOptions } from "../component/search-options";
import { faFilm as iconMedia, faLaughBeam as iconFunny, faStar as iconExcellent, faHourglassEnd as iconDuration, faGlobeEurope as iconFrench, faFire as iconPopular, faCalendarAlt as icon2020s, faUsers as iconKids, faBuilding as iconIndie } from "@fortawesome/free-solid-svg-icons";

const SearchOptionsList = ({ step, handleOptionChange }) => {
    const [selectedMediaType, setSelectedMediaType] = useState('');

    const handleMediaTypeChange = (instruction) => {
        setSelectedMediaType(instruction);
        handleOptionChange(instruction, 1);
        console.log(instruction);
    };

    const showDurationOptions = selectedMediaType === "Je recherche un film" || selectedMediaType === "Je recherche un documentaire" || selectedMediaType === "Je recherche un film d'animation";

    const emotionStep = showDurationOptions ? 2 : 1;

    return (
        <>
            <div className="flex justify-center space-x-2 text-xs text-gray-300 max-w-full mt-6">
                {step >= 0 && (
                    <SearchOptions
                        label="Type de Médias"
                        options={[
                            { value: "film", label: "Film" },
                            { value: "series", label: "Série" },
                            { value: "documentary", label: "Documentaire" },
                            { value: "annimation", label: "Film d'Animation" },
                            { value: "anime", label: "Animé" },
                        ]}
                        buttonIcon={iconMedia}
                        onInstructionChange={handleMediaTypeChange}
                        shouldAnimate={step === 0}
                    />
                )}
                {step >= 1 && showDurationOptions && (
                    <SearchOptions
                        label="Durée"
                        options={[
                            { value: "short", label: "1h" },
                            { value: "medium", label: "2h" },
                            { value: "long", label: "3h" },
                        ]}
                        buttonIcon={iconDuration}
                        onInstructionChange={(instruction) => handleOptionChange(instruction, 2)}
                    />
                )}
                {step >= emotionStep && (
                    <SearchOptions
                        label="Emotion"
                        options={[
                            { value: "laughter", label: "Rire" },
                            { value: "sadness", label: "Emouvant" },
                            { value: "fear", label: "Peur" },
                            { value: "motivation", label: "Motivation" },
                            { value: "love", label: "Amour" },
                            { value: "reflection", label: "Réflexion" },
                            { value: "adrenaline", label: "Adrénaline" },
                            { value: "wonder", label: "Émerveillement" },
                            { value: "thrill", label: "Frisson" },
                        ]}
                        buttonIcon={iconFunny}
                        onInstructionChange={(instruction) => handleOptionChange(instruction, 3)}
                    />
                )}
                {step >= 3 && (
                    <SearchOptions
                        label="Note"
                        options={[
                            { value: "excellent", label: "Excellent" },
                            { value: "good", label: "Bon" },
                            { value: "average", label: "Moyen" },
                            { value: "poor", label: "Mauvais" },
                            { value: "disastrous", label: "Désastreux" },
                        ]}
                        buttonIcon={iconExcellent}
                        onInstructionChange={(instruction) => handleOptionChange(instruction, 4)}
                    />
                )}
                {step >= 4 && (
                    <SearchOptions
                        label="Popularité"
                        options={[
                            { value: "popular", label: "Populaire" },
                            { value: "unpopular", label: "Peu Populaire" },
                            { value: "unknown", label: "Inconnue" },
                        ]}
                        buttonIcon={iconPopular}
                        onInstructionChange={(instruction) => handleOptionChange(instruction, 5)}
                    />
                )}
                {step >= 5 && (
                    <SearchOptions
                        label="Décennie"
                        options={[
                            { value: "2020s", label: "Années 2020" },
                            { value: "2010s", label: "Années 2010" },
                            { value: "2000s", label: "Années 2000" },
                            { value: "90s", label: "Années 90" },
                            { value: "older", label: "Années 80 et avant" },
                        ]}
                        buttonIcon={icon2020s}
                        onInstructionChange={(instruction) => handleOptionChange(instruction, 6)}
                    />
                )}
                {step >= 6 && (
                    <SearchOptions
                        label="Public"
                        options={[
                            { value: "kids", label: "Enfants" },
                            { value: "teens", label: "Adolescents" },
                            { value: "adults", label: "Adultes" },
                        ]}
                        buttonIcon={iconKids}
                        onInstructionChange={(instruction) => handleOptionChange(instruction, 7)}
                    />
                )}
                {step >= 7 && (
                    <SearchOptions
                        label="Studio de Production"
                        options={[
                            { value: "indie", label: "Indépendant" },
                            { value: "large", label: "Grand Studio" },
                        ]}
                        buttonIcon={iconIndie}
                        onInstructionChange={(instruction) => handleOptionChange(instruction, 8)}
                    />
                )}
                {step >= 8 && (
                    <SearchOptions
                        label="Origine de Production"
                        options={[
                            { value: "us", label: "Hollywood (États-Unis)" },
                            { value: "uk", label: "Britannique" },
                            { value: "france", label: "Français" },
                            { value: "india", label: "Bollywood (Inde)" },
                            { value: "korea", label: "Coréen" },
                            { value: "japan", label: "Japonais" },
                            { value: "china", label: "Chinois" },
                            { value: "italy", label: "Italien" },
                            { value: "spain", label: "Espagnol" },
                            { value: "international", label: "International" },
                        ]}
                        buttonIcon={iconFrench}
                        onInstructionChange={(instruction) => handleOptionChange(instruction)}
                    />
                )}
            </div>
        </>
    );
};


export default SearchOptionsList;