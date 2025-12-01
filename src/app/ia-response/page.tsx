import React from 'react';
import { getCurrentUser } from '@/lib/server-auth';
import Footer from '@/components/Footer';
import ClientNavbar from '@/components/ClientNavbar';
import IaResponseClient from './IaResponseClient';

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

export default function IaResponsePage() {
  const [iaResponseData, setIaResponseData] = useState<GeminiResponseData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTechniqueIndex, setSelectedTechniqueIndex] = useState<number>(0);
  const router = useRouter();

  // Placeholder for user data
  const username = null; // Or fetch from context/session
  const user = null; // Or fetch from context/session

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedData = sessionStorage.getItem('iaResponseData');

    if (storedData) {
      const data = JSON.parse(storedData);
      setIaResponseData(data);

      // Check for toast messages from the original EJS logic
      if (!data.is_image_agricultural_related && !data.is_context_agricultural_related) {
        setToastMessage("Please use this tool correctly by sending information related to the topic.");
      } else if (!data.is_image_agricultural_related) {
        setToastMessage("The provided image does not seem to be related to agriculture.");
      } else if (!data.is_context_agricultural_related) {
        setToastMessage("The provided context does not seem to be related to agriculture.");
      }
    } else {
      // If no data, show an error or redirect
      setToastMessage("No analysis data available. Please perform a new analysis.");
    }
  }, []);

  const getIconForNivel = (nivel: string) => {
    switch (nivel) {
      case 'aprobado': return ApproveIcon;
      case 'mejorable': return BulbIcon;
      case 'peligro': return DangerIcon;
      default: return BulbIcon; // Default or a generic icon
    }
  };

  const currentTechnique = iaResponseData?.tecnicas_a_usar?.[selectedTechniqueIndex];
export default async function IaResponsePage() {
  const user = await getCurrentUser();

  return (
    <>
      {toastMessage && <IAToast message={toastMessage} severity="error" />}

      <main className="ia__response__main">
        {!iaResponseData ? (
          <div className="error-container">
            <h1>No data to display</h1>
            <MuiButton
              variant="contained"
              className="ia__response__new-analysis__button"
              onClick={() => router.push('/ia-assistance')}
            >
              Perform an analysis
            </MuiButton>
          </div>
        ) : (
          <>
            <div className="ia__response__header">
              <h1 className="ai__response__header__title">Agricultural AI Advisory</h1>
              <p className="ai__response__header__description">
                Upload an image of your crop and get personalized recommendations
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
                Analysis Completed
              </h1>

              <div className={`ai__response__recomendations__img__container ${iaResponseData.nivel_de_peligro}`}>
                <Image
                  className="ai__response__recomendations__img"
                  src={getIconForNivel(iaResponseData.nivel_de_peligro)}
                  alt="Status Icon"
                  width={65}
                  height={65} // Example size
                />
                <p className="ai__response__recomendations__img__description">
                  {iaResponseData.nivel_de_peligro === 'aprobado' && 'Everything is in order with the crops'}
                  {iaResponseData.nivel_de_peligro === 'mejorable' && 'There are aspects to improve in your crop'}
                  {iaResponseData.nivel_de_peligro === 'peligro' && 'Your crop could be in danger'}
                </p>
              </div>

              <h1 className="ai__response__recomendations__diagnose__title">Diagnosis</h1>
              <p className="ai__response__recomendations__diagnose__description">
                {iaResponseData.diagnostico}
              </p>
              <h1 className="ai__response__recomendations__recomendations__title">Main Recommendations</h1>
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
                  Recommended Techniques
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
                    {/* Placeholder image, consider dynamically loading from backend or a fixed asset */}
                    {/* <Image
                      className="ai__response__techniques__card__image"
                      src="https://imgs.search.brave.com/Uu8MohpWol1dISkBpUpDv59wGFNiEQIad1C6uQb7bVc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA4/MjAxODgxL2VzL2Zv/dG8vbWFyaXF1aXRh/LWVzY2FsYWRhLWVu/LWxhLWZsb3ItYW1h/cmlsbGEuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPU51TWot/ZXUzcW5CeGExM1hW/c20yYzk3MXl4RVU1/d1hTM1FfbkNjclNv/REU9"
                      alt="Técnica recomendada"
                      width={150}
                      height={150}
                    /> */}
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
              Perform new analysis
            </MuiButton>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
