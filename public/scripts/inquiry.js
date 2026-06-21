// Inquiry form — AJAX submit shared by the EN / ZH / RU contact pages.
// Localized messages and the source language come from data-* attributes on the
// <form>, so this one file serves all three languages.
(function () {
  var form = document.getElementById("quote-form");
  if (!form) return;

  var statusEl = form.querySelector("[data-form-status]");
  var button = form.querySelector('button[type="submit"]');
  var buttonLabel = button ? button.innerHTML : "";

  var msg = {
    sending: form.getAttribute("data-msg-sending") || "Sending…",
    success: form.getAttribute("data-msg-success") || "Thank you — your inquiry has been received.",
    error: form.getAttribute("data-msg-error") || "Something went wrong. Please try again.",
  };

  function setStatus(type, text) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.setAttribute("data-state", type);
    statusEl.textContent = text;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect every field (FormData skips unchecked checkboxes automatically).
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });
    data._lang = form.getAttribute("data-lang") || "en";
    data._page = location.pathname;

    if (button) {
      button.disabled = true;
      button.textContent = msg.sending;
    }
    setStatus("pending", msg.sending);

    fetch("/api/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (resp) {
        return resp.json().catch(function () {
          return { ok: resp.ok };
        });
      })
      .then(function (result) {
        if (result && result.ok) {
          setStatus("success", msg.success);
          form.reset();
          // Clear any saved product customization so it isn't resent next time.
          try {
            sessionStorage.removeItem("lisheng-customization");
            sessionStorage.removeItem("lisheng-customization-types");
          } catch (e) {}
          var block = document.querySelector("[data-customization-block]");
          if (block) block.dataset.customizationBlock = "";
        } else {
          setStatus("error", msg.error);
        }
      })
      .catch(function () {
        setStatus("error", msg.error);
      })
      .then(function () {
        if (button) {
          button.disabled = false;
          button.innerHTML = buttonLabel;
        }
      });
  });
})();
