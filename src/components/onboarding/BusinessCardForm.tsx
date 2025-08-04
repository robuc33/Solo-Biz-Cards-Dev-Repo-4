import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BusinessCardFormProps, FormSection } from '@/types/businessCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from './forms/ProfileForm';
import { BusinessForm } from './forms/BusinessForm';
import { SocialForm } from './forms/SocialForm';
import { AboutForm } from './forms/AboutForm';
import { AppointmentForm } from './forms/AppointmentForm';
import { generateVCard } from '@/utils/businessCard';
import { saveBusinessCard, isUrlNameAvailable, generateUniqueUrlName } from '@/utils/cardStorage';
import { Image, Contact2, Save, LayoutGrid, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const sections = ['profile', 'business', 'social', 'about', 'cta'] as const;

export function BusinessCardForm({ 
  card, 
  onUpdate, 
  isEditMode,
  currentSection, 
  onSectionChange, 
  getFullName,
  hasUnsavedChanges 
}: BusinessCardFormProps) {
  const router = useRouter();
  const { toast } = useToast();


  const handleSave = () => {
    // Validate required fields
    if (!card.urlName?.trim()) {
      toast({
        title: "Validation Error",
        description: "Card Name is required",
        variant: "destructive"
      });
      onSectionChange('profile');
      return;
    }

    // Check URL name uniqueness
    if (!isUrlNameAvailable(card.urlName, isEditMode ? card.metadata.id : undefined)) {
      const suggestion = generateUniqueUrlName(card.urlName);
      toast({
        title: "Card Name Already Exists",
        description: `"${card.urlName}" is already taken. Try "${suggestion}" instead.`,
        variant: "destructive"
      });
      onSectionChange('profile');
      return;
    }

    if (!card.profile.firstName?.trim() || !card.profile.lastName?.trim()) {
      toast({
        title: "Validation Error",
        description: "First name and last name are required",
        variant: "destructive"
      });
      onSectionChange('business');
      return;
    }

    // Apply default profile image if none selected
    const cardToSave = { ...card };
    if (!cardToSave.profilePhoto?.trim()) {
      cardToSave.profilePhoto = "/lovable-uploads/2ec8acd8-cf0d-4551-b623-9a7e072d0646.png";
    }

    // Save using consistent storage utility
    saveBusinessCard(cardToSave);

    toast({
      title: "Success!",
      description: isEditMode ? "Card updated successfully" : "Card saved successfully",
    });

        router.push('/dashboard/cards');
  };

  const handleDownloadImage = async () => {
    const previewElement = document.querySelector('.card-preview');
    if (!previewElement) {
      toast({
        title: "Error",
        description: "Unable to find card preview",
        variant: "destructive"
      });
      return;
    }

    try {
      // Import html2canvas dynamically
      const html2canvas = await import('html2canvas');
      const canvas = await html2canvas.default(previewElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${card.urlName || 'business-card'}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      canvas.remove();

      toast({
        title: "Success!",
        description: "Business card image downloaded",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadVCard = () => {
    const vCardData = generateVCard(card);
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.urlName || getFullName(card) || 'contact'}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Success!",
      description: "vCard downloaded",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          {isEditMode ? 'Edit Your Business Card' : 'Create Your Business Card'}
        </CardTitle>
        {!isEditMode && (
          <p className="text-muted-foreground text-sm">
            Free digital business card download and use
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Button
              key={section}
              variant={currentSection === section ? "default" : "outline"}
              size="sm"
              onClick={() => onSectionChange(section)}
              className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0"
            >
              {section === 'cta' ? 'CTA' : section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>

        {/* Form Sections */}
        <div>
          {currentSection === 'profile' && <ProfileForm card={card} onUpdate={onUpdate} isEditMode={isEditMode} />}
          {currentSection === 'business' && <BusinessForm card={card} onUpdate={onUpdate} />}
          {currentSection === 'social' && <SocialForm card={card} onUpdate={onUpdate} />}
          {currentSection === 'about' && <AboutForm card={card} onUpdate={onUpdate} />}
          {currentSection === 'cta' && <AppointmentForm card={card} onUpdate={onUpdate} />}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Download Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleDownloadImage} className="flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Image size={18} />
              Download Image
            </Button>
            <Button onClick={handleDownloadVCard} variant="secondary" className="flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Contact2 size={18} />
              Download vCard
            </Button>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button onClick={handleSave} className="flex items-center gap-2 col-span-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Save size={18} />
              {isEditMode ? 'Update Card' : 'Save Card'}
            </Button>
            <Button 
              onClick={() => router.push('/dashboard/cards')} 
              variant="secondary" 
              className="flex items-center gap-2 col-span-1 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <LayoutGrid size={18} />
              Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
