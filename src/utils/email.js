// src/utils/email.js
export function openGmail({ to, subject = "", body = "" }) {
  const toStr = Array.isArray(to) ? to.join(",") : to;

  // Gmail Web
  const gmailWeb =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toStr)}` +
    (subject ? `&su=${encodeURIComponent(subject)}` : "") +
    (body ? `&body=${encodeURIComponent(body)}` : "");

  // Mailto (final fallback)
  const mailto =
    `mailto:${encodeURIComponent(toStr)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Gmail App (mobile only)
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isiOS = /iPhone|iPad|iPod/i.test(ua);

  const gmailApp =
    `googlegmail://co?to=${encodeURIComponent(toStr)}` +
    (subject ? `&subject=${encodeURIComponent(subject)}` : "") +
    (body ? `&body=${encodeURIComponent(body)}` : "");

  // Desktop → open Gmail Web
  if (!isAndroid && !isiOS) {
    const w = window.open(gmailWeb, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = mailto; // popup blocked → mailto
    return;
  }

  // Mobile → try the Gmail app first, then fall back to Web, then mailto
  let fellBack = false;

  // If the app opens, the page usually gets backgrounded → cancel fallback
  const cancelOnHide = () => {
    document.removeEventListener("visibilitychange", cancelOnHide);
    if (document.hidden) {
      fellBack = true; // app likely opened
      clearTimeout(fallbackTimer);
    }
  };
  document.addEventListener("visibilitychange", cancelOnHide, { once: true });

  // Try opening the app via hidden iframe (does nothing on desktop)
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = gmailApp;
  document.body.appendChild(iframe);

  // Fallback to Gmail Web if app didn't take over
  const fallbackTimer = setTimeout(() => {
    if (fellBack) return;
    const w = window.open(gmailWeb, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = mailto;
    setTimeout(() => {
      try { document.body.removeChild(iframe); } catch {}
    }, 1000);
  }, 1000); // ~1s is enough for app switch
}
