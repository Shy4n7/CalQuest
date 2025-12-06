import { useState, useEffect } from 'react';
import StarfieldBackground from './components/StarfieldBackground';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LessonSelector from './components/LessonSelector';
import ConceptIntro from './components/ConceptIntro';
import SlopeVisualizer from './components/visualizers/SlopeVisualizer';
import IntegralVisualizer from './components/visualizers/IntegralVisualizer';
import LimitVisualizer from './components/visualizers/LimitVisualizer';
import OrbitalMechanicsVisualizer from './components/visualizers/OrbitalMechanicsVisualizer';
import EscapeVelocityVisualizer from './components/visualizers/EscapeVelocityVisualizer';
import Quiz from './components/Quiz';
import QuizComplete from './components/QuizComplete';
import Leaderboard from './components/Leaderboard';
// Astrophysics components - Using 2D versions for compatibility
import CosmicCalculator from './components/astrophysics/CosmicCalculator';
import AstrophysicsHub from './components/astrophysics/AstrophysicsHub';
import GravityWells2D from './components/astrophysics/GravityWells2D';
import BlackHole2D from './components/astrophysics/BlackHole2D';
import { getRandomQuestions } from './utils/quizData';
import useAuthStore from './store/authStore';
import useLessonStore from './store/lessonStore';
import './App.css';

function App() {
    console.log('App component rendering...');
    const [currentView, setCurrentView] = useState('dashboard');
    const [currentModule, setCurrentModule] = useState(null);
    const [lessonStep, setLessonStep] = useState('intro'); // intro, visualizer, quiz, complete
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizResults, setQuizResults] = useState(null);

    const { checkAuth, isAuthenticated } = useAuthStore();
    const { fetchLessons } = useLessonStore();

    // Check auth status on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                await checkAuth();
                if (isAuthenticated) {
                    await fetchLessons();
                }
            } catch (error) {
                console.log('Auth check failed, continuing without authentication:', error);
            }
        };
        initAuth();
    }, []);

    const handleStartLesson = (moduleId) => {
        setCurrentModule(moduleId)
        setLessonStep('intro')
        setCurrentView('lesson')
    }

    const handleConceptNext = () => {
        setLessonStep('visualizer')
    }

    const handleVisualizerNext = () => {
        const questions = getRandomQuestions(currentModule, 5)
        setQuizQuestions(questions)
        setLessonStep('quiz')
    }

    const handleQuizComplete = (results) => {
        setQuizResults(results)
        setLessonStep('complete')
    }

    const handleContinue = () => {
        setCurrentView('dashboard')
        setCurrentModule(null)
        setLessonStep('intro')
        setQuizResults(null)
    }

    const renderLessonContent = () => {
        if (lessonStep === 'intro') {
            return <ConceptIntro concept={currentModule} onNext={handleConceptNext} />
        }

        if (lessonStep === 'visualizer') {
            return (
                <div className="space-y-8">
                    {currentModule === 'derivatives' && <SlopeVisualizer />}
                    {currentModule === 'integrals' && <IntegralVisualizer />}
                    {currentModule === 'limits' && <LimitVisualizer />}
                    {currentModule === 'orbital-mechanics' && <OrbitalMechanicsVisualizer />}
                    {currentModule === 'escape-velocity' && <EscapeVelocityVisualizer />}
                    {currentModule === 'gravitational-acceleration' && <OrbitalMechanicsVisualizer />}
                    {currentModule === 'light-spectra' && <IntegralVisualizer />}

                    <div className="flex justify-center">
                        <button
                            onClick={handleVisualizerNext}
                            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                        >
                            Ready for Quiz! →
                        </button>
                    </div>
                </div>
            )
        }

        if (lessonStep === 'quiz') {
            return (
                <Quiz
                    questions={quizQuestions}
                    onComplete={handleQuizComplete}
                    moduleId={currentModule}
                />
            )
        }

        if (lessonStep === 'complete') {
            return <QuizComplete results={quizResults} onContinue={handleContinue} />
        }
    }

    return (
        <>
            <StarfieldBackground />
            <div className="min-h-screen relative">
                <Header onNavigate={setCurrentView} />
                <main className="container mx-auto px-4 py-8">
                    {currentView === 'dashboard' && (
                        <Dashboard onNavigate={setCurrentView} onStartLesson={handleStartLesson} />
                    )}
                    {currentView === 'lessons' && (
                        <LessonSelector onNavigate={setCurrentView} onStartLesson={handleStartLesson} />
                    )}
                    {currentView === 'leaderboard' && (
                        <Leaderboard onNavigate={setCurrentView} />
                    )}
                    {currentView === 'cosmic-calculator' && (
                        <CosmicCalculator onNavigate={setCurrentView} />
                    )}
                    {currentView === 'astrophysics-hub' && (
                        <AstrophysicsHub onNavigate={setCurrentView} />
                    )}
                    {currentView === 'gravity-wells' && (
                        <GravityWells2D onNavigate={setCurrentView} />
                    )}
                    {currentView === 'black-hole' && (
                        <BlackHole2D onNavigate={setCurrentView} />
                    )}
                    {currentView === 'lesson' && renderLessonContent()}
                </main>
            </div>
        </>
    )
}

export default App
