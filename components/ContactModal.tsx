import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  animateClass: string;
  username: string;
  isSubmitting: boolean;
  cardData: any;
  theme: string;
  onSubmitContact: (data: any) => void;
}

export function ContactModal({
  isOpen,
  onClose,
  animateClass,
  username,
  isSubmitting,
  cardData,
  theme,
  onSubmitContact
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }

    onSubmitContact(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`
          relative bg-white mx-auto w-[calc(100%-1rem)] max-w-[448px] 
          max-h-[98dvh] rounded-t-3xl shadow-2xl overflow-visible 
          transform transition-transform duration-700 ${animateClass}
        `}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white z-10 cursor-pointer rounded-full hover:scale-110 transition-transform"
          aria-label="Close"
        >
          <svg
            style={{
              fill: "rgb(0, 0, 0)",
              height: "24px",
              width: "24px",
            }}
            viewBox="0 0 20 20"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Profile Picture Overlap */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-13 z-10">
          {cardData?.profilePhoto ? (
            <img
              src={cardData.profilePhoto}
              alt="Profile"
              className="w-26 h-26 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="w-26 h-26 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-sm text-gray-600">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto rounded-t-3xl max-h-[calc(98dvh-4rem)] pt-16 pb-6">
          <div className="px-6">
            <h2 className="text-center text-xl font-semibold mb-2">
              Send your contact information
            </h2>
            <p className="text-center text-gray-600 mb-6">
              to {username}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Optional message..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6"
                style={{ backgroundColor: theme }}
              >
                {isSubmitting ? 'Sending...' : 'Send Contact Info'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
