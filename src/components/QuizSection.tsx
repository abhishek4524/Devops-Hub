import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

const questions = [
  {
    question: "What does CI/CD stand for?",
    options: [
      "Continuous Integration / Continuous Deployment",
      "Code Integration / Code Deployment",
      "Continuous Infrastructure / Cloud Deployment",
      "Container Integration / Container Deployment",
    ],
    correct: 0,
    explanation: "CI/CD stands for Continuous Integration and Continuous Deployment (or Delivery). CI automates building and testing code on every commit, while CD automates releasing validated code to production.",
  },
  {
    question: "Which Kubernetes object is the smallest deployable unit?",
    options: ["Deployment", "ReplicaSet", "Pod", "Container"],
    correct: 2,
    explanation: "A Pod is the smallest deployable unit in Kubernetes. It wraps one or more containers that share network and storage. Containers run inside Pods.",
  },
  {
    question: "In the cloud service model, which provides the MOST control to the user?",
    options: ["SaaS", "PaaS", "IaaS", "FaaS"],
    correct: 2,
    explanation: "IaaS (Infrastructure as a Service) gives you the most control — you manage the OS, runtime, middleware, and applications. SaaS gives the least control since the vendor manages everything.",
  },
  {
    question: "What does the 'docker compose up' command do?",
    options: [
      "Builds a Docker image from a Dockerfile",
      "Starts all services defined in docker-compose.yml",
      "Pulls the latest version of all images",
      "Uploads a container to Docker Hub",
    ],
    correct: 1,
    explanation: "'docker compose up' reads the docker-compose.yml file and creates and starts all the defined services (containers). Adding -d runs them in detached (background) mode.",
  },
  {
    question: "What is the purpose of Terraform's 'terraform plan' command?",
    options: [
      "Creates a new Terraform project",
      "Applies changes to your infrastructure immediately",
      "Shows what changes will be made without applying them",
      "Destroys all resources managed by Terraform",
    ],
    correct: 2,
    explanation: "'terraform plan' is a dry-run that shows you exactly what changes Terraform will make to your infrastructure before actually applying them. It's a critical safety step before 'terraform apply'.",
  },
];

export default function QuizSection() {
  const [selected, setSelected] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const handleSelect = (qIndex: number, oIndex: number) => {
    if (submitted) return;
    const next = [...selected];
    next[qIndex] = oIndex;
    setSelected(next);
  };

  const handleSubmit = () => {
    if (selected.some(s => s === null)) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(new Array(questions.length).fill(null));
    setSubmitted(false);
    setCurrentQ(0);
  };

  const score = submitted ? selected.filter((s, i) => s === questions[i].correct).length : 0;
  const allAnswered = selected.every(s => s !== null);

  const scoreColor = score >= 4 ? "text-green-500" : score >= 3 ? "text-yellow-500" : "text-red-500";
  const scoreBg = score >= 4 ? "bg-green-500/10 border-green-500/20" : score >= 3 ? "bg-yellow-500/10 border-yellow-500/20" : "bg-red-500/10 border-red-500/20";
  const scoreMsg = score === 5 ? "Perfect score! You're a DevOps pro!" : score >= 4 ? "Great job! Just one slip." : score >= 3 ? "Good effort — review the explanations!" : "Keep learning — you'll get there!";

  return (
    <section>
      <SectionHeader
        id="quiz"
        icon="🧩"
        title="Knowledge Check Quiz"
        subtitle="Test what you've learned with 5 multiple-choice questions covering DevOps and cloud computing fundamentals."
      />

      {submitted && (
        <div className={`mb-8 rounded-xl border p-6 text-center ${scoreBg}`}>
          <div className={`text-5xl font-extrabold mb-2 ${scoreColor}`}>{score}/5</div>
          <div className="text-lg font-semibold text-foreground mb-1">{scoreMsg}</div>
          <div className="text-sm text-muted-foreground mb-4">Review the explanations below to reinforce your understanding.</div>
          <button
            onClick={handleReset}
            data-testid="btn-quiz-retry"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            data-testid={`btn-quiz-q${i + 1}`}
            className={`shrink-0 w-9 h-9 rounded-full text-sm font-semibold transition-all ${
              currentQ === i
                ? "bg-primary text-white"
                : submitted
                  ? selected[i] === questions[i].correct
                    ? "bg-green-500/20 text-green-600 border border-green-500/30"
                    : "bg-red-500/20 text-red-600 border border-red-500/30"
                  : selected[i] !== null
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className={`${qIndex === currentQ ? "block" : "hidden"}`}
          data-testid={`quiz-question-${qIndex + 1}`}
        >
          <div className="bg-card border border-border rounded-xl p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-foreground text-lg leading-snug pr-4">{q.question}</h3>
              <span className="shrink-0 text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
                Q{qIndex + 1}/5
              </span>
            </div>

            <div className="space-y-2.5">
              {q.options.map((option, oIndex) => {
                const isSelected = selected[qIndex] === oIndex;
                const isCorrect = oIndex === q.correct;
                let optClass = "bg-muted/50 border border-border text-foreground";

                if (submitted) {
                  if (isCorrect) optClass = "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400";
                  else if (isSelected && !isCorrect) optClass = "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400";
                  else optClass = "bg-muted/30 border border-border text-muted-foreground";
                } else if (isSelected) {
                  optClass = "bg-primary/10 border-primary text-foreground";
                }

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelect(qIndex, oIndex)}
                    data-testid={`quiz-option-q${qIndex + 1}-o${oIndex + 1}`}
                    className={`quiz-option w-full text-left px-4 py-3 rounded-lg border flex items-center gap-3 transition-all ${optClass} ${submitted ? "cursor-default" : "hover:bg-muted"}`}
                  >
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      submitted && isCorrect ? "bg-green-500 text-white" :
                      submitted && isSelected && !isCorrect ? "bg-red-500 text-white" :
                      isSelected ? "bg-primary text-white" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {submitted && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                       submitted && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                       String.fromCharCode(65 + oIndex)}
                    </div>
                    <span className="text-sm">{option}</span>
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <div>
                    <div className="font-semibold text-sm text-foreground mb-1">Explanation</div>
                    <p className="text-sm text-muted-foreground">{q.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-3">
            <button
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            {currentQ < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all"
              >
                Next Question
              </button>
            ) : !submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                data-testid="btn-quiz-submit"
                className="px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {allAnswered ? "Submit Quiz" : `Answer all (${selected.filter(s => s !== null).length}/5)`}
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </section>
  );
}
