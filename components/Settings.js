// components/Settings.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationArrow, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './css/Settings.css';

const Settings = () => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [bluetoothConnected, setBluetoothConnected] = useState(false);

  const navigate = useNavigate();

  const handleLocationPermission = () => {
    Swal.fire({
      title: 'Allow Location Access?',
      text: 'Allow SafeMet to access your location?',
      icon: 'question',
      background: '#fff',
      color: '#1f324a',
      showCancelButton: true,
      confirmButtonColor: '#1f324a',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Allow',
      cancelButtonText: 'Deny',
      customClass: {
        popup: 'swal2-border-radius',
        confirmButton: 'swal2-confirm-button',
        cancelButton: 'swal2-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setLocationAllowed(true);
        Swal.fire({
          title: 'Location Enabled!',
          icon: 'success',
          background: '#fff',
          color: '#1f324a',
          confirmButtonColor: '#1f324a',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'swal2-border-radius',
            confirmButton: 'swal2-confirm-button'
          }
        });
      } else {
        setLocationAllowed(false);
      }
    });
  };

  const handleSyncPermission = () => {
    Swal.fire({
      title: 'Sync to My Number?',
      text: 'Allow SafeMet to sync your number?',
      icon: 'question',
      background: '#fff',
      color: '#1f324a',
      showCancelButton: true,
      confirmButtonColor: '#1f324a',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Allow',
      cancelButtonText: 'Deny',
      customClass: {
        popup: 'swal2-border-radius',
        confirmButton: 'swal2-confirm-button',
        cancelButton: 'swal2-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setSyncEnabled(true);
        Swal.fire({
          title: 'Number Synced!',
          icon: 'success',
          background: '#fff',
          color: '#1f324a',
          confirmButtonColor: '#1f324a',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'swal2-border-radius',
            confirmButton: 'swal2-confirm-button'
          }
        });
      } else {
        setSyncEnabled(false);
      }
    });
  };

  const handleBluetoothToggle = () => {
    const newStatus = !bluetoothConnected;
    setBluetoothConnected(newStatus);

    Swal.fire({
      title: newStatus ? 'Bluetooth Connected!' : 'Bluetooth Disconnected!',
      icon: newStatus ? 'success' : 'info',
      background: '#fff',
      color: '#1f324a',
      confirmButtonColor: '#1f324a',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'swal2-border-radius',
        confirmButton: 'swal2-confirm-button'
      }
    });
  };

  return (
    <div className="settings-page">
     <header className="settings-header">
  <button className="back-button" onClick={() => navigate('/profile')}>
    <FontAwesomeIcon icon={faArrowLeft} />
  </button>
  <h1 className="settings-title">Settings</h1>
</header>


      <div className="settings-container">
        <div className="setting-item" onClick={handleLocationPermission}>
          <FontAwesomeIcon icon={faLocationArrow} className="setting-icon" />
          <span>Location</span>
          <div className={`toggle-indicator ${locationAllowed ? 'on' : 'off'}`}>
            {locationAllowed ? 'Allowed' : 'Denied'}
          </div>
        </div>

        <div className="setting-item" onClick={handleSyncPermission}>
          <FontAwesomeIcon icon={faMobileAlt} className="setting-icon" />
          <span>Sync to My Number</span>
          <div className={`toggle-indicator ${syncEnabled ? 'on' : 'off'}`}>
            {syncEnabled ? 'Allowed' : 'Denied'}
          </div>
        </div>

        <div className="setting-item">
          <FontAwesomeIcon icon={faBluetooth} className="setting-icon" />
          <span>Bluetooth Device</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={bluetoothConnected}
              onChange={handleBluetoothToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
