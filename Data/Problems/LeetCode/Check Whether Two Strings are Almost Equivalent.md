# 2068. Check Whether Two Strings are Almost Equivalent

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-whether-two-strings-are-almost-equivalent](https://leetcode.com/problems/check-whether-two-strings-are-almost-equivalent)
**Companies:** Salesforce

---

## 1. Problem Description

Two strings `word1` and `word2` are considered **almost equivalent** if the differences between the frequencies of each letter from `'a'` to `'z'` between `word1` and `word2` is **at most** `3`.

Given two strings `word1` and `word2`, each of length `n`, return `true` *if* `word1` *and* `word2` *are **almost equivalent**, or* `false` *otherwise*.

The **frequency** of a letter `x` is the number of times it occurs in the string.

**Constraints:**
- `n == word1.length == word2.length`
- `1 <= n <= 100`
- `word1` and `word2` consist only of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: word1 = "aaaa", word2 = "bccb"
  Output: false
  Explanation: There are 4 'a's in "aaaa" but 0 'a's in "bccb".
  The difference is 4, which is more than the allowed 3.
```

```
Example 2:
  Input: word1 = "abcdeef", word2 = "abaaacc"
  Output: true
  Explanation: The differences between the frequencies of each letter in word1 and word2 are at most 3:
  - 'a' appears 1 time in word1 and 4 times in word2. The difference is 3.
  - 'b' appears 1 time in word1 and 1 time in word2. The difference is 0.
  - 'c' appears 1 time in word1 and 2 times in word2. The difference is 1.
  - 'd' appears 1 time in word1 and 0 times in word2. The difference is 1.
  - 'e' appears 2 times in word1 and 0 times in word2. The difference is 2.
  - 'f' appears 1 time in word1 and 0 times in word2. The difference is 1.
```

```
Example 3:
  Input: word1 = "cccddabba", word2 = "babababab"
  Output: true
  Explanation: The differences between the frequencies of each letter in word1 and word2 are at most 3:
  - 'a' appears 2 times in word1 and 4 times in word2. The difference is 2.
  - 'b' appears 2 times in word1 and 5 times in word2. The difference is 3.
  - 'c' appears 3 times in word1 and 0 times in word2. The difference is 3.
  - 'd' appears 2 times in word1 and 0 times in word2. The difference is 2.
```

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
