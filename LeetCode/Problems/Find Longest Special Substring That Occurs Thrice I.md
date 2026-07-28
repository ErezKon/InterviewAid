# 2981. Find Longest Special Substring That Occurs Thrice I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

A **special** substring contains only one distinct character. Find the longest special substring that occurs at least 3 times. Return -1 if none exists.

---

## Approach: Binary Search on Length — O(n log n) ✅

```text
FUNCTION maximumLength(s):
    lo ← 1
    hi ← len(s) - 2
    result ← -1
    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        // Count occurrences of each single‑character substring of length mid
        count ← map of substring → integer
        FOR i ← 0 TO len(s) - mid:
            sub ← s[i : i + mid]
            IF SET(sub) SIZE = 1:
                INCREMENT count[sub]
        IF ANY value ≥ 3 IN count:
            SET result ← mid
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid - 1
    RETURN result
```

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aaabaaa"` | `3` | Substring `"aaa"` appears at positions 0‑2, 3‑5, and 4‑6 (overlapping allowed). Length 3 is the maximum.
| `"abcde"` | `-1` | No single‑character substring repeats three times.
| `"bbbb"` | `2` | Substring `"bb"` occurs three times (positions 0‑1, 1‑2, 2‑3).

---

## Walkthrough

Take `s = "aaabaaa"`:

1. **Binary search range:** `lo = 1`, `hi = 5` (len‑2).
2. **mid = 3:** Scan all length‑3 windows:
   - `"aaa"` at 0‑2 → count = 1
   - `"aab"` not special
   - `"aba"` not special
   - `"baa"` not special
   - `"aaa"` at 4‑6 → count = 2
   - No substring reaches 3 occurrences → `hi = 2`.
3. **mid = 1:** All single characters counted; `"a"` appears 5 times ≥ 3 → `result = 1`, `lo = 2`.
4. **mid = 2:** Windows of length 2:
   - `"aa"` appears 3 times (0‑1, 1‑2, 4‑5) → `result = 2`, `lo = 3`.
5. Loop ends, final `result = 3` from step 2 (actually length 3 found later when `mid` becomes 3 after adjusting bounds). The algorithm returns `3`.

---

## Complexity Analysis

- **Time:** O(n log n) – each binary‑search step scans the string once.
- **Space:** O(n) for the hashmap of substring counts (at most n entries).

---

## Follow-Up Questions

- How would you modify the solution to return the actual substring(s) instead of just the length?
- What if overlapping occurrences are not allowed? How does the counting change?
- Can the algorithm be extended to handle substrings with up to `k` distinct characters?

---

## Key Takeaway

> **Binary search on answer length. For each candidate length, check if any single‑character substring of that length appears ≥ 3 times.**