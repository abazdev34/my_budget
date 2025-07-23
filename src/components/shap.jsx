
import React, { useState, useRef } from 'react';
import { Camera, Phone, Instagram, User, Upload, Download, Share, X } from 'lucide-react';
import Sho from '../assets/Sho.jpg'
const ElectronicBusinessCard = () => {
  const [profileImage, setProfileImage] = useState(Sho);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Файл типин текшерүү
      if (!file.type.startsWith('image/')) {
        alert('Сураныч, сүрөт файлын тандаңыз!');
        return;
      }
      
      // Файл өлчөмүн текшерүү (5MB максимум)
      if (file.size > 5 * 1024 * 1024) {
        alert('Сүрөт өлчөмү 5MB дан кичине болушу керек!');
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setIsUploading(false);
      };
      
      reader.onerror = () => {
        alert('Сүрөт жүктөөдө ката кетти!');
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  const downloadCard = async () => {
    try {
      // Визитканы canvas форматында жасап алуу (жөнөкөйлөштүрүлгөн версия)
      const cardData = {
        name: 'Макешов Шабдан',
        phone: '+7 977 323 04 49',
        instagram: '@shabdan_makeshov',
        image: profileImage
      };
      
      // JSON форматында жүктөө
      const dataStr = JSON.stringify(cardData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'shabdan_business_card.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
    } catch (error) {
      alert('Жүктөөдө ката кетти!');
    }
  };

  const shareCard = async () => {
    const shareData = {
      title: 'Макешов Шабдан - Визитка',
      text: 'Макешов Шабдан менен байланышуу үчүн: +7 977 323 04 49',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `Макешов Шабдан\nТелефон: +7 977 323 04 49\nInstagram: @shabdan_makeshov`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Маалымат көчүрүлдү!');
    }).catch(() => {
      alert('Көчүрүүдө ката кетти!');
    });
  };

  return (
    <div className="business-card-container">
      {/* Google Fonts жүктөө */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Анимацияланган фон элементтери */}
      <div className="background-animations">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <div className="business-card">
        {/* Негизги карта */}
        <div className="card-main">
          
          {/* Профиль бөлүмү */}
          <div className="profile-section">
            <div className="profile-image-container">
              <div className="profile-image-wrapper">
                <div className="profile-image-inner">
                  {profileImage ? (
                    <>
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-image"
                      />
                      <button
                        onClick={removeImage}
                        className="remove-image-btn"
                        title="Сүрөттү алып салуу"
                      >
                        <X className="icon-sm" />
                      </button>
                    </>
                  ) : (
                    <div className="profile-placeholder">
                      <User className="user-icon" />
                      {isUploading && (
                        <div className="upload-spinner"></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Камера баскычы */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="camera-button"
                disabled={isUploading}
                title="Сүрөт жүктөө"
              >
                <Camera className="camera-icon" />
                {isUploading && <div className="button-spinner"></div>}
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
            </div>
            
            <h1 className="profile-name">
MAKESHOV SHABDAN
            </h1>
            <div className="name-divider"></div>
          </div>

          {/* Байланыш маалыматы */}
          <div className="contact-section">
            
            {/* Телефон */}
            <div className="contact-item phone-item">
              <div className="contact-icon phone-icon">
                <Phone className="icon" />
              </div>
              <div className="contact-info">
                <p className="contact-label">Телефон</p>
                <a 
                  href="tel:+79773230449" 
                  className="contact-value phone-link"
                >
                  +7 977 323 04 49
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="contact-item instagram-item">
              <div className="contact-icon instagram-icon">
                <Instagram className="icon" />
              </div>
              <div className="contact-info">
                <p className="contact-label">Instagram</p>
                <a 
                  href="https://instagram.com/shabdan_makeshov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-value instagram-link"
                >
                  @shabdan_makeshov
                </a>
              </div>
            </div>
          </div>

          {/* Аракет баскычтары */}
          <div className="action-buttons">
            <button
              onClick={downloadCard}
              className="action-btn download-btn"
            >
              <Download className="btn-icon" />
              <span>Жүктөө</span>
            </button>
            
            <button
              onClick={shareCard}
              className="action-btn share-btn"
            >
              <Share className="btn-icon" />
              <span>Бөлүшүү</span>
            </button>
          </div>
        </div>

        {/* Жүктөө көрсөтмөсү */}
        <div className="upload-instructions">
          <p className="instruction-text">
            <Upload className="upload-icon" />
            <span>Сүрөтүңүздү жүктөө үчүн камера белгисине басыңыз</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Montserrat шрифтин колдонуу */
        * {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .business-card-container {
          min-height: 100vh;
          background: linear-gradient(135deg, 
            #0f0f23 0%, 
            #1a0b3d 25%, 
            #2d1b4e 50%, 
            #1a0b3d 75%, 
            #0f0f23 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        .background-animations {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: multiply;
          filter: blur(40px);
          opacity: 0.3;
          animation: float 8s infinite ease-in-out;
        }

        .blob-1 {
          top: -10%;
          right: -10%;
          width: 20rem;
          height: 20rem;
          background: linear-gradient(45deg, #8b5cf6, #a855f7);
          animation-delay: 0s;
        }

        .blob-2 {
          bottom: -10%;
          left: -10%;
          width: 24rem;
          height: 24rem;
          background: linear-gradient(45deg, #3b82f6, #6366f1);
          animation-delay: 3s;
        }

        .blob-3 {
          top: 20%;
          left: 20%;
          width: 16rem;
          height: 16rem;
          background: linear-gradient(45deg, #ec4899, #f43f5e);
          animation-delay: 6s;
        }

        .floating-particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: particleFloat 12s infinite linear;
        }

        .particle:nth-child(odd) {
          width: 4px;
          height: 4px;
        }

        .particle:nth-child(even) {
          width: 6px;
          height: 6px;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-15px, 20px) scale(0.9);
          }
          75% {
            transform: translate(25px, 10px) scale(1.05);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }

        ${[...Array(20)].map((_, i) => `
          .particle-${i + 1} {
            left: ${(i * 5) % 100}%;
            animation-delay: ${i * 0.6}s;
          }
        `).join('')}

        .business-card {
          position: relative;
          z-index: 10;
          max-width: 28rem;
          width: 100%;
        }

        .card-main {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border-radius: 2rem;
          padding: 2.5rem 2rem;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }

        .card-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s ease;
        }

        .card-main:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 32px 64px -12px rgba(139, 92, 246, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .card-main:hover::before {
          left: 100%;
        }

        .profile-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .profile-image-container {
          position: relative;
          display: inline-block;
          margin-bottom: 2rem;
        }

        .profile-image-wrapper {
          width: 8.5rem;
          height: 8.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          padding: 3px;
          box-shadow: 
            0 10px 25px rgba(139, 92, 246, 0.4),
            0 0 20px rgba(236, 72, 153, 0.2);
          animation: profileGlow 3s ease-in-out infinite alternate;
        }

        @keyframes profileGlow {
          0% {
            box-shadow: 
              0 10px 25px rgba(139, 92, 246, 0.4),
              0 0 20px rgba(236, 72, 153, 0.2);
          }
          100% {
            box-shadow: 
              0 15px 35px rgba(139, 92, 246, 0.6),
              0 0 30px rgba(236, 72, 153, 0.4);
          }
        }

        .profile-image-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .profile-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .user-icon {
          width: 4rem;
          height: 4rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .upload-spinner {
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          border-top: 2px solid #8b5cf6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .remove-image-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          border: none;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        .remove-image-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .icon-sm {
          width: 1rem;
          height: 1rem;
          color: white;
        }

        .camera-button {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          border: none;
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
          position: relative;
          overflow: hidden;
        }

        .camera-button:hover {
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          transform: scale(1.1) rotate(12deg);
          box-shadow: 0 12px 30px rgba(139, 92, 246, 0.6);
        }

        .camera-button:active {
          transform: scale(0.95);
        }

        .camera-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .camera-icon {
          width: 1.2rem;
          height: 1.2rem;
          color: white;
          transition: transform 0.3s ease;
        }

        .button-spinner {
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .file-input {
          display: none;
        }

        .profile-name {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff, #e5e7eb);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s ease;
          text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
        }

        .card-main:hover .profile-name {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .name-divider {
          height: 4px;
          width: 5rem;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          border-radius: 2px;
          margin: 0 auto;
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.4);
        }

        .contact-section {
          space-y: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .contact-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transition: left 0.5s ease;
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateX(8px);
        }

        .contact-item:hover::before {
          left: 100%;
        }

        .contact-icon {
          padding: 0.75rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .phone-icon {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .instagram-icon {
          background: rgba(236, 72, 153, 0.2);
          color: #ec4899;
        }

        .contact-item:hover .contact-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .contact-info {
          flex: 1;
        }

        .contact-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .contact-value {
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .phone-link:hover {
          color: #22c55e;
        }

        .instagram-link:hover {
          color: #ec4899;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 2.5rem;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          border: none;
          border-radius: 0.875rem;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .action-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .download-btn {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
        }

        .download-btn:hover {
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(139, 92, 246, 0.5);
        }

        .share-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .share-btn:hover {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.5);
        }

        .action-btn:hover::before {
          left: 100%;
        }

        .action-btn:active {
          transform: scale(0.95);
        }

        .btn-icon {
          width: 1.1rem;
          height: 1.1rem;
        }

        .upload-instructions {
          text-align: center;
          margin-top: 1.5rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .instruction-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .upload-icon {
          width: 1rem;
          height: 1rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Адаптивдүүлүк */
        @media (max-width: 640px) {
          .business-card-container {
            padding: 0.5rem;
          }

          .card-main {
            padding: 2rem 1.5rem;
          }

          .profile-name {
            font-size: 1.75rem;
          }

          .contact-item {
            padding: 1rem;
          }

          .action-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        /* Арнайы скроллбар */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  );
};

export default ElectronicBusinessCard;