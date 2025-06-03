// components/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
  faArrowLeft,
  faUser,
  faCog,
  faChevronRight,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Dashboard.css';
import './css/Profile.css';

const supabaseUrl = 'https://saigagigwcenxuwsqoir.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhaWdhZ2lnd2Nlbnh1d3Nxb2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTUzNDMsImV4cCI6MjA2MzM5MTM0M30.tSycjBx7fJKFd4boZRKghKr2LU-ToWa5Z_4IUa2VHJY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [editProfileData, setEditProfileData] = useState({});
  const [mode, setMode] = useState('view');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        navigate('/');
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error.message);
      } else {
        setUserProfile(data);
        setEditProfileData(data);
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error('User not authenticated');
      return;
    }

    const userId = session.user.id;
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${userId}.${fileExt}`;

    // Upload to Supabase Storage with upsert true (overwrite)
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      return;
    }

    // Get public URL with cache busting timestamp to force reload
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const avatarUrlWithTimestamp = `${publicUrl}?t=${new Date().getTime()}`;

    // Save avatar_url in users table
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: avatarUrlWithTimestamp })
      .eq('id', userId);

    if (updateError) {
      console.error('Avatar update error:', updateError.message);
    } else {
      setUserProfile((prev) => ({ ...prev, avatar_url: avatarUrlWithTimestamp }));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.error('User not authenticated');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('users')
      .update(editProfileData)
      .eq('id', session.user.id);

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      setUserProfile(editProfileData);
      setMode('view');
    }

    setLoading(false);
  };

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    const highlight = document.querySelector('.nav-highlight');

    navItems.forEach((item, index) => {
      item.classList.remove('active');
      if (index === 2) {
        item.classList.add('active');
        if (highlight) {
          highlight.style.left = `calc(${index * 33.33}% + 16.66% - 30px)`;
        }
      }

      item.onclick = () => {
        if (index === 0) navigate('/dashboard');
        else if (index === 1) navigate('/emergency');
        else if (index === 2) navigate('/profile');
      };
    });

    return () => {
      navItems.forEach((item) => (item.onclick = null));
    };
  }, [navigate]);

  return (
    <div className="profile-page-container">
      <header className={`header ${mode === 'edit' ? 'edit-header' : ''}`}>
        {mode === 'edit' && (
          <button
            className="back-button"
            onClick={() => {
              setMode('view');
              setEditProfileData({ ...userProfile });
            }}
            aria-label="Back"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <h1 className="page-title">{mode === 'edit' ? 'Edit Profile' : 'Profile'}</h1>
      </header>

      <main className="profile-main-content">
        {mode === 'view' ? (
          <>
            <div className="profile-picture-section">
              <label htmlFor="avatar-upload" className="profile-picture-wrapper" aria-label="Upload Profile Picture">
                <img
                  src={userProfile.avatar_url || 'https://via.placeholder.com/160'}
                  className="profile-picture"
                  alt="Profile"
                />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <div className="profile-name-bio">
                <h2 className="full-name">{userProfile.full_name}</h2>
                <p className="user-role"></p>
              </div>
            </div>

            <div style={{ width: '100%', marginTop: '1.5rem' }}>
              <div className="option-item" onClick={() => setMode('edit')}>
                <div className="option-left">
                  <FontAwesomeIcon icon={faUser} className="option-icon" />
                  <span>Edit Profile</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="option-arrow" />
              </div>

              <div className="option-item" onClick={() => navigate('/settings')}>
                <div className="option-left">
                  <FontAwesomeIcon icon={faCog} className="option-icon" />
                  <span>Settings</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="option-arrow" />
              </div>
            </div>

            <button className="sign-out-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="sign-out-icon" />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="editProfileHeading">
            <div className="modal">
              <h2 id="editProfileHeading">Edit Profile</h2>
              <form onSubmit={handleSaveProfile} className="edit-profile-form" noValidate>
                <input
                  type="text"
                  value={editProfileData.full_name || ''}
                  placeholder="Full Name"
                  onChange={(e) =>
                    setEditProfileData({
                      ...editProfileData,
                      full_name: e.target.value,
                    })
                  }
                  required
                  aria-label="Full Name"
                />

                <input
                  type="text"
                  value={editProfileData.phone_number || ''}
                  placeholder="Phone Number"
                  onChange={(e) =>
                    setEditProfileData({
                      ...editProfileData,
                      phone_number: e.target.value,
                    })
                  }
                  aria-label="Phone Number"
                />

                <input
                  type="email"
                  value={editProfileData.email || ''}
                  disabled
                  aria-label="Email"
                  className="disabled-input"
                />

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setMode('view')}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn save-btn" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <nav className="bottom-nav">
        <ul className="nav-list">
          <li className="nav-item"><i className="fas fa-home"></i></li>
          <li className="nav-item"><i className="fas fa-phone"></i></li>
          <li className="nav-item active"><i className="fas fa-user"></i></li>
          <div className="nav-highlight"></div>
        </ul>
      </nav>
    </div>
  );
};

export default Profile;
