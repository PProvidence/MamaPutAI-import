import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(null);

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
      alert('Please select an emotion.');
      return;
    }
    if (!feedback.trim()) {
      alert('Please provide feedback.');
      return;
    }
    // Handle form submission logic here
    console.log('Submitting feedback:', { emotion: selectedEmotion, message: feedback });

    // Later Remove simulation to Handle form submission logic here - The following block should ONLY run when you have a working backend.
    // Start Simulation Block
    // console.log('Simulated feedback submission:', { emotion: selectedEmotion, message: feedback });
    // setFeedback('');
    // setSelectedEmotion(null);
    // alert('Feedback submitted successfully!');
    //End Simulation Block

    
    //Commented out fetch because no backend endpoint is available yet

    fetch('http://localhost:3005/feedback/store-feedback', { // Replace '/api/feedback' with your actual API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emotion: selectedEmotion, message: feedback }),
    })
    .then(response => {
      if (response.ok) {
        // Handle success (e.g., show a thank you message)
        console.log('Feedback submitted successfully!');
        setFeedback('');  // Clear the form
        setSelectedEmotion(null);
        alert('Feedback submitted successfully!'); // Move success message here
      } else {
        // Handle error (e.g., show an error message)
        console.error('Failed to submit feedback.');
        alert('Failed to submit feedback. Please try again.'); // Inform the user
      }
    })
    .catch(error => {
      // Handle network error
      console.error('Error submitting feedback:', error);
      alert('Network error. Please try again.');
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
                  } aspect-square`} // Make it square
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
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            disabled={!selectedEmotion}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
