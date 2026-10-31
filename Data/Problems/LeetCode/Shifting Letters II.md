# 2381. Shifting Letters II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shifting-letters-ii](https://leetcode.com/problems/shifting-letters-ii)
**Companies:** Amazon, Google, Meta, Microsoft, Veritas, Zeta

---

## Problem Description

You are given a string `s` of lowercase English letters and a 2D integer array `shifts` where `shifts[i] = [starti, endi, directioni]`. For every `i`, **shift** the characters in `s` from the index `starti` to the index `endi` (**inclusive**) forward if `directioni = 1`, or shift the characters backward if `directioni = 0`.

Shifting a character **forward** means replacing it with the **next** letter in the alphabet (wrapping around so that `'z'` becomes `'a'`). Similarly, shifting a character **backward** means replacing it with the **previous** letter in the alphabet (wrapping around so that `'a'` becomes `'z'`).

Return *the final string after all such shifts to* `s` *are applied*.

**Constraints:**

- `1 <= s.length, shifts.length <= 5 * 10^4`
- `shifts[i].length == 3`
- `0 <= starti <= endi < s.length`
- `0 <= directioni <= 1`
- `s` consists of lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
  Output: "ace"
  Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
  Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
  Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".
```

```
Example 2:
  Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
  Output: "catz"
  Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
  Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".
```

---

## Approach

```
FUNCTION shiftingLettersII(s, shifts):
    n ← LENGTH(s)
    diff ← ARRAY of zeros size n+1

    FOR each [start, end, direction] IN shifts:
        delta ← 1 IF direction == 1 ELSE -1
        diff[start] += delta
        diff[end + 1] -= delta

    result ← LIST(s)
    cumulative ← 0
    FOR i ← 0 TO n-1:
        cumulative += diff[i]
        shift ← cumulative % 26
        result[i] = CHAR((ORD(s[i]) - ORD('a') + shift + 26) % 26 + ORD('a'))

    RETURN JOIN(result)
```

The difference array batches range updates in O(1) each; a prefix sum yields the net shift per character.

---

## Walkthrough

| Index | Original | diff after ops | Cumulative shift | New char |
|-------|----------|----------------|------------------|---------|
| 0 | a | +1 (from [0,1,1]) | 1 | b |
| 1 | b | +1-1 (from both ops) | 0 | b |
| 2 | c | -1 (from [1,2,0]) | -1 → 25 | b |

Resulting string: "bab" (adjusted for modulo arithmetic).

---

## Complexity Analysis

- **Time:** O(n + m) where n is length of `s` and m is number of shift operations.
- **Space:** O(n) for the difference array and result list.

---

## Follow-Up Questions

1. How would you modify the algorithm to support **different shift magnitudes** per operation?
2. Can the solution be extended to handle **Unicode** characters beyond the English alphabet?
3. What if shift operations need to be **queried online** (add/remove) after initial processing?

---

## Key Takeaway

> Use a difference array to convert many overlapping range updates into a single linear pass, then apply the accumulated shift to each character.
