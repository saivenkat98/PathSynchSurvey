// // Helper to get or generate client ID
// const getClientId = (): string => {
//     const match = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
//     return match ? match[1] : `${Math.random().toString().slice(2)}.${Date.now()}`;
//   };
  
//   // Event payload structure
//   interface GAEventParams {
//     [key: string]: any;
//   }
  
//   interface GAEvent {
//     name: string;
//     params: GAEventParams;
//   }
  
//   interface GAPayload {
//     client_id: string;
//     events: GAEvent[];
//   }
  
//   // Send event to GA4
//   export const sendEvent = async (eventName: string, params: GAEventParams = {}): Promise<void> => {
//     const payload: GAPayload = {
//       client_id: getClientId(),
//       events: [
//         {
//           name: eventName,
//           params: {
//             page_title: document.title,
//             user_agent: navigator.userAgent,
//             ...params,
//           },
//         },
//       ],
//     };
  
//     try {
//       await fetch("http://localhost:3000/track-event", {
//         method: "POST",
//         body: JSON.stringify(payload),
//         headers: { "Content-Type": "application/json" },
//       });
//       console.log(`✅ Event "${eventName}" sent to backend`);
//     } catch (err) {
//       console.error(`❌ Failed to send event "${eventName}"`, err);
//     }
//   };
  
//   // Track form interactions
//   document.addEventListener('DOMContentLoaded', () => {
//     // Track form load
//     console.log("1");
//     sendEvent('feedback_form_view');
  
//     // Track star ratings
//     ['rating_clarity', 'rating_engagement'].forEach((ratingName: string) => {
//       console.log("2");
//       const inputs = document.querySelectorAll<HTMLInputElement>(`[name="${ratingName}"]`);
//       inputs.forEach(input => {
//         input.addEventListener('change', () => {
//           sendEvent('feedback_rating_selected', {
//             rating_type: ratingName,
//             rating_value: input.value,
//           });
//         });
//       });
//     });
  
//     // Track radio button selections
//     ['relevance', 'recommend'].forEach((radioName: string) => {
//       console.log("3");
//       const radios = document.querySelectorAll<HTMLInputElement>(`[name="${radioName}"]`);
//       radios.forEach(radio => {
//         radio.addEventListener('change', () => {
//           sendEvent('feedback_option_selected', {
//             question_type: radioName,
//             selected_option: radio.value,
//           });
//         });
//       });
//     });
  
//     // Track text input
//     const takeawayInput = document.querySelector<HTMLInputElement>('[name="takeaway"]');
//     if (takeawayInput) {
//       console.log("4");
//       takeawayInput.addEventListener('blur', () => {
//         if (takeawayInput.value.trim()) {
//           sendEvent('feedback_takeaway_provided');
//         }
//       });
//     }
  
//     // Track form submission
//     const submitButton = document.getElementById('submit-feedback-btn');
//     if (submitButton) {
//       console.log("5");
//       const form = submitButton.closest('form');
//       if (form) {
//         form.addEventListener('submit', () => {
//           sendEvent('feedback_form_submitted');
//         });
//       }
//     }
//   });
  