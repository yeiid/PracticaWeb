import React, { useState } from 'react';
import styles from './HTMLSlides.module.css';

const HTMLQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const questions = [
    {
      question: "¿Qué significa HTML?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "High Tech Modern Language"
      ],
      correct: 0
    },
    {
      question: "¿Cuál es la etiqueta correcta para el título más importante?",
      options: ["<heading>", "<h6>", "<h1>", "<head>"],
      correct: 2
    },
    {
      question: "¿Cuál es el elemento correcto para insertar un salto de línea?",
      options: ["<break>", "<lb>", "<br>", "<next>"],
      correct: 2
    },
    {
      question: "¿Qué etiqueta se usa para crear un enlace?",
      options: ["<link>", "<a>", "<url>", "<href>"],
      correct: 1
    },
    {
      question: "En HTML5, ¿cuál es la etiqueta semántica para el contenido principal?",
      options: ["<content>", "<section>", "<div>", "<main>"],
      correct: 3
    }
  ];

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (showResults) {
    return (
      <div className={styles.quizResults}>
        <h2>🎯 ¡Examen Finalizado!</h2>
        <div className={styles.scoreCircle}>
          <svg viewBox="0 0 36 36" className={styles.circularChart}>
            <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className={styles.circle} strokeDasharray={`${(score / questions.length) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" className={styles.percentage}>{score}/{questions.length}</text>
          </svg>
        </div>
        <p className={styles.resultMessage}>
          {score === questions.length ? "¡Perfecto! Eres un maestro del HTML." : 
           score >= 3 ? "¡Muy bien! Tienes bases sólidas." : 
           "Sigue practicando, ¡tú puedes!"}
        </p>
        <button className={styles.resetBtn} onClick={resetQuiz}>Reintentar Examen</button>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <h3>Examen de HTML5</h3>
        <span className={styles.questionCounter}>Pregunta {currentQuestion + 1} de {questions.length}</span>
      </div>
      
      <div className={styles.progressLine}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className={styles.questionSection}>
        <p className={styles.questionText}>{questions[currentQuestion].question}</p>
        
        <div className={styles.optionsGrid}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`${styles.optionBtn} ${
                selectedAnswer === index 
                  ? index === questions[currentQuestion].correct 
                    ? styles.correct 
                    : styles.incorrect 
                  : ""
              } ${selectedAnswer !== null && index === questions[currentQuestion].correct ? styles.correct : ""}`}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
              {selectedAnswer === index && (
                <span className={styles.answerIcon}>
                  {index === questions[currentQuestion].correct ? "✓" : "✕"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HTMLQuiz;
