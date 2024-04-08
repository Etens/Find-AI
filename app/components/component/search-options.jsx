"use client";

import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
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
      case "Generation Multiples":
        if (value === "Oui") {
          return "Pourriez-vous me donner trois suggestions distinctes, s'il vous plaît?";
        }
        return ``;
      case "Durée":
        return `d'une durée maximale de ${value.toLowerCase()}`;
      case "Emotion":
        return `provoquant une émotion de ${value.toLowerCase()}`;
      case "Popularité":
        return `qui est ${value.toLowerCase()}`;
      case "Décennie":
        return `sorti dans les ${value.toLowerCase()}`;
      case "Public":
        return `adapté à un public ${value.toLowerCase()}`;
      case "Plateforme":
        return `disponible sur ${value}`;
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
    onInstructionChange(instruction, label);
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
            <DropdownMenuRadioItem value={option.value} key={option.value} disabled={option.disabled}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}