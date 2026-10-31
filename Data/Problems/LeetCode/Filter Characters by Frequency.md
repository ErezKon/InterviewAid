# 3662. Filter Characters by Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/filter-characters-by-frequency](https://leetcode.com/problems/filter-characters-by-frequency)
**Companies:** Opentext

---

## Problem Description

You are given a string `s` consisting of lowercase English letters and an integer `k`.

Your task is to construct a new string that contains only those characters from `s` which appear **fewer** than `k` times in the entire string. The order of characters in the new string must be the **same** as their **order** in `s`.

Return the resulting string. If no characters qualify, return an empty string.

Note: **Every occurrence** of a character that occurs fewer than `k` times is kept.

**Constraints:**

- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.
- `1 <= k <= s.length`

---

## Examples

```
Example 1:
  Input: s = "aadbbcccca", k = 3
  Output: "dbb"
  Explanation: Character frequencies in s:
  - 'a' appears 3 times
  - 'd' appears 1 time
  - 'b' appears 2 times
  - 'c' appears 4 times
  Only 'd' and 'b' appear fewer than 3 times. Preserving their order, the result is "dbb".
```

```
Example 2:
  Input: s = "xyz", k = 2
  Output: "xyz"
  Explanation: All characters ('x', 'y', 'z') appear exactly once, which is fewer than 2. Thus the whole string is returned.
```

---

## Approach: Count + Filter ✅

```text
FUNCTION filterByFrequency(s):
    freq ← MAP of character → count
    FOR char IN s:
        freq[char] ← freq.get(char, 0) + 1
    avg ← SUM of freq.values() / SIZE of freq
    result ← EMPTY STRING
    FOR char IN s:
        IF freq[char] ≥ avg:
            APPEND char TO result
    RETURN result
```

---

## Walkthrough

Consider **Example 1** (`s = "aabccc"`):
| Step | Action | freq map | avg | result |
|------|--------|----------|-----|--------|
| 1 | Count frequencies | {a:2, b:1, c:3} | 2 | "" |
| 2 | Compute avg = (2+1+3)/3 = 2 |
| 3 | Iterate original string:
- 'a' (freq 2 ≥ 2) → result = "a"
- 'a' (freq 2) → result = "aa"
- 'b' (freq 1 < 2) → skip
- 'c' (freq 3 ≥ 2) → result = "aac"
- 'c' → result = "aacc"
- 'c' → result = "aaccc" |
Final result = "aacc c" → "aabccc" after preserving original order (note 'b' removed).

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass to count, another pass to build result |
| **Space** | O(k) — map for `k` distinct characters |

---

## Follow-Up Questions

1. How would you modify the algorithm to keep characters whose frequency is **greater than** the median frequency?
2. Can the solution be adapted to work with Unicode characters beyond ASCII?
3. What if the average frequency should be rounded up before comparison?

---

## Key Takeaway

> **Count frequencies, compute the average, and filter out characters below that threshold while preserving order.**
