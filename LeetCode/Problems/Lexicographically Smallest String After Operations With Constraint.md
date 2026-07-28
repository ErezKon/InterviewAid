# 3106. Lexicographically Smallest String After Operations With Constraint

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint](https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint)
**Companies:** Servicenow

---

## 1. Problem Description

Given a lowercase string `s` and an integer budget `k`, you may change each character by moving it forward or backward in the alphabet (circularly) any number of steps. The total distance moved across all characters must not exceed `k`. Return the lexicographically smallest string achievable.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abcd"`, `k = 2` | `"aabd"` | Reduce `'c'` to `'a'` using 2 steps; other chars stay. |
| `"zz"`, `k = 1` | `"az"` | Change first `'z'` to `'a'` (1 step). |
| `"abc"`, `k = 0` | `"abc"` | No budget, string unchanged. |

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
