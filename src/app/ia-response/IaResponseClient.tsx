"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IAToast from "@/components/IAToast";
import Image from 'next/image';
import { Select, MenuItem, Button as MuiButton } from '@mui/material';

// Image imports
import ApproveIcon from '../../../public/images/approve_icon.svg';
import BulbIcon from '../../../public/images/bulb_icon.svg';
import DangerIcon from '../../../public/images/danger_icon.svg';

interface Technique {
  name: string;
  description: string;
}

interface GeminiResponseData {
  nivel_de_peligro: 'aprobado' | 'mejorable' | 'peligro';
  diagnostico: string;
  recomendations: string[];
  tecnicas_a_usar: Technique[];
  is_image_agricultural_related: boolean;
  is_context_agricultural_related: boolean;
}

export default function IaResponseClient() {
  const [iaResponseData, setIaResponseData] = useState<GeminiResponseData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTechniqueIndex, setSelectedTechniqueIndex] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedData = sessionStorage.getItem('iaResponseData');
    console.log('Stored Data:', storedData);

    if (storedData) {
      const data = JSON.parse(storedData);
      setIaResponseData(data);

      // Check for toast messages from the original EJS logic
      if (!data.is_image_agricultural_related && !data.is_context_agricultural_related) {
        setToastMessage("Favor de utilizar esta herramienta correctamente mandando información que tenga que ver con el tema por favor.");
      } else if (!data.is_image_agricultural_related) {
        setToastMessage("La imagen proporcionada no parece estar relacionada con la agricultura.");
      } else if (!data.is_context_agricultural_related) {
        setToastMessage("El contexto proporcionado no parece estar relacionado con la agricultura.");
      }
    } else {
      // If no data, show an error or redirect
      setToastMessage("No hay datos de análisis disponibles. Realiza un nuevo análisis.");
    }
  }, []);

  const getIconForNivel = (nivel: string) => {
    switch (nivel) {
      case 'aprobado': return ApproveIcon;
      case 'mejorable': return BulbIcon;
      case 'peligro': return DangerIcon;
      default: return BulbIcon;
    }
  };

  const currentTechnique = iaResponseData?.tecnicas_a_usar?.[selectedTechniqueIndex];

  return (
    <>
      {toastMessage && <IAToast message={toastMessage} severity="error" />}

      <main className="ia__response__main">
        {!iaResponseData ? (
          <div className="error-container">
            <h1>No hay datos para mostrar</h1>
            <MuiButton
              variant="contained"
              className="ia__response__new-analysis__button"
              onClick={() => router.push('/ia-assistance')}
            >
              Realizar un análisis
            </MuiButton>
          </div>
        ) : (
          <>
            <div className="ia__response__header">
              <h1 className="ai__response__header__title">Asesoría IA Agrícola</h1>
              <p className="ai__response__header__description">
                Sube una imagen de tu cultivo y obtén recomendaciones personalizadas
              </p>
            </div>

            <div className="ai__response__recomendations__container">
              <h1 className="ai__response__recomendations__title">
                <Image
                  className="ai__response__recomendations__icon"
                  src={getIconForNivel(iaResponseData.nivel_de_peligro)}
                  alt="Status Icon"
                  width={35}
                  height={35}
                />
                Análisis Completado
              </h1>

              <div className={`ai__response__recomendations__img__container ${iaResponseData.nivel_de_peligro}`}>
                <Image
                  className="ai__response__recomendations__img"
                  src={getIconForNivel(iaResponseData.nivel_de_peligro)}
                  alt="Status Icon"
                  width={65}
                  height={65}
                />
                <p className="ai__response__recomendations__img__description">
                  {iaResponseData.nivel_de_peligro === 'aprobado' && 'Todo esta en orden con los cultivos'}
                  {iaResponseData.nivel_de_peligro === 'mejorable' && 'Hay aspectos a mejorar en tu cultivo'}
                  {iaResponseData.nivel_de_peligro === 'peligro' && 'Tu cultivo podria estar en peligro'}
                </p>
              </div>

              <h1 className="ai__response__recomendations__diagnose__title">Diagnóstico</h1>
              <p className="ai__response__recomendations__diagnose__description">
                {iaResponseData.diagnostico}
              </p>
              <h1 className="ai__response__recomendations__recomendations__title">Recomendaciones principales</h1>
              <ol className="ai__response__recomendations__recomendations__list">
                {iaResponseData.recomendations.map((rec, index) => (
                  <li key={index} className="ai__response__recomendations__recomendations__list__item">
                    {rec}
                  </li>
                ))}
              </ol>
            </div>

            {iaResponseData.tecnicas_a_usar && iaResponseData.tecnicas_a_usar.length > 0 && (
              <div className="ai__response__techniques__container">
                <h1 className="ai__response__techniques__title">
                  <Image className="ai__response__techniques__icon" src={ApproveIcon} alt="Techniques Icon" width={24} height={24} />
                  Técnicas Recomendadas
                </h1>

                <Select
                  value={selectedTechniqueIndex.toString()}
                  onChange={(e) => setSelectedTechniqueIndex(Number(e.target.value))}
                  displayEmpty
                  className="ai__response__techniques__dropdown"
                  sx={{ width: '100%' }}
                >
                  {iaResponseData.tecnicas_a_usar.map((tech, index) => (
                    <MenuItem key={index} value={index}>
                      {tech.name}
                    </MenuItem>
                  ))}
                </Select>

                {currentTechnique && (
                  <div className="ai__response__techniques__card">
                    <div className="ai__response__techniques__card__info">
                      <h2 className="ai__response__techniques__card__title">{currentTechnique.name}</h2>
                      <p className="ai__response__techniques__card__description">{currentTechnique.description}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <MuiButton
              variant="contained"
              className="ia__response__new-analysis__button"
              onClick={() => router.push('/ia-assistance')}
            >
              Realizar nuevo análisis
            </MuiButton>
          </>
        )}
      </main>
    </>
  );
}
