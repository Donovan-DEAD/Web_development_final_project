"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import IAToast from "@/components/IAToast"; // Using the IAToast wrapper
import Image from 'next/image';

// Image imports
import CameraIcon from '../../../public/images/camera_icon.svg';
import UploadIcon from '../../../public/images/upload_icon.svg';
import ImageUploadAlreadyIcon from '../../../public/images/image_upload_already.svg';
import BulbIcon from '../../../public/images/bulb_icon.svg';

export default function IaAssistancePage() {
  const [context, setContext] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Placeholder for user data
  const username = null; // Or fetch from context/session
  const user = null; // Or fetch from context/session

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setToastMessage('La imagen excede el límite de 10MB.');
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
        return;
      }
      setImageFile(file);
      setToastMessage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setToastMessage(null); // Clear previous messages

    if (!context && !imageFile) {
      setToastMessage('Favor de proporcionar un contexto o una imagen.');
      return;
    }

    const formData = new FormData();
    if (context) {
      formData.append('context', context);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('/api/ai/consult', {
        method: 'POST',
        body: formData,
        // Next.js handles 'Content-Type': 'multipart/form-data' automatically with FormData
      });

      const data = await response.json();
      console.log('AI Consultation Response:', data);

      if (response.ok) {
        // Original EJS redirected to /ia-response and passed data via session.
        // Here, we can pass data via URL params or a global state, or simply redirect.
        // For simplicity, we'll store in sessionStorage and redirect.
        sessionStorage.setItem('iaResponseData', JSON.stringify(data));
        router.push('/ia-response');
      } else {
        setToastMessage(data.message || 'Hubo un error al procesar la solicitud.');
      }
    } catch (error) {
      console.error('Error submitting AI consultation:', error);
      setToastMessage('Error de red o del servidor. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
      {toastMessage && <IAToast message={toastMessage} severity="error" />}

      <main className="ai__assistance__main">
        <div className="ai_assistance__header__container">
          <h1 className="ai_assistance__header__title">Asesoría IA Agrícola</h1>
          <p className="ai_assistance__header__description">
            Sube una imagen de tu cultivo y obtén recomendaciones personalizadas
          </p>
        </div>
        <form id="ai-form" className="ai__assistance__form__container" onSubmit={handleSubmit}>
          <div className="ai__assistance__form__container__left">
            <p className="ai__assistance__form__container__left__title">
              <Image src={CameraIcon} alt="Camera Icon" width={30} height={30} />
              Imagen del cultivo
            </p>

            {!imageFile ? (
              <div id="upload-initial-state" className="ai__assistance__form__container__left__container">
                <Image className="ai__assistance__form__container__left__container__img" src={UploadIcon} alt="Upload Icon" width={40} height={40} />
                <h1 className="ai__assistance__form__container__left__container__title">
                  Sube una imagen de tu cultivo
                </h1>
                <p className="ai__assistance__form__container__left__container__description">
                  PNG, JPG hasta 10MB
                </p>
                <label htmlFor="image-upload" className="ai__assistance__form__container__left__container__button">
                  Seleccionar imagen
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  name="image"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </div>
            ) : (
              <div id="upload-finished-state" className="ai__assistance__form__container__left__container">
                <Image className="ai__assistance__form__container__left__container__img" src={ImageUploadAlreadyIcon} alt="Image Uploaded Icon" width={40} height={40} />
                <h1 id="file-name" className="ai__assistance__form__container__left__container__title">
                  {imageFile.name}
                </h1>
                <p className="ai__assistance__form__container__left__container__description">
                  PNG, JPG hasta 10MB
                </p>
                <label htmlFor="image-upload" className="ai__assistance__form__container__left__container__button">
                  Cambiar imagen
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  name="image"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </div>
            )}
          </div>

          <div className="ai__assistance__form__container__right">
            <p className="ai__assistance__form__container__right__title">Contexto de la situacion</p>
            <textarea
              id="context"
              className="ai__assistance__form__container__right__input"
              rows={4}
              cols={50}
              name="context"
              placeholder="Describe la situacion de tu cultivo: síntomas observados, condiciones climaticas, tipo de suelo, tratamientos previos..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            ></textarea>
            <button type="submit" className="ai__assistance__form__container__right__button">
              <Image className="ai__assistance__form__container__right__button__img" src={BulbIcon} alt="Bulb Icon" width={20} height={20} />
              Obtener Asesoría
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
