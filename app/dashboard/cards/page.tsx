'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, List, User } from "lucide-react";
import { BusinessCard } from '@/types/businessCard';
import { CardGrid } from '@/components/dashboard/CardGrid';
import { CardList } from '@/components/dashboard/card-list';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { loadBusinessCards, deleteBusinessCard, toggleCardFavorite } from '@/utils/cardStorage';
import { filterFavorites, filterPublicCards } from '@/utils/cardFilters';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Cards() {
  const router = useRouter();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('local');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<BusinessCard | null>(null);

  // Load cards on component mount
  useEffect(() => {
    const loadedCards = loadBusinessCards();
    setCards(loadedCards);
  }, []);

  // Filter cards when dependencies change
  useEffect(() => {
    let filtered = cards;
    
    // Apply tab filter
    if (activeTab === 'favorites') {
      filtered = filterFavorites(filtered);
    }
    
    setFilteredCards(filtered);
  }, [cards, activeTab]);

  const handleCardAction = (action: 'edit' | 'delete' | 'share' | 'view' | 'analytics' | 'preview', card: BusinessCard) => {
    switch (action) {
      case 'edit':
        // Store the card data for editing and navigate to onboarding
        localStorage.setItem('edit_card_data', JSON.stringify(card));
        router.push('/');
        break;
      case 'delete':
        setCardToDelete(card);
        setShowDeleteDialog(true);
        break;
      case 'view':
        // Navigate to card details view
        router.push(`/dashboard/cards/${card.metadata.id}`);
        break;
      case 'preview':
        // Navigate to local card preview
        router.push(`/card/${card.metadata.id}`);
        break;
      case 'share':
        // Implement share functionality
        console.log('Share card:', card);
        break;
      case 'analytics':
        // Handle analytics (pro feature)
        console.log('Analytics for card:', card);
        break;
    }
  };

  const handleToggleFavorite = (cardId: string) => {
    toggleCardFavorite(cardId);
    setCards(loadBusinessCards());
  };

  const handleCreateCard = () => {
    localStorage.removeItem('edit_card_data');
    router.push('/');
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      deleteBusinessCard(cardToDelete.metadata.id);
      setCards(loadBusinessCards());
    }
    setShowDeleteDialog(false);
    setCardToDelete(null);
  };

  if (cards.length === 0) {
    return <EmptyState onCreateCard={handleCreateCard} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="local">Local Cards ({cards.length})</TabsTrigger>
              <TabsTrigger value="favorites">My Cards ({filterFavorites(cards).length})</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button 
            variant="outline" 
            onClick={() => router.push('/members')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Members Directory ({filterPublicCards(cards).length})
          </Button>
        </div>
        
        <div className="flex border border-border rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="local" className="mt-6">
          {viewMode === 'grid' ? (
            <CardGrid
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          ) : (
            <CardList
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          {viewMode === 'grid' ? (
            <CardGrid
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          ) : (
            <CardList
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Business Card</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{cardToDelete ? `${cardToDelete.profile.firstName} ${cardToDelete.profile.lastName}` : 'this card'}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
