# 3106. Lexicographically Smallest String After Operations With Constraint

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint](https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint)
**Companies:** Servicenow

---

## 1. Problem Description

You are given a string `s` and an integer `k`.

Define a function `distance(s_1, s_2)` between two strings `s_1` and `s_2` of the same length `n` as:

- The** sum** of the **minimum distance** between `s_1[i]` and `s_2[i]` when the characters from `'a'` to `'z'` are placed in a **cyclic** order, for all `i` in the range `[0, n - 1]`.

For example, `distance("ab", "cd") == 4`, and `distance("a", "z") == 1`.

You can **change** any letter of `s` to **any** other lowercase English letter, **any** number of times.

Return a string denoting the **lexicographically smallest** string `t` you can get after some changes, such that `distance(s, t) <= k`.

**Constraints:**
- `1 <= s.length <= 100`
- `0 <= k <= 2000`
- `s` consists only of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: s = "zbbz", k = 3
Output: "aaaz"
Explanation: Change s to "aaaz". The distance between "zbbz" and "aaaz" is equal to k = 3.
```

**Example 2:**
```
Input: s = "xaxcd", k = 4
Output: "aawcd"
Explanation: The distance between "xaxcd" and "aawcd" is equal to k = 4.
```

**Example 3:**
```
Input: s = "lol", k = 0
Output: "lol"
Explanation: It's impossible to change any character as k = 0.
```

---

## 3. Approach: Greedy Left‑to‑Right — O(n) ✅

Traverse the string from left to right, always trying to make the current character as small as possible (preferably `'a'`). Use the remaining budget to reduce the character by the minimal distance (either forward or backward). Once the budget is exhausted, copy the remaining characters unchanged.

```text
FUNCTION getSmallestString(s, k):
    result ← LIST(s)
    FOR i ← 0 TO LENGTH(s) - 1:
        // distance to 'a' either forward or backward
        forward ← (ORD(s[i]) - ORD('a'))
        backward ← 26 - forward
        dist ← MIN(forward, backward)
        IF dist ≤ k:
            result[i] ← 'a'
            k ← k - dist
        ELSE:
            // reduce as much as possible towards 'a'
            result[i] ← CHAR(ORD(s[i]) - k)
            k ← 0
    RETURN JOIN(result)
```

---

## 4. Walkthrough

**Example:** `s = "cbz", k = 3`

| Step | Char | forward | backward | dist | Action | k left |
|------|------|---------|----------|------|--------|--------|
| i=0 | `c` | 2 | 24 | 2 | change to `a` | 1 |
| i=1 | `b` | 1 | 25 | 1 | change to `a` | 0 |
| i=2 | `z` | 25 | 1 | 1 (k=0) → cannot | keep `z` |

Result: `"aaz"`.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass over the string.
- **Space:** O(n) – to store the resulting characters.

---

## 6. Follow‑Up Questions

- How would the solution change if the budget could be spent on any number of operations, not just one per character?
- What if the alphabet were larger (e.g., Unicode) and the wrap‑around distance varied?
- Can we achieve the same result with O(1) extra space by modifying the string in place?

---

## 7. Key Takeaway

> Greedily reduce each character toward `'a'` from left to right, spending the cheapest reductions first. Once the budget is exhausted, the remaining suffix stays unchanged.
