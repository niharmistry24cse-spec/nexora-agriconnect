import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPinned,
  Plus,
  Edit2,
  Map,
  CheckCircle2,
  AlertCircle,
  Save,
  Globe,
  X
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Toggle } from '../../components/ui/Toggle';
import { Avatar } from '../../components/ui/Avatar';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerProfile = () => {
  const { farmer, setFarmer, updateFarmerPreferences, addLandParcel, showToast } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState(farmer.preferredLanguage || 'English');
  const [notifications, setNotifications] = useState({
    weatherAlerts: farmer.notifications.weatherAlerts,
    marketPriceUpdates: farmer.notifications.marketPriceUpdates,
    schemeRecommendations: farmer.notifications.schemeRecommendations
  });

  const [isAddingLand, setIsAddingLand] = useState(false);
  const [newLand, setNewLand] = useState({
    name: '',
    khasraNumber: '',
    acres: '',
    currentCrop: 'Wheat'
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: farmer.name,
    village: farmer.village,
    district: farmer.district,
    phone: farmer.phone,
    secondaryPhone: farmer.secondaryPhone
  });

  const handleSavePreferences = () => {
    updateFarmerPreferences({
      preferredLanguage: selectedLanguage,
      notifications
    });
  };

  const handleSaveProfileModal = (e) => {
    e.preventDefault();
    setFarmer(prev => ({
      ...prev,
      name: profileForm.name,
      village: profileForm.village,
      district: profileForm.district,
      phone: profileForm.phone,
      secondaryPhone: profileForm.secondaryPhone
    }));
    showToast('Farmer profile updated successfully!', 'success');
    setIsEditingProfile(false);
  };

  const handleAddParcelSubmit = (e) => {
    e.preventDefault();
    if (!newLand.name || !newLand.acres) {
      showToast('Please provide parcel name and acreage', 'danger');
      return;
    }
    addLandParcel({
      name: newLand.name,
      khasraNumber: newLand.khasraNumber || '10/5',
      acres: parseFloat(newLand.acres),
      currentCrop: newLand.currentCrop,
      soilType: 'Loamy Alluvial'
    });
    setNewLand({ name: '', khasraNumber: '', acres: '', currentCrop: 'Wheat' });
    setIsAddingLand(false);
  };

  return (
    <PageShell sidebarCollapsed={true} contentMaxWidth="760px">
      {/* Profile Header Block */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-card)',
        marginBottom: 'var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Avatar
            src={farmer.avatarUrl}
            name={farmer.name}
            size="lg"
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{farmer.name}</h2>
              <VoiceButton textToRead={`Farmer Profile: ${farmer.name}, ${farmer.village}, ${farmer.district}. ID: ${farmer.id}`} />
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {farmer.village}, {farmer.district}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600, marginTop: '2px' }}>
              ID: {farmer.id}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Edit2}
          onClick={() => {
            setProfileForm({
              name: farmer.name,
              village: farmer.village,
              district: farmer.district,
              phone: farmer.phone,
              secondaryPhone: farmer.secondaryPhone
            });
            setIsEditingProfile(true);
          }}
        >
          Edit Profile
        </Button>
      </div>

      {/* Column of 3 Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Card 1: Contact Info */}
        <Card
          title="Contact Info"
          icon={Phone}
          action={
            <button
              type="button"
              onClick={() => {
                setProfileForm({
                  name: farmer.name,
                  village: farmer.village,
                  district: farmer.district,
                  phone: farmer.phone,
                  secondaryPhone: farmer.secondaryPhone
                });
                setIsEditingProfile(true);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              title="Edit Contact"
            >
              <Edit2 size={15} />
            </button>
          }
          enableVoice
          voiceText={`Contact Information: Primary phone ${farmer.phone}, Secondary phone ${farmer.secondaryPhone}`}
        >
          <div className="grid-2">
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                Primary Phone
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {farmer.phone}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                Secondary Phone
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {farmer.secondaryPhone}
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2: My Land Parcels */}
        <Card
          title="My Land Parcels"
          icon={MapPinned}
          action={
            <button
              type="button"
              onClick={() => setIsAddingLand(!isAddingLand)}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={14} /> Add Land
            </button>
          }
          enableVoice
          voiceText={`My Land Parcels: ${farmer.landParcels.map(p => `${p.name}, ${p.acres} acres of ${p.currentCrop}, status ${p.status}`).join('. ')}`}
        >
          {isAddingLand && (
            <form onSubmit={handleAddParcelSubmit} style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border-dark)' }}>
              <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>Add New Land Parcel</h4>
              <div className="grid-2">
                <input
                  type="text"
                  placeholder="Parcel Name (e.g. South Canal Plot)"
                  value={newLand.name}
                  onChange={(e) => setNewLand({ ...newLand, name: e.target.value })}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Khasra Number (e.g. 18/4)"
                  value={newLand.khasraNumber}
                  onChange={(e) => setNewLand({ ...newLand, khasraNumber: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="grid-2" style={{ marginTop: '8px' }}>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Acres (e.g. 4.5)"
                  value={newLand.acres}
                  onChange={(e) => setNewLand({ ...newLand, acres: e.target.value })}
                  className="form-input"
                  required
                />
                <select
                  value={newLand.currentCrop}
                  onChange={(e) => setNewLand({ ...newLand, currentCrop: e.target.value })}
                  className="form-select"
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Paddy">Paddy</option>
                  <option value="Cotton">Cotton</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <Button variant="ghost" size="sm" onClick={() => setIsAddingLand(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Save Parcel</Button>
              </div>
            </form>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {farmer.landParcels.map((parcel) => (
              <div
                key={parcel.id}
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                    {parcel.name} <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(Khasra {parcel.khasraNumber})</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {parcel.acres} Acres · {parcel.currentCrop} (Current Crop)
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <Badge variant={parcel.status === 'VERIFIED' ? 'success' : 'warning'}>
                      {parcel.status === 'VERIFIED' ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                      {parcel.status}
                    </Badge>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => showToast(`Opening map bounds for ${parcel.name}`, 'info')}
                    className="topbar-icon-btn"
                    title="View on Map"
                  >
                    <Map size={16} />
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit2}
                    onClick={() => {
                      showToast(`Editing parcel ${parcel.name}`, 'info');
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 3: Preferences & Settings */}
        <Card
          title="Preferences & Settings"
          icon={Globe}
          enableVoice
          voiceText="Preferences and notification settings. Configure preferred language and alert subscriptions."
        >
          <Select
            label="Preferred Language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            options={[
              { value: 'English', label: 'English' },
              { value: 'हिंदी', label: 'हिंदी (Hindi)' },
              { value: 'ਪੰਜਾਬੀ', label: 'ਪੰਜਾਬੀ (Punjabi)' }
            ]}
            helperText="This will change the language for the entire application."
          />

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-4) 0' }} />

          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            NOTIFICATIONS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Toggle
              label="Weather Alerts"
              description="Urgent weather warnings for your area."
              checked={notifications.weatherAlerts}
              onChange={(checked) => setNotifications({ ...notifications, weatherAlerts: checked })}
            />

            <Toggle
              label="Market Price Updates"
              description="Daily summaries for your selected crops."
              checked={notifications.marketPriceUpdates}
              onChange={(checked) => setNotifications({ ...notifications, marketPriceUpdates: checked })}
            />

            <Toggle
              label="Scheme Recommendations"
              description="New government schemes applicable to you."
              checked={notifications.schemeRecommendations}
              onChange={(checked) => setNotifications({ ...notifications, schemeRecommendations: checked })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
            <Button
              variant="primary"
              icon={Save}
              onClick={handleSavePreferences}
            >
              Save Preferences
            </Button>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: 'var(--space-4)'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '480px',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-3)' }}>
              <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700 }}>Edit Farmer Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfileModal}>
              <Input
                label="Full Name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required
              />
              <div className="grid-2">
                <Input
                  label="Village"
                  value={profileForm.village}
                  onChange={(e) => setProfileForm({ ...profileForm, village: e.target.value })}
                />
                <Input
                  label="District"
                  value={profileForm.district}
                  onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                />
              </div>
              <div className="grid-2">
                <Input
                  label="Primary Phone"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
                <Input
                  label="Secondary Phone"
                  value={profileForm.secondaryPhone}
                  onChange={(e) => setProfileForm({ ...profileForm, secondaryPhone: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-5)' }}>
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
};
