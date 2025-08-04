import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ShoppingCart, Star, Zap, CreditCard, Smartphone, Tag, ChevronDown, ArrowLeft, Building2, User, Info, Image } from "lucide-react";
import { loadBusinessCards } from "@/utils/cardStorage";
import { BusinessCard } from "@/types/businessCard";
import { useState, useEffect } from "react";
// Using public directory paths for Next.js
const nfcCards1 = "/nfc-cards-1.jpg";
const nfcCards2 = "/nfc-cards-2.jpg";
const nfcAccessories = "/nfc-accessories-1.jpg";
const nfcStickers = "/nfc-stickers.jpg";
const soloLogo = "/solo-logo.png";
const qrCode = "/qr-code.png";
export default function Accessories() {
  const [businessCards, setBusinessCards] = useState<BusinessCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>('essential');
  const [cardDetails, setCardDetails] = useState({
    firstName: 'John',
    lastName: 'Doeington',
    companyName: 'Acme Corporation',
    additionalInfo: 'CEO',
    logo: null as File | null,
    logoText: 'LOGO',
    useLogoImage: true
  });
  const [removeBlingLogo, setRemoveBlingLogo] = useState(false);

  useEffect(() => {
    const cards = loadBusinessCards();
    setBusinessCards(cards);
  }, []);
  const products = [{
    id: 1,
    name: "Premium NFC Business Cards",
    description: "Professional black NFC cards with instant contact sharing",
    price: "$29.99",
    originalPrice: "$39.99",
    image: nfcCards1,
    badge: "Best Seller",
    rating: 4.8,
    icon: <CreditCard className="h-5 w-5" />
  }, {
    id: 2,
    name: "Smart NFC Cards - Premium",
    description: "High-quality NFC cards with advanced chip technology",
    price: "$34.99",
    originalPrice: "$44.99",
    image: nfcCards2,
    badge: "Premium",
    rating: 4.9,
    icon: <Zap className="h-5 w-5" />
  }, {
    id: 3,
    name: "NFC Accessories Bundle",
    description: "Smart rings and bracelets for contactless sharing",
    price: "$49.99",
    originalPrice: "$69.99",
    image: nfcAccessories,
    badge: "Bundle Deal",
    rating: 4.7,
    icon: <Smartphone className="h-5 w-5" />
  }, {
    id: 4,
    name: "NFC Stickers & Tags",
    description: "Adhesive NFC tags for phones and devices",
    price: "$19.99",
    originalPrice: "$24.99",
    image: nfcStickers,
    badge: "Starter Pack",
    rating: 4.6,
    icon: <Tag className="h-5 w-5" />
  }];
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-base font-bold">Accessories [0]</p>
        </div>
        <Button>
          <ShoppingCart className="h-4 w-4 mr-2" />
          View Cart
        </Button>
      </div>

      {/* NFC Card Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Display */}
        <div className="space-y-4">
          {/* Front Card */}
          <div className="relative">
            <div className="bg-black rounded-2xl p-6 aspect-[1.6/1] flex items-center justify-center text-white shadow-xl scale-[0.55]">
              {selectedCard === 'essential' && (
                <div className="flex items-center justify-center gap-6">
                  <img src="/lovable-uploads/bf370590-9076-4ca0-8853-23a471ef1ede.png" alt="Solo Logo" className="w-32 h-32" />
                  <div className="text-6xl font-bold">Solo</div>
                </div>
              )}
              
              {selectedCard === 'infinite' && (
                <div className="relative w-full h-full flex flex-col">
                  {/* Logo/Text at top right */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-lg flex items-center justify-center">
                    {cardDetails.useLogoImage && cardDetails.logo ? (
                      <img src={URL.createObjectURL(cardDetails.logo)} alt="Logo" className="max-w-full max-h-full object-contain" />
                    ) : !cardDetails.useLogoImage ? (
                      <div className="text-white text-lg font-bold text-center">{cardDetails.logoText}</div>
                    ) : null}
                  </div>
                  
                  {/* Company name, name and additional info at bottom left */}
                  <div className="absolute bottom-0 left-0 flex flex-col">
                    <div className="text-2xl font-medium">{cardDetails.companyName}</div>
                    <div className="text-4xl font-semibold">{cardDetails.firstName} {cardDetails.lastName}</div>
                    <div className="text-2xl">{cardDetails.additionalInfo}</div>
                  </div>
                </div>
              )}
              
              {selectedCard === 'custom' && (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-bold mb-2">CUSTOM</div>
                  <div className="text-lg">Your Brand Here</div>
                  <div className="w-20 h-20 border-2 border-dashed border-white/30 rounded-lg mt-4 flex items-center justify-center">
                    <span className="text-xs">LOGO</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back Card */}
          <div className="relative">
            <div className="bg-black rounded-2xl p-6 aspect-[1.6/1] flex flex-col justify-between text-white shadow-xl scale-[0.55]">
              <div className="flex justify-start">
                <div className="bg-white p-[0.3rem] rounded-lg">
                  <img src="/lovable-uploads/08522d46-e6ac-4f5f-b221-11aa1287eea5.png" alt="QR Code" className="w-24 h-24" />
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end">
                {!removeBlingLogo && (
                  <>
                    <img src="/lovable-uploads/bf370590-9076-4ca0-8853-23a471ef1ede.png" alt="Solo Logo" className="w-[2.4rem] h-[2.4rem]" />
                    <span className="text-2xl font-semibold">Solo</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Options or Customization */}
        <div className="space-y-4">
          {selectedCard !== 'infinite' ? (
            <>
              <h2 className="text-xl font-semibold">Choose your card</h2>
              <div className="space-y-4">
                {/* Essential Card */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCard === 'essential' 
                      ? 'border-primary/30 bg-primary/5' 
                      : 'hover:border-primary/30 hover:bg-primary/5'
                  }`}
                  onClick={() => setSelectedCard('essential')}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">SoloBizCards Essential</h3>
                      <p className="text-muted-foreground text-sm">The last business card you'll ever need</p>
                    </div>
                    <span className="text-xl font-bold">$25</span>
                  </div>
                </div>

                {/* Infinite Card */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCard === 'infinite' 
                      ? 'border-primary/30 bg-primary/5' 
                      : 'hover:border-primary/30 hover:bg-primary/5'
                  }`}
                  onClick={() => setSelectedCard('infinite')}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">SoloBizCards Infinite</h3>
                      <p className="text-muted-foreground text-sm">Personalize your card and make an impression</p>
                    </div>
                    <span className="text-xl font-bold">$45</span>
                  </div>
                </div>

                {/* Custom Card */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCard === 'custom' 
                      ? 'border-primary/30 bg-primary/5' 
                      : 'hover:border-primary/30 hover:bg-primary/5'
                  }`}
                  onClick={() => setSelectedCard('custom')}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">SoloBizCards Custom</h3>
                      <p className="text-muted-foreground text-sm">Your brand, no limits</p>
                    </div>
                    <span className="text-xl font-bold">$65</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCard('essential')}
                  className="p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">Customise your card's details</h2>
              </div>
              <div className="space-y-4">
                {/* Company Name Field */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-600" />
                    <label className="font-medium">Company name</label>
                  </div>
                  <Input 
                    placeholder="Company name"
                    value={cardDetails.companyName}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>

                {/* Name Fields */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <label className="font-medium">Name</label>
                  </div>
                  <div className="space-y-2">
                    <Input 
                      placeholder="First name"
                      value={cardDetails.firstName}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                    <Input 
                      placeholder="Last name"
                      value={cardDetails.lastName}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-600" />
                    <label className="font-medium">Additional information</label>
                  </div>
                  <Input 
                    value={cardDetails.additionalInfo}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  />
                </div>

                {/* Logo/Text Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4 text-gray-600" />
                      <label className="font-medium">Top Right Display</label>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={!cardDetails.useLogoImage ? "font-medium" : "text-muted-foreground"}>Text Abbr.</span>
                      <Switch 
                        checked={cardDetails.useLogoImage}
                        onCheckedChange={(checked) => setCardDetails(prev => ({ ...prev, useLogoImage: checked }))}
                      />
                      <span className={cardDetails.useLogoImage ? "font-medium" : "text-muted-foreground"}>Logo</span>
                    </div>
                  </div>
                  
                  {cardDetails.useLogoImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCardDetails(prev => ({ ...prev, logo: file }));
                          }
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="text-gray-500">
                          Drop your image here, or <span className="text-red-500">browse</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">Supports JPG, JPEG, and PNG</div>
                      </label>
                    </div>
                  ) : (
                    <Input 
                      placeholder="Company name abbreviation here"
                      value={cardDetails.logoText}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, logoText: e.target.value }))}
                    />
                  )}
                </div>

                {/* Remove Bling Logo */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Do you want to remove the Bling logo?</h3>
                  <div className="flex gap-3">
                    <Button 
                      variant={!removeBlingLogo ? "default" : "outline"}
                      onClick={() => setRemoveBlingLogo(false)}
                      className="flex-1"
                    >
                      No
                    </Button>
                    <Button 
                      variant={removeBlingLogo ? "default" : "outline"}
                      onClick={() => setRemoveBlingLogo(true)}
                      className="flex-1"
                    >
                      Yes
                      <span className="ml-1 text-sm">+$10</span>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Assign to Digital Card */}
          <div className="space-y-3">
            <h3 className="font-semibold">Assign to a digital card</h3>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Search by name or card title" />
              </SelectTrigger>
              <SelectContent>
                {businessCards.map((card) => (
                  <SelectItem key={card.metadata.id} value={card.metadata.id}>
                    {card.urlName || 'Untitled Card'}
                  </SelectItem>
                ))}
                <SelectItem value="card1">My Business Card</SelectItem>
                <SelectItem value="card2">Personal Card</SelectItem>
                <SelectItem value="card3">Company Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Finalize Button */}
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold">
            Finalize and pay
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Why Choose Our NFC Products?</CardTitle>
          <CardDescription>Premium quality accessories for seamless digital networking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Instant Sharing</h4>
                <p className="text-sm text-muted-foreground">Share your contact info with just a tap</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Premium Materials</h4>
                <p className="text-sm text-muted-foreground">High-quality, durable construction</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Universal Compatibility</h4>
                <p className="text-sm text-muted-foreground">Works with all NFC-enabled devices</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}
