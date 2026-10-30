# 753. Cracking the Safe

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cracking-the-safe](https://leetcode.com/problems/cracking-the-safe)
**Companies:** Google

---

## Problem Description

There is a safe protected by a password. The password is a sequence of `n` digits where each digit can be in the range `[0, k - 1]`.

The safe has a peculiar way of checking the password. When you enter in a sequence, it checks the **most recent** `n` **digits** that were entered each time you type a digit.

- For example, the correct password is `"345"` and you enter in `"012345"`:
  - After typing `0`, the most recent `3` digits is `"0"`, which is incorrect.
  - After typing `1`, the most recent `3` digits is `"01"`, which is incorrect.
  - After typing `2`, the most recent `3` digits is `"012"`, which is incorrect.
  - After typing `3`, the most recent `3` digits is `"123"`, which is incorrect.
  - After typing `4`, the most recent `3` digits is `"234"`, which is incorrect.
  - After typing `5`, the most recent `3` digits is `"345"`, which is correct and the safe unlocks.

Return *any string of **minimum length** that will unlock the safe **at some point** of entering it*.

**Constraints:**
- `1 <= n <= 4`
- `1 <= k <= 10`
- `1 <= k^n <= 4096`

---

## Examples

```
Example 1:
  Input: n = 1, k = 2
  Output: "10"
  Explanation: The password is a single digit, so enter each digit. "01" would also unlock the safe.
```

```
Example 2:
  Input: n = 2, k = 2
  Output: "01100"
  Explanation: For each possible password:
  - "00" is typed in starting from the 4th digit.
  - "01" is typed in starting from the 1st digit.
  - "10" is typed in starting from the 3rd digit.
  - "11" is typed in starting from the 2nd digit.
  Thus "01100" will unlock the safe. "10011", and "11001" would also unlock the safe.
```

---

## Approach

```
FUNCTION crackSafe(n, k):
    IF n == 1: RETURN "".JOIN([STR(i) FOR i IN RANGE(k)])
    visited ← SET()
    result ← []

    FUNCTION dfs(node):
        FOR d ← 0 TO k-1:
            edge ← node + STR(d)
            IF edge NOT IN visited:
                visited.ADD(edge)
                dfs(edge[1:])   // next node = last (n-1) chars
                result.APPEND(STR(d))

    start ← "0" * (n-1)
    dfs(start)
    result.APPEND(start)
    RETURN "".JOIN(REVERSED(result))
```

---

## Walkthrough

| Step | Current node | Edge taken | Action |
|------|--------------|------------|--------|
| 1 | "00" (start) | 0 → edge "000" | Mark visited, recurse to "00" |
| 2 | "00" | 1 → edge "001" | Mark visited, recurse to "01" |
| 3 | "01" | 0 → edge "010" | Mark visited, recurse to "10" |
| 4 | "10" | 0 → edge "100" | Mark visited, recurse to "00" (already visited) |
| 5 | backtrack, append "0" to result |
| … | continue until all 2^n edges visited |
| Final | result list reversed + start = "00110" |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(kⁿ) – each edge of the De Bruijn graph visited once |
| **Space** | O(kⁿ) – visited set and recursion stack |

---

## Follow-Up Questions

1. How would you adapt the algorithm to generate a De Bruijn sequence for an alphabet of letters instead of digits?
2. Can the solution be implemented iteratively using an explicit stack instead of recursion?
3. What changes are needed if the sequence must start with a specific prefix?

---

## Key Takeaway

> **De Bruijn sequence = Eulerian circuit on the De Bruijn graph.** Hierholzer’s algorithm traverses every edge exactly once, yielding the shortest string that contains all possible passwords.
