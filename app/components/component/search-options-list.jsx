import { useState } from "react";
import { SearchOptions } from "../component/search-options";
import {
    faFilm as iconMedia,
    faLaughBeam as iconFunny,
    faStar as iconExcellent,
    faHourglassEnd as iconDuration,
    faGlobeEurope as iconFrench,
    faFire as iconPopular,
    faCalendarAlt as icon2020s,
    faUsers as iconKids,
    faBuilding as iconIndie,
    faCirclePlay as iconPlay,
} from "@fortawesome/free-solid-svg-icons";

const SearchOptionsList = ({ handleOptionChange, showOptions, setShowOptions }) => {
    const [selectedMediaType, setSelectedMediaType] = useState('');

    const handleMediaTypeChange = (instruction, label) => {
        setSelectedMediaType(instruction);
        setShowOptions(true);
        handleOptionChange(instruction, label);
    };

    const showDurationOptions = selectedMediaType === "Je recherche un film" || selectedMediaType === "Je recherche un documentaire" || selectedMediaType === "Je recherche un film d'animation";

    const showAllOptions = selectedMediaType !== '';

    return (
        <>
            <div className="text-xs text-gray-300 max-w-full flex flex-wrap justify-center">
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
                    shouldAnimate={!showAllOptions}
                />
                <div className="flex flex-wrap justify-center space-x-2 mt-1">
                    {showAllOptions && showDurationOptions && showOptions && (
                        <SearchOptions
                            label="Durée"
                            options={[
                                { value: "short", label: "1h" },
                                { value: "medium", label: "2h" },
                                { value: "long", label: "3h" },
                            ]}
                            buttonIcon={iconDuration}
                            onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                        />
                    )}
                    {showAllOptions && showOptions && (
                        <>
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
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
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
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
                            <SearchOptions
                                label="Popularité"
                                options={[
                                    { value: "popular", label: "Populaire" },
                                    { value: "unpopular", label: "Peu Populaire" },
                                ]}
                                buttonIcon={iconPopular}
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
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
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
                            <SearchOptions
                                label="Public"
                                options={[
                                    { value: "kids", label: "Enfants" },
                                    { value: "teens", label: "Adolescents" },
                                    { value: "adults", label: "Adultes" },
                                ]}
                                buttonIcon={iconKids}
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
                            <SearchOptions
                                label="Plateforme"
                                options={[
                                    { value: "netflix", label: "Netflix" },
                                    { value: "prime", label: "Amazon Prime" },
                                    { value: "disney", label: "Disney+" },
                                    { value: "hbo", label: "HBO" },
                                    { value: "apple", label: "Apple TV+" },
                                    { value: "youtube", label: "YouTube" },
                                    { value: "mycanal", label: "myCanal" },
                                    { value: "arte", label: "Arte" },
                                    { value: "crunchyroll", label: "Crunchyroll" },
                                ]}
                                buttonIcon={iconPlay}
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
                            <SearchOptions
                                label="Studio de Production"
                                options={[
                                    { value: "indie", label: "Indépendant" },
                                    { value: "large", label: "Grand Studio" },
                                ]}
                                buttonIcon={iconIndie}
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
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
                                onInstructionChange={(instruction, label) => handleOptionChange(instruction, label)}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchOptionsList;
