import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faLaugh, faHeartbeat, faGhost, faStar, faHourglassEnd, faGlobeEurope, faCalendarAlt, faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Button } from "../ui/button";

const getIcon = (iconName) => {
    const icons = {
        film: faFilm,
        laugh: faLaugh,
        heartbeat: faHeartbeat,
        ghost: faGhost,
        star: faStar,
        hourglassEnd: faHourglassEnd,
        globeEurope: faGlobeEurope,
        calendarAlt: faCalendarAlt,
        users: faUsers,
        building: faBuilding,
    };
    return icons[iconName] || null;
};

export function SearchOptions({ buttonLabel, label, options, selectedOption, onOptionChange }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="default" className="text-xs">
                    {buttonLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedOption} onValueChange={onOptionChange}>
                    {options.map(option => (
                        <DropdownMenuRadioItem value={option.value} key={option.value}>
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
