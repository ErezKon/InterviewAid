# 1100. Find K-Length Substrings With No Repeated Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters](https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters)
**Companies:** Amazon

---

## Problem Description

Given a string `s` and an integer `k`, count the number of substrings of length `k` where all characters are distinct. Return the total count.

---

## Examples

**Example 1:**
```
s = "abcabc"
k = 3
Output: 4
Explanation: Substrings of length 3 with unique chars are "abc", "bca", "cab", "abc".
```

**Example 2:**
```
s = "aaaaa"
k = 2
Output: 0
Explanation: No length‑2 substring has distinct characters.
```

---

## Approach: Sliding Window — O(n) ✅

```text
FUNCTION numKLenSubstrNoRepeats(s, k):
    IF k > 26: RETURN 0
    SET freq ← MAP()
    SET count ← 0
    FOR i ← 0 TO LENGTH(s) - 1:
        SET ch ← s[i]
        INCREMENT freq[ch]
        IF i >= k:
            SET leftCh ← s[i - k]
            DECREMENT freq[leftCh]
            IF freq[leftCh] = 0: REMOVE leftCh FROM freq
        IF i >= k - 1 AND SIZE(freq) = k:
            INCREMENT count
    RETURN count
```

---

## Walkthrough

| Step | Window (indices) | freq keys | Action |
|------|------------------|-----------|--------|
| 1 | [0,2] → "abc" | a,b,c | size=3 → count=1 |
| 2 | slide to [1,3] → "bca" | b,c,a | size=3 → count=2 |
| 3 | slide to [2,4] → "cab" | c,a,b | size=3 → count=3 |
| 4 | slide to [3,5] → "abc" | a,b,c | size=3 → count=4 |

---

## Complexity Analysis

- **Time:** O(n) – each character enters and leaves the window once.
- **Space:** O(min(k, alphabet)) – frequency map holds at most `k` distinct characters (≤26 for lowercase English).

---

## Follow-Up Questions

- How would you adapt the solution for Unicode characters?
- How to return the actual substrings instead of just the count?
- How to handle case‑insensitive comparisons?

---

## Key Takeaway

> **Fixed‑size sliding window with a frequency map. The window contains all unique characters when the map size equals `k`.**
