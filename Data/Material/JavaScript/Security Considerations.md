# 1. Security Considerations

```javascript
// === XSS PREVENTION ===

// ❌ NEVER do this
element.innerHTML = userInput;
eval(userInput);
new Function(userInput)();
setTimeout(userInput, 0); // String form executes code

// ✅ Safe DOM manipulation
element.textContent = userInput; // Escapes HTML
element.setAttribute("data-value", userInput);

// ✅ Sanitization function
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ✅ Template literal tag for safe HTML
function safeHTML(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i - 1];
    return result + escapeHTML(String(value ?? "")) + string;
  });
}

const userInput = '<script>alert("xss")</script>';
const html = safeHTML`<div>${userInput}</div>`;
// <div>&lt;script&gt;alert("xss")&lt;/script&gt;</div>


// === PROTOTYPE POLLUTION PREVENTION ===

// ❌ Vulnerable merge function
function unsafeMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object") {
      target[key] = target[key] || {};
      unsafeMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

// Attack payload:
// { "__proto__": { "isAdmin": true } }
// Now ALL objects have isAdmin === true!

// ✅ Safe merge
function safeMerge(target, source) {
  const BANNED_KEYS = new Set(["__proto__", "constructor", "prototype"]);
  
  for (const key of Object.keys(source)) { // Own properties only
    if (BANNED_KEYS.has(key)) continue;
    
    if (
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      target[key] = target[key] || Object.create(null);
      safeMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  
  return target;
}

// ✅ Even better: use Object.create(null) for dictionaries
const safeDict = Object.create(null); // No prototype at all!


// === TIMING ATTACK PREVENTION ===
// ❌ Vulnerable string comparison (short-circuits on first mismatch)
function unsafeCompare(a, b) {
  return a === b; // Returns false faster for early mismatches
}

// ✅ Constant-time comparison
function safeCompare(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}


// === CONTENT SECURITY POLICY (CSP) ===
// Always set in HTTP headers or meta tags:
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123';
// This prevents inline scripts, eval, and foreign script injection.
```
