(function(window, document) {
    'use strict';
  
    // --- Configuration ---
    var TRACKING_ENDPOINT = 'https://path-synch-survey-backend.vercel.app/track-event';
  //  var TRACKING_ENDPOINT = 'http://localhost:3000/track-event';
  
    // --- Helper: Get or generate GA4 client ID ---
    function getClientId() {
      var match = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
      return match ? match[1] : (Math.random().toString().slice(2) + '.' + Date.now());
    }
  
    // --- Core: Send event payload to backend ---
    function sendGA4Event(eventName, params) {
      params = params || {};
      var payload = {
        client_id: getClientId(),
        events: [
          {
            name: eventName,
            params: Object.assign({
              page_title: document.title,
              user_agent: navigator.userAgent
            }, params)
          }
        ]
      };
  
      // Fire-and-forget
      fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function(err) {
        console.error('❌ GA4 tracking failed:', err);
      });
    }
  
    // --- Auto-bind core UI interactions on form page ---
    function initAutoTracking() {
      // Track page/view load
      sendGA4Event('feedback_form_view');
  
      // Star ratings
      ['rating_clarity', 'rating_engagement'].forEach(function(name) {
        document.querySelectorAll('[name="' + name + '"]').forEach(function(el) {
          el.addEventListener('change', function() {
            sendGA4Event('feedback_rating_selected', {
              rating_type: name,
              rating_value: el.value
            });
          });
        });
      });
  
      // Radio options (relevance, recommend)
      ['relevance', 'recommend'].forEach(function(name) {
        document.querySelectorAll('[name="' + name + '"]').forEach(function(el) {
          el.addEventListener('change', function() {
            sendGA4Event('feedback_option_selected', {
              question_type: name,
              selected_option: el.value
            });
          });
        });
      });
  
      // Textarea blur
      var takeaway = document.querySelector('[name="takeaway"]');
      if (takeaway) {
        takeaway.addEventListener('blur', function() {
          var val = takeaway.value.trim();
          if (val) {
            sendGA4Event('feedback_takeaway_provided', {
              text_length: val.length,
              preview: val.slice(0, 30)
            });
          }
        });
      }
  
      // Form submission
      var form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          sendGA4Event('feedback_form_submitted');
          // Delay actual submit to allow tracking call
          setTimeout(function() { form.submit(); }, 300);
        });
      }
    }
  
    // --- Expose global functions for manual use in your app ---
    window.sendGA4Event = sendGA4Event;
  
    // --- Initialize auto-tracking on DOMContentLoaded ---
    document.addEventListener('DOMContentLoaded', initAutoTracking);
  
  })(window, document);
  