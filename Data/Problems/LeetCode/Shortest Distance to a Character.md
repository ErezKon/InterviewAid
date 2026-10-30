# 821. Shortest Distance to a Character

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-a-character](https://leetcode.com/problems/shortest-distance-to-a-character)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given a string `s` and a character `c` that occurs in `s`, return *an array of integers* `answer` *where* `answer.length == s.length` *and* `answer[i]` *is the **distance** from index* `i` *to the **closest** occurrence of character* `c` *in* `s`.

The **distance** between two indices `i` and `j` is `abs(i - j)`, where `abs` is the absolute value function.

**Constraints:**

- `1 <= s.length <= 10^4`
- `s[i]` and `c` are lowercase English letters.
- It is guaranteed that `c` occurs at least once in `s`.

---

## Approach

```text
FUNCTION shortestToChar(s, c):
    n ← len(s)
    result ← ARRAY[n] filled with n
    // Left‑to‑right pass
    pos ← -n
    FOR i ← 0 TO n-1:
        IF s[i] == c: pos ← i
        result[i] ← i - pos
    // Right‑to‑left pass
    pos ← 2*n
    FOR i ← n-1 DOWN TO 0:
        IF s[i] == c: pos ← i
        result[i] ← MIN(result[i], pos - i)
    RETURN result
```

---

## Examples

```
Example 1:
  Input: s = "loveleetcode", c = "e"
  Output: [3,2,1,0,1,0,0,1,2,2,1,0]
  Explanation: The character 'e' appears at indices 3, 5, 6, and 11 (0-indexed).
  The closest occurrence of 'e' for index 0 is at index 3, so the distance is abs(0 - 3) = 3.
  The closest occurrence of 'e' for index 1 is at index 3, so the distance is abs(1 - 3) = 2.
  For index 4, there is a tie between the 'e' at index 3 and the 'e' at index 5, but the distance is still the same: abs(4 - 3) == abs(4 - 5) = 1.
  The closest occurrence of 'e' for index 8 is at index 6, so the distance is abs(8 - 6) = 2.
```

```
Example 2:
  Input: s = "aaab", c = "b"
  Output: [3,2,1,0]
```

---

## Walkthrough

1. **First pass (left to right)** – Keep `pos` as the most recent index where `c` was seen. For each `i`, the distance to the nearest `c` on the left is `i - pos`.
2. **Second pass (right to left)** – Reset `pos` to a far‑right sentinel. Iterate backwards, updating `pos` when `c` is encountered. For each `i`, compute the distance to the nearest `c` on the right (`pos - i`) and keep the smaller of the two distances.
3. The final `result` array contains the minimum distance to `c` from every position.

---

## Complexity Analysis

- **Time:** O(n) – two linear scans of the string.
- **Space:** O(n) – the output array.

---

## Key Takeaway

> Two linear passes, one from each direction, efficiently compute the nearest‑character distance for every index.
