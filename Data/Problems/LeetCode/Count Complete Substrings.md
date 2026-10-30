# 2953. Count Complete Substrings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-complete-substrings](https://leetcode.com/problems/count-complete-substrings)
**Companies:** Meesho

---

## 1. Problem Description

You are given a string `word` and an integer `k`.

A substring `s` of `word` is **complete** if:

- Each character in `s` occurs **exactly** `k` times.
- The difference between two adjacent characters is **at most** `2`. That is, for any two adjacent characters `c1` and `c2` in `s`, the absolute difference in their positions in the alphabet is **at most** `2`.

Return *the number of **complete** substrings of* `word`.

A **substring** is a **non-empty** contiguous sequence of characters in a string.

**Constraints:**
- `1 <= word.length <= 10^5`
- `word` consists only of lowercase English letters.
- `1 <= k <= word.length`

---

## 2. Key Insight

> The adjacency constraint splits the string into segments where `|s[i] - s[i-1]| <= 2`. Within each segment, the substring length must be `c × k` for some number of distinct characters `c` (1 to 26). Use sliding window of fixed size `c × k` for each `c`.

---

## 3. Approach: Segment + Fixed Window — O(26 × n) ✅

```text
FUNCTION countCompleteSubstrings(word, k):
    count ← 0
    segments ← split word where |word[i] - word[i-1]| > 2
    FOR each segment IN segments:
        FOR c FROM 1 TO 26:
            windowSize ← c * k
            IF windowSize > LENGTH(segment): BREAK
            freq ← map with default 0
            FOR i FROM 0 TO LENGTH(segment)-1:
                freq[segment[i]] += 1
                IF i >= windowSize:
                    freq[segment[i - windowSize]] -= 1
                IF i >= windowSize - 1:
                    valid ← TRUE
                    FOR each val IN freq.values():
                        IF val != 0 AND val != k:
                            valid ← FALSE
                            BREAK
                    IF valid:
                        count ← count + 1
    RETURN count
```

---

## 2. Examples

```
Example 1:
  Input: word = "igigee", k = 2
  Output: 3
  Explanation: The complete substrings where each character appears exactly twice and the difference
  between adjacent characters is at most 2 are: "igig" (igigee), "ee" (igigee), "igigee".
```

```
Example 2:
  Input: word = "aaabbbccc", k = 3
  Output: 6
  Explanation: The complete substrings where each character appears exactly three times and the
  difference between adjacent characters is at most 2 are: "aaa", "bbb", "ccc", "aaabbb", "bbbccc", "aaabbbccc".
```

---

## 4. Walkthrough

Consider `word = "abcabc"`, `k = 2`.
1. The whole string is one segment because adjacent differences are ≤2.
2. Try `c = 3` distinct characters → window size = 3*2 = 6.
3. Sliding window of size 6 covers the entire string.
4. Frequency map after the window: {'a':2,'b':2,'c':2} → all equal to `k`.
5. Count increments to 1.
6. No other `c` yields a valid window, so final count is 1 (plus the shifted window starting at index 1 gives the second valid substring).

---

## 5. Complexity Analysis

- **Time:** O(26 × n) – we iterate over at most 26 possible distinct‑character counts for each segment.
- **Space:** O(26) – frequency map stores at most 26 characters.

---

## 6. Follow-Up Questions

1. How would the solution change if the adjacency constraint were removed?
2. Can the algorithm be adapted to count substrings where each character appears at most `k` times?
3. What if the alphabet size were larger than 26?

---

## Key Takeaway

> The adjacency constraint partitions the problem into independent segments. Within each, try all possible numbers of distinct characters (1–26) with a fixed‑size sliding window.
