
import React from 'react';
import { FormComponentProps } from '@/types/businessCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export function SocialForm({ card, onUpdate }: FormComponentProps) {
  const handleInputChange = (field: string, value: string) => {
    const updatedCard = {
      ...card,
      social: {
        ...card.social,
        [field]: value
      }
    };
    onUpdate(updatedCard);
  };

  const socialPlatforms = [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/in/username'
    },
    {
      key: 'twitter',
      label: 'Twitter/X',
      icon: Twitter,
      placeholder: 'https://twitter.com/username'
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      placeholder: 'https://facebook.com/username'
    },
    {
      key: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      placeholder: 'https://instagram.com/username'
    },
    {
      key: 'youtube',
      label: 'YouTube',
      icon: Youtube,
      placeholder: 'https://youtube.com/channel/username'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-6">
          Add your social media profiles to help people connect with you.
        </p>
        
        <div className="space-y-4">
          {socialPlatforms.map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </Label>
              <Input
                id={key}
                type="url"
                placeholder={placeholder}
                value={card.social[key as keyof typeof card.social] || ''}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}

          {/* TikTok */}
          <div className="space-y-2">
            <Label htmlFor="tiktok" className="flex items-center gap-2">
              <svg 
                className="h-4 w-4"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
              TikTok
            </Label>
            <Input
              id="tiktok"
              type="url"
              placeholder="https://tiktok.com/@username"
              value={card.social.tiktok || ''}
              onChange={(e) => handleInputChange('tiktok', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
