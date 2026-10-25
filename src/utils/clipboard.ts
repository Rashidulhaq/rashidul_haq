/**
 * Robust clipboard copy function that works across modern browsers,
 * legacy browsers, mobile devices, and secure/insecure iframes.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Strategy 1: Modern Async Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("navigator.clipboard.writeText failed, falling back to execCommand:", err);
    }
  }

  // Strategy 2: Fallback using temporary textarea + execCommand
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // Ensure the textarea is off-screen but still focusable & selectable
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    textArea.style.opacity = "0";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    
    // Select text
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("execCommand copy failed:", err);
    return false;
  }
}
