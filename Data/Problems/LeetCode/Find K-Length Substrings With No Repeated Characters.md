# 1100. Find K-Length Substrings With No Repeated Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters](https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters)
**Companies:** Amazon

---

## Problem Description

Given a string `s` and an integer `k`, return *the number of substrings in* `s` *of length* `k` *with no repeated characters*.

**Constraints:**

- `1 <= s.length <= 10^4`
- `s` consists of lowercase English letters.
- `1 <= k <= 10^4`

---

## Examples

```
Example 1:
  Input: s = "havefunonleetcode", k = 5
  Output: 6
  Explanation: There are 6 substrings they are: 'havef','avefu','vefun','efuno','etcod','tcode'.
```

```
Example 2:
  Input: s = "home", k = 5
  Output: 0
  Explanation: Notice k can be larger than the length of s. In this case, it is not possible to find any substring.
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
- How to handle case-insensitive comparisons?

---

## Key Takeaway

> **Fixed-size sliding window with a frequency map. The window contains all unique characters when the map size equals `k`.**
