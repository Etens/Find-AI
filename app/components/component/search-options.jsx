"use client";

import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchOptions({ label, options, selectedOption, buttonIcon, onInstructionChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const generateInstruction = (label, value) => {
    switch (label) {
      case "Type de Médias":
        return `Je recherche un ${value.toLowerCase()}`;
      case "Note":
        let notationDescription;
        switch (value.toLowerCase()) {
          case "excellent":
            notationDescription = "excellente";
            break;
          case "good":
            notationDescription = "bonne";
            break;
          default:
            notationDescription = value.toLowerCase();
        }
        return `avec une notation ${notationDescription}`;
      case "Durée":
        return `d'une durée approximative de ${value.toLowerCase()}`;
      case "Emotion":
        return `provoquant une émotion de ${value.toLowerCase()}`;
      case "Popularité":
        return `qui est ${value.toLowerCase()} populaire`;
      case "Décennie":
        return `sorti dans les années ${value}`;
      case "Public":
        return `adapté à un public ${value.toLowerCase()}`;
      case "Studio de Production":
        return `produit par un studio ${value.toLowerCase()}`;
      case "Origine de Production":
        return `d'une production d'origine ${value.toLowerCase()}`;
      default:
        return "";
    }
  };
  const handleOptionChange = (value) => {
    const newLabel = options.find((option) => option.value === value)?.label;
    const instruction = generateInstruction(label, newLabel);
    onInstructionChange(instruction);
    console.log(instruction);
  };

  return (
    <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="default">
          {buttonIcon && <FontAwesomeIcon icon={buttonIcon} className="mr-2" />}
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={selectedOption} onValueChange={(value) => handleOptionChange(value)}>
          {options.map((option) => (
            <DropdownMenuRadioItem value={option.value} key={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}