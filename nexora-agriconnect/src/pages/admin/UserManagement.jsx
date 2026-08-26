import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit,
  ChevronLeft,
  ChevronRight,
  Shield,
  Tractor,
  ShoppingCart,
  UserCheck,
  X
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { Avatar } from '../../components/ui/Avatar';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const AdminUserManagement = () => {
  const { users, updateUserRole, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Users');
  const [editingUser, setEditingUser] = useState(null);
  const [selectedNewRole, setSelectedNewRole] = useState('Farmer');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'All Users' ||
        (roleFilter === 'Farmers' && user.role === 'Farmer') ||
        (roleFilter === 'Buyers' && user.role === 'Buyer');

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setSelectedNewRole(user.role);
  };

  const handleSaveRole = () => {
    if (editingUser) {
      updateUserRole(editingUser.id, selectedNewRole);
      setEditingUser(null);
    }
  };

  const columns = [
    {
      key: 'profile',
      header: 'User Profile',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Avatar name={row.name} initials={row.initials} size="sm" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{row.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{row.joinedText}</div>
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      header: 'Contact / Location',
      render: (row) => (
        <div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{row.contact}</div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{row.location}</div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Current Role',
      render: (row) => {
        let icon = Users;
        let variant = 'neutral';
        if (row.role === 'Farmer') {
          icon = Tractor;
          variant = 'success';
        } else if (row.role === 'Buyer') {
          icon = ShoppingCart;
          variant = 'info';
        } else if (row.role === 'Admin') {
          icon = Shield;
          variant = 'warning';
        }
        return <Badge variant={variant} icon={icon}>{row.role}</Badge>;
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.statusVariant || 'success'}>
          {row.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          icon={Edit}
          onClick={() => handleOpenEdit(row)}
        >
          Edit Role
        </Button>
      )
    }
  ];

  return (
    <PageShell title="User & Role Management">
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>User & Role Management</span>
            <VoiceButton textToRead="User and Role Management. Manage accounts, assign roles, and oversee community access across the platform." />
          </div>
          <span className="page-subtitle">Manage accounts, assign roles, and oversee community access across the platform.</span>
        </div>

        <div className="page-actions">
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => showToast('New User Registration modal simulation', 'info')}
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search by name, phone, or village…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['All Users', 'Farmers', 'Buyers'].map((pill) => (
            <button
              key={pill}
              type="button"
              className={`btn btn-sm ${roleFilter === pill ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setRoleFilter(pill)}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredUsers}
        keyField="id"
      />

      {/* Pagination Footer */}
      <div className="flex-between" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
        <div>
          Showing 1–{filteredUsers.length} of 156 users
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            className="topbar-icon-btn"
            style={{ width: '28px', height: '28px' }}
            disabled
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            className="topbar-icon-btn"
            style={{ width: '28px', height: '28px' }}
            onClick={() => showToast('Navigating to next page...', 'info')}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
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
            maxWidth: '440px',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-3)' }}>
              <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700 }}>Edit User Role</h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{editingUser.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{editingUser.contact} · {editingUser.location}</div>
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
              <label className="form-label">
                <span>Select New Role</span>
              </label>
              <select
                value={selectedNewRole}
                onChange={(e) => setSelectedNewRole(e.target.value)}
                className="form-select"
              >
                <option value="Farmer">Farmer (Cultivator & Seller)</option>
                <option value="Buyer">Buyer (Commercial Procurement)</option>
                <option value="Authority">Authority (Government / Inspector)</option>
                <option value="Admin">Administrator (Full Platform Control)</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveRole}>Save Role</Button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};
