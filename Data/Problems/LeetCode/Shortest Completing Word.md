# 748. Shortest Completing Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-completing-word](https://leetcode.com/problems/shortest-completing-word)
**Companies:** Google

---

## Problem Description

Given a license plate string and an array of words, find the shortest word that contains all letters from the license plate (ignoring case, digits, spaces).

---

## Approach

```text
FUNCTION shortestCompletingWord(licensePlate, words):
    // Build frequency map of required letters
    target ← MAP()
    FOR ch IN licensePlate:
        IF ch IS LETTER:
            lower ← LOWERCASE(ch)
            target[lower] ← target.GET(lower, 0) + 1

    best ← NULL
    FOR word IN words:
        // Build frequency map for current word
        wCount ← MAP()
        FOR ch IN word:
            lower ← LOWERCASE(ch)
            wCount[lower] ← wCount.GET(lower, 0) + 1
        // Check if word satisfies all required letters
        satisfies ← TRUE
        FOR (c, cnt) IN target:
            IF wCount.GET(c, 0) < cnt:
                satisfies ← FALSE
                BREAK
        IF satisfies:
            IF best IS NULL OR LEN(word) < LEN(best):
                best ← word
    RETURN best
```

## Examples

**Example 1:**
```
licensePlate = "1s3 PSt"
words = ["step", "steps", "stripe", "stepple"]
```
The required letters are **s, p, s, t** (case‑insensitive). The shortest completing word is **"steps"**.

**Example 2:**
```
licensePlate = "1a"
words = ["a", "b", "c"]
```
The answer is **"a"**.

## Walkthrough

1. Convert the license plate "1s3 PSt" to a frequency map: `{s:2, p:1, t:1}`.
2. Iterate over each candidate word:
   - "step": counts `{s:1, t:1, e:1, p:1}` → missing one `s` → not valid.
   - "steps": counts `{s:2, t:1, e:1, p:1}` → satisfies all requirements.
   - Remaining words are longer, so "steps" remains the best.
3. Return "steps".

## Complexity Analysis

- **Time:** O(L + W × K) where *L* is length of the license plate, *W* is number of words, and *K* is average word length (building frequency maps).
- **Space:** O(26) for the two frequency maps (constant space).

## Follow-Up Questions

1. How would you adapt the solution if the list of words were streamed and could not be stored entirely in memory?
2. Can the algorithm be optimized using a pre‑processed index of words by their letter frequencies?
3. What changes are needed if the license plate may contain Unicode letters beyond the basic Latin alphabet?

## Key Takeaway

Build a frequency map of required letters from the license plate and compare it against each word’s letter counts; the shortest word that meets or exceeds all required frequencies is the answer.
