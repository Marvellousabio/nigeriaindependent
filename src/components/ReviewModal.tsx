"use client";

import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitorId: string;
}

const ReviewModal = ({ isOpen, onClose, visitorId }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [story, setStory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId,
          rating,
          review,
          story,
        }),
      });

      if (response.ok) {
        alert('Thank you for your review! Your feedback helps us improve.');
        onClose();
        // Reset form
        setRating(0);
        setReview('');
        setStory('');
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Share Your Experience</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200"
            title="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">
            We'd love to hear about your experience exploring Nigeria's culture and heritage!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience? *
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={`${
                        star <= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      } hover:text-yellow-400`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review *
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Tell us what you thought about your experience..."
              />
            </div>

            {/* Story */}
            <div>
              <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                Your Story (Optional)
              </label>
              <textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Share your personal story or memorable moments..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || rating === 0 || !review.trim()}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Your feedback helps us improve and helps other visitors discover Nigeria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;