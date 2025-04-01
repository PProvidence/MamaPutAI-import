import { useState } from 'react';
import { ChevronLeft, XCircle, Check } from 'lucide-react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const emotions = [
    { id: 'great', label: 'Great', emoji: '😄', color: 'bg-green-200', border: 'border-green-500' },
    { id: 'good', label: 'Good', emoji: '🙂', color: 'bg-lime-200', border: 'border-lime-500' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'bg-yellow-100', border: 'border-yellow-500' },
    { id: 'bad', label: 'Bad', emoji: '🙁', color: 'bg-orange-100', border: 'border-orange-500' },
    { id: 'terrible', label: 'Terrible', emoji: '😞', color: 'bg-red-200', border: 'border-red-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!selectedEmotion) {
      setErrorMessage("Please select an emotion.");
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return;
    }
    if (!feedback.trim()) {
      setErrorMessage("Please provide feedback text.");
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return;
    }
    
    // Set submitting state
    setIsSubmitting(true);
    
    const feedbackData = { emotion: selectedEmotion, message: feedback };
    console.log('Submitting feedback:', feedbackData);
    // API call
    fetch('http://localhost:3005/feedback/store-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Feedback submitted successfully!', { emotion: selectedEmotion, message: feedback });        
        // Show success message
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          
          // Show the completion modal
          setShowModal(true);
          setTimeout(() => {
            // Reset form after showing modal
            setFeedback('');
            setSelectedEmotion(null);
            setShowModal(false);
          }, 2000);
        }, 1500);
      } else {
        // Handle server error
        console.error('Failed to submit feedback.');
        setErrorMessage("Server error. Please try again later.");
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 3000);
      }
    })
    .catch(error => {
      // Handle network error
      console.error('Error submitting feedback:', error);
      setErrorMessage("Network error. Please try again later.");
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="p-6 font-instrument-sans">
      <div className="flex items-center mb-6">
        <ChevronLeft className="mr-4 cursor-pointer hover:text-pryGreen" onClick={handleGoBack} />
        <h1 className="text-xl xl:text-2xl font-bold">Feedbacks</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        {/* Success message */}
        {showSuccessMessage && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-md transition-all">
            Feedback submitted successfully!
          </div>
        )}
        
        {/* Error message */}
        {showErrorMessage && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md transition-all">
            {errorMessage}
          </div>
        )}

        <h2 className="text-lg xl:text-xl font-semibold mb-4">Give us a feedback</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <p className="text-gray-600 mb-4">How do you feel?</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {emotions.map((emotion) => (
                <button
                  key={emotion.id}
                  type="button"
                  onClick={() => setSelectedEmotion(emotion.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                    selectedEmotion === emotion.id
                      ? `${emotion.color} border-2 ${emotion.border}`
                      : 'bg-gray-100 hover:bg-gray-200 transition-colors'
                  } aspect-square`}
                >
                  <span className="text-3xl mb-2">{emotion.emoji}</span>
                  <span className="text-sm text-center hidden- sm:block">{emotion.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-gray-700 font-medium mb-2"
            >
              Tell us more
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border-[#f5f5f5] bg-tertiaryGrey border rounded-lg focus:outline-green-500"
              rows="4"
              placeholder="Share your thoughts..."
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>

      {/* Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-500 w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Thank you for your feedback!
            </h2>
            <p className="text-gray-500 mt-2">
              Your input helps us improve our service.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;