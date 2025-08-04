import { Facebook, Twitter, Linkedin, Instagram, UserPlus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { BusinessCard } from '@/types/businessCard';
import { SignatureLayout } from './types';

interface SignaturePreviewProps {
  card: BusinessCard;
  selectedLayout: SignatureLayout;
}

export function SignaturePreview({ card, selectedLayout }: SignaturePreviewProps) {
  const { profile, business, social } = card;
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const location = `${business.address.city}, ${business.address.state}`;
  const titleDept = `${profile.title}${profile.department ? ` - ${profile.department}` : ''}`;
  
  const socialLinks = [
    { url: social.facebook, icon: Facebook, label: 'Facebook' },
    { url: social.twitter, icon: Twitter, label: 'Twitter' },
    { url: social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { url: social.instagram, icon: Instagram, label: 'Instagram' }
  ].filter(link => link.url);

  const imageUrl = selectedLayout === 'profile-photo' ? card.profilePhoto : 
                  selectedLayout === 'company-logo' ? card.companyLogo : '';

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Preview</Label>
      <div className="border rounded-lg p-4 bg-gray-50">
        <div 
          className="border-t-2 border-b-2 py-4 bg-white text-sm"
          style={{ 
            borderTopColor: card.brandColor, 
            borderBottomColor: card.brandColor,
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="mb-3">
            <div 
              className="font-bold text-base"
              style={{ color: card.brandColor }}
            >
              {profile.company}
            </div>
            {profile.companySlogan && (
              <div className="italic text-gray-600 text-xs">
                "{profile.companySlogan}"
              </div>
            )}
          </div>
          
          <div className="flex gap-4">
            {imageUrl && (
              <div className="flex-shrink-0">
                <img 
                  src={imageUrl} 
                  alt={selectedLayout === 'profile-photo' ? fullName : profile.company}
                  className={`w-12 max-w-12 h-auto object-cover ${
                    selectedLayout === 'profile-photo' ? 'rounded-full' : 'rounded'
                  }`}
                />
              </div>
            )}
            <div className="flex-1">
              <div 
                className="font-bold mb-1"
                style={{ color: card.brandColor }}
              >
                {fullName}
              </div>
              <div className="text-gray-800 mb-1">
                {titleDept} - {location}
              </div>
              <div className="mb-2 text-gray-600">
                {business.phone} | {business.email} | {business.website}
              </div>
              {(socialLinks.length > 0 || true) && (
                <div className="flex gap-2 items-center">
                  {socialLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <IconComponent 
                        key={index}
                        className="w-4 h-4"
                        style={{ color: card.brandColor }}
                      />
                    );
                  })}
                  {/* Save Contact Button */}
                  <a
                    href={`${window.location.origin}/card/${card.urlName || card.metadata.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ml-2"
                    style={{ 
                      color: card.brandColor,
                      backgroundColor: '#f3f4f6',
                      textDecoration: 'none'
                    }}
                  >
                    <UserPlus className="w-3 h-3" />
                    Save Contact
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}