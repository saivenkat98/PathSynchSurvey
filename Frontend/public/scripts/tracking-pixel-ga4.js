// GA4 Measurement Protocol Implementation
const GA4_CONFIG = {
  MEASUREMENT_ID: "G-HTYF1DDXEZ",
  API_SECRET: "62fkMLaARdeFY8CBnT01iQ", // Will be replaced manually
};

// Helper to get or generate client ID
const getClientId = () => {
  const match = document.cookie.match(/_ga=GA\d\.\d\.(\d+)/);
  return match ? match[1] : `${Math.random().toString().slice(2)}.${Date.now()}`;
};

// Send event to GA4
const sendEvent = async (eventName, params = {}) => {
  const payload = {
    client_id: getClientId(),
    events: [
      {
        name: eventName,
        params: {
          page_title: document.title,
          user_agent: navigator.userAgent,
          ...params,
        },
      },
    ],
  };

  try {
    await fetch("http://localhost:3000/track-event", { // your backend URL
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ Event "${eventName}" sent to backend`);
  } catch (err) {
    console.error(`❌ Failed to send event "${eventName}"`, err);
  }
};


// Track form interactions
document.addEventListener('DOMContentLoaded', () => {
  // Track form load
  console.log("1")
  sendEvent('feedback_form_view');

  // Track star ratings
  ['rating_clarity', 'rating_engagement'].forEach(ratingName => {
    console.log("2")
    document.querySelectorAll(`[name="${ratingName}"]`).forEach(input => {
      input.addEventListener('change', () => {
        sendEvent('feedback_rating_selected', {
          rating_type: ratingName,
          rating_value: input.value
        });
      });
    });
  });

  // Track radio button selections
  ['relevance', 'recommend'].forEach(radioName => {
    console.log("3")
    document.querySelectorAll(`[name="${radioName}"]`).forEach(radio => {
      radio.addEventListener('change', () => {
        sendEvent('feedback_option_selected', {
          question_type: radioName,
          selected_option: radio.value
        });
      });
    });
  });

  // Track text input
  const takeawayInput = document.querySelector('[name="takeaway"]');
  if (takeawayInput) {
    console.log("4")
    takeawayInput.addEventListener('blur', () => {
      if (takeawayInput.value.trim()) {
        sendEvent('feedback_takeaway_provided');
      }
    });
  }

  // Track form submission
  const submitButton = document.getElementById('submit-feedback-btn');
  if (submitButton) {
    console.log("5")
    submitButton.closest('form')?.addEventListener('submit', (e) => {
      sendEvent('feedback_form_submitted');
    });
  }
});