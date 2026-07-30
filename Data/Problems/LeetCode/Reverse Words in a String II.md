# 186. Reverse Words in a String II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-words-in-a-string-ii](https://leetcode.com/problems/reverse-words-in-a-string-ii)
**Companies:** Amazon, Microsoft, Servicenow, Uber

---

## Problem Description

Given a character array `s`, reverse the order of **words** in-place using O(1) extra space. Words are separated by single spaces; no leading/trailing spaces.

- **Example:** `['t','h','e',' ','s','k','y']` → `['s','k','y',' ','t','h','e']`

---

## Examples

| Input | Output |
|-------|--------|
| `['t','h','e',' ','s','k','y']` | `['s','k','y',' ','t','h','e']` |
| `['h','e','l','l','o',' ','w','o','r','l','d']` | `['w','o','r','l','d',' ','h','e','l','l','o']` |

---

## Approach

```
FUNCTION reverseWords(s):
    // Reverse entire string, then reverse each word
    REVERSE(s, 0, len(s) - 1)
    start = 0
    FOR i ← 0 TO len(s):
        IF i == len(s) OR s[i] == ' ':
            REVERSE(s, start, i - 1)
            start = i + 1
```

---

## Walkthrough

**Example:** `['t','h','e',' ','s','k','y']`

1. Reverse whole array → `['y','k','s',' ','e','h','t']`
2. Scan for spaces:
   - Word `yks` (indices 0‑2) → reverse → `['s','k','y',' ','e','h','t']`
   - Word `eht` (indices 4‑6) → reverse → `['s','k','y',' ','t','h','e']`
3. Result matches expected output.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – each character visited a constant number of times | O(1) – in‑place modifications only |

---

## Follow‑Up Questions

- How would you modify the algorithm if words could be separated by multiple spaces?
- Can you adapt the solution to handle Unicode characters with variable byte length?
- What changes are needed if the input is a mutable string rather than a character array?

---

## Key Takeaway

> The "reverse all then reverse parts" technique is the fundamental approach for in-place word/block reordering — also used in array rotation (LeetCode #189).
