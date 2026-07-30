# 3104. Find Longest Self-Contained Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-longest-self-contained-substring](https://leetcode.com/problems/find-longest-self-contained-substring)
**Companies:** Amazon

---

## Problem Description

Find the longest substring where every character in it appears **only** within this substring (self-contained). Must be a proper substring (not the entire string).

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abac"` | `2` | The substring `"ba"` (indices 1‑2) is self‑contained: `b` and `a` appear only inside it. No longer self‑contained substring exists. |
| `"aaaa"` | `-1` | Any proper substring contains `a` which also appears outside, so no valid substring.
| `"abcde"` | `1` | Each character appears only once, so any single‑character substring is self‑contained. The longest proper one has length 1.

---

## Approach: Character Range Validation — O(26·n) ✅

```text
FUNCTION longestSelfContained(s):
    // Record first and last occurrence of each character
    first ← map of char → INF
    last  ← map of char → -1
    FOR i ← 0 TO len(s)-1:
        c ← s[i]
        SET first[c] ← MIN(first[c], i)
        SET last[c]  ← MAX(last[c], i)
    result ← -1
    // Try each left boundary
    FOR l ← 0 TO len(s)-2: // proper substring required
        r ← l
        valid ← TRUE
        // Expand window to include all required characters
        FOR j ← l TO r:
            c ← s[j]
            IF first[c] < l:
                SET valid ← FALSE
                BREAK
            SET r ← MAX(r, last[c])
        IF valid AND r < len(s)-1:
            SET result ← MAX(result, r - l + 1)
    RETURN result
```

---

## Walkthrough

Consider `s = "abac"`:

1. First/last indices: `a→(0,2)`, `b→(1,1)`, `c→(3,3)`.
2. Start with `l = 0`:
   - `r` initially `0`. Character `a` forces `r = 2` (its last index).
   - Window now `0..2` (`"aba"`). `b` inside has `first=1 ≥ l` and `last=1 ≤ r` – ok.
   - `a` again fine. Window ends at `r=2`.
   - Since `r < 3` (not whole string) and all chars satisfy `first ≥ l`, length = `3` → candidate.
3. `l = 1`:
   - Start `r=1`. Char `b` has `first=1`, `last=1` → window stays `1..1`.
   - Valid proper substring length `1`.
4. `l = 2`:
   - Start `r=2`. Char `a` has `first=0 < l` → invalid, break.
5. Best valid length from proper substrings is `2` (`"ba"`).

---

## Complexity Analysis

- **Time:** O(26·n) ≈ O(n) – one pass to record positions and another nested loop limited by alphabet size.
- **Space:** O(26) for the `first` and `last` maps.

---

## Follow-Up Questions

- How would you adapt the algorithm for Unicode strings with a large alphabet?
- Can you modify the solution to return the actual longest self‑contained substring instead of its length?
- What if the substring may be the entire string? How does the answer change?

---

## Key Takeaway

> **Self-contained = all character occurrences are within the window. Track first/last positions per character to validate and expand windows.**