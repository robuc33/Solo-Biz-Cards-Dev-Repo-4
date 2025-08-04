"use client"

import React, { useState, useEffect } from 'react';
import { BusinessCard, FormSection } from '@/types/businessCard';
import { BusinessCardForm } from '@/components/onboarding/BusinessCardForm';
import { BusinessCardPreview } from '@/components/onboarding/BusinessCardPreview';
import { getFullName, createInitialCard } from '@/utils/businessCard';
import { loadBusinessCards } from '@/utils/cardStorage';

interface OnboardingProps {
  editMode?: boolean;
  cardId?: string;
}

export function Onboarding({ editMode = false, cardId }: OnboardingProps) {
  const [card, setCard] = useState<BusinessCard>(createInitialCard());
  const [currentSection, setCurrentSection] = useState<FormSection>('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const isEditMode = Boolean(editMode && cardId);

  // Initialize card state for editing
  useEffect(() => {
    if (isEditMode && cardId) {
      const cards = loadBusinessCards();
      const cardToEdit = cards.find((c: BusinessCard) => c.metadata.id === cardId);
      
      if (cardToEdit) {
        setCard(cardToEdit);
      }
    }
  }, [isEditMode, cardId]);

  const handleCardUpdate = (updatedCard: BusinessCard) => {
    setCard(updatedCard);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: `${card.brandColor}15` }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Form Section */}
          <div>
            <BusinessCardForm
              card={card}
              onUpdate={handleCardUpdate}
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
              isEditMode={isEditMode}
              getFullName={getFullName}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6 mt-8 lg:mt-0">
            <BusinessCardPreview card={card} />
          </div>
        </div>
      </div>
    </div>
  );
}
