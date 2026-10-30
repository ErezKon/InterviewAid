# 3216. Lexicographically Smallest String After a Swap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap](https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap)
**Companies:** Jpmorgan

---

## 1. Problem Description

Given a string `s` containing only digits, return the lexicographically smallest string that can be obtained after swapping **adjacent** digits in `s` with the same **parity** at most **once**.

Digits have the same parity if both are odd or both are even. For example, 5 and 9, as well as 2 and 4, have the same parity, while 6 and 9 do not.

**Constraints:**
- `2 <= s.length <= 100`
- `s` consists only of digits.

---

## 2. Examples

**Example 1:**
```
Input: s = "45320"
Output: "43520"
Explanation: s[1] == '5' and s[2] == '3' both have the same parity, and swapping them results in the lexicographically smallest string.
```

**Example 2:**
```
Input: s = "001"
Output: "001"
Explanation: There is no need to perform a swap because s is already the lexicographically smallest.
```

## 3. Approach: Greedy — O(n) ✅

```text
FUNCTION getSmallestString(s):
    s ← LIST(s)
    FOR i ← 0 TO LENGTH(s) - 2:
        a ← INTEGER(s[i])
        b ← INTEGER(s[i+1])
        IF a MOD 2 = b MOD 2 AND a > b:
            SWAP(s[i], s[i+1])
            BREAK
    RETURN JOIN(s)
```

---

## 4. Walkthrough

Consider the string `"13542"`:
1. Convert to list: `[1,3,5,4,2]`.
2. Iterate i=0: `1` and `3` both odd but `1 < 3` → no swap.
3. i=1: `3` and `5` both odd, `3 < 5` → no swap.
4. i=2: `5` (odd) and `4` (even) → parity differs → skip.
5. i=3: `4` and `2` both even and `4 > 2` → condition satisfied.
6. Swap positions 3 and 4 → list becomes `[1,3,5,2,4]`.
7. Join list → result `"13524"`, the smallest possible string after at most one allowed swap.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – single pass over the string | O(n) – to store characters as a list |

---

## 6. Follow-Up Questions

* How would the solution change if any number of swaps were allowed?
* What if swaps could be performed between any two same‑parity digits, not just adjacent ones?
* Can the algorithm be extended to handle very long strings efficiently in a streaming fashion?

---

## 7. Key Takeaway

> Find the first adjacent pair with same parity where swapping decreases the number. Only one swap allowed — take the leftmost improvement.
