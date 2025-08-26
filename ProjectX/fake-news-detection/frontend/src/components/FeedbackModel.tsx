import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { submitFeedback } from "../services/FeedbackService";
import { Fragment } from "react";
import { toast } from "react-toastify";  // required for Transition wrapper
import { useAuth } from "../context/AuthContext"; 

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  predictionId: string;
  initialRating?: number;
}

export default function FeedbackModel({
  isOpen,
  onClose,
  onSubmit,
  predictionId,
  initialRating = 0,
}: FeedbackModalProps) {
  // Call useAuth ONCE at the top
  const { user, isAuthenticated } = useAuth();
  console.log("FeedbackModal user from context:", user);

  const [stars, setStars] = useState<number>(initialRating);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("Modal mounted", { isOpen, predictionId });
  }, [isOpen, predictionId]);

  useEffect(() => {
    if (user) {
      setError(""); // clear any login error if user is now valid
    }
  }, [user]);

  // Early return if not logged in
  if (!isAuthenticated) {
    return (
      <div className="feedback-modal-panel">
        <h2>You must be logged in to submit feedback.</h2>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (stars < 1 || stars > 5) {
      setError("Please select a rating between 1 and 5.");
      return;
    }

    if (!predictionId || typeof predictionId !== "string") {
      setError("Invalid prediction ID.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      console.log("Sending feedback payload:", {
        analysis_id: predictionId,
        rating: stars,
      });

      await submitFeedback({
        analysis_id: predictionId,
        rating: stars,
      });

      onSubmit(stars);
      onClose();
      toast.success("Thanks for your feedback!");
    } catch (err: any) {
        // Log the full error response from the backend
        console.error("Feedback submission error:", err.response?.data);

      if (err.response?.status === 401) {
        setError("You must be logged in to submit feedback.");
      } else if (err.response?.status === 422) {
        setError("Invalid data sent. Please try again.");
      } else if (err.response?.data?.detail) {
        // Show the backend's error message to the user
        setError(err.response.data.detail);
      } else {
        setError("Failed to submit feedback. Please try again.");
      }
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-modal inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition-transform duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-transform duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="feedback-modal-panel">
              <DialogTitle className="modal-title">How was your experience?</DialogTitle>
              <Description className="modal-description">
                Your feedback helps improve our AI model
              </Description>
              <div className="feedback-stars">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`feedback-star-btn${stars >= star ? " selected" : ""}`}
                    onClick={() => setStars(star)}
                    aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                  >★</button>
                ))} 
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="modal-actions">
                <button className="btn btn-later" onClick={onClose}>Maybe Later</button>
                <button
                  className="btn btn-submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting || stars === 0}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}