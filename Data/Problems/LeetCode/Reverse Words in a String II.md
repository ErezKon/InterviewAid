# 186. Reverse Words in a String II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-words-in-a-string-ii](https://leetcode.com/problems/reverse-words-in-a-string-ii)
**Companies:** Amazon, Microsoft, Servicenow, Uber

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a character array `s`, reverse the order of the **words**.

A **word** is defined as a sequence of non-space characters. The **words** in `s` will be separated by a single space.

Your code must solve the problem **in-place,** i.e. without allocating extra space.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is an English letter (uppercase or lowercase), digit, or space `' '`.
- There is **at least one** word in `s`.
- `s` does not contain leading or trailing spaces.
- All the words in `s` are guaranteed to be separated by a single space.

---

## Examples

**Example 1:**
```
Input: s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
```

**Example 2:**
```
Input: s = ["a"]
Output: ["a"]
```

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
