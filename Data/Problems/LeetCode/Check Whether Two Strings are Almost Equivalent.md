# 2068. Check Whether Two Strings are Almost Equivalent

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-whether-two-strings-are-almost-equivalent](https://leetcode.com/problems/check-whether-two-strings-are-almost-equivalent)
**Companies:** Salesforce

---

## 1. Problem Description

Two strings are "almost equivalent" if the frequency difference of every character between them is at most 3. Return true if so.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `word1 = "abcde"`, `word2 = "abcdf"` | `true` | Each character differs by at most 1. |
| `word1 = "aaaa"`, `word2 = "bbbb"` | `false` | Frequency difference for `a` and `b` is 4, exceeding the limit. |

---

## 3. Approach: Frequency Count — O(n) ✅

```text
FUNCTION checkAlmostEquivalent(word1, word2):
    // count differences for each letter
    freq ← [0] * 26
    FOR ch IN word1:
        SET idx ← ASCII(ch) - ASCII('a')
        INCREMENT freq[idx]
    FOR ch IN word2:
        SET idx ← ASCII(ch) - ASCII('a')
        DECREMENT freq[idx]
    FOR value IN freq:
        IF ABS(value) > 3:
            RETURN false
    RETURN true
```

---

## 4. Walkthrough

Consider `word1 = "aabbcc"`, `word2 = "abccdd"`.

| Step | freq array (a‑z) after processing |
|------|--------------------------------------|
| Init | all zeros |
| Process `word1` | a:2, b:2, c:2 |
| Process `word2` | a:1, b:1, c:1, d:-2 |
| Check max diff | max absolute value = 2 ≤ 3 → return true |

---

## 5. Complexity Analysis

- **Time:** O(n) where n is the total length of both strings.
- **Space:** O(1) – fixed size array of 26 integers.

---

## 6. Follow-Up Questions

- How would you modify the solution for Unicode characters?
- Can you solve it using a single pass without extra arrays?
- What if the allowed frequency difference varies per character?

---

## Key Takeaway

> Count frequency differences. If all are within threshold, strings are "almost equivalent". Standard character frequency pattern.
