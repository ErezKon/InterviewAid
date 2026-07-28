# 521. Longest Uncommon Subsequence I

**Difficulty:** 🟢 Easy
**Companies:** Google, Meta

---

## 1. Problem Description

Given two strings, find the longest uncommon subsequence (a subsequence of one that is NOT a subsequence of the other).

---

## 2. Examples

**Example 1:**
```
Input: a = "aba", b = "cdc"
Output: 3
Explanation: The strings are different, so the longer string (both length 3) is an uncommon subsequence.
```

**Example 2:**
```
Input: a = "aaa", b = "aaa"
Output: -1
Explanation: Both strings are identical, so there is no uncommon subsequence.
```

---

## 3. Approach: Observation — O(n) ✅

```text
FUNCTION findLUSlength(a, b):
    IF a = b:
        RETURN -1
    ELSE:
        RETURN MAX(len(a), len(b))
```

---

## 4. Walkthrough

| Step | a | b | Condition | Return |
|------|---|---|-----------|--------|
| 1 | "aba" | "cdc" | a ≠ b | max(3,3)=3 |
| 2 | "aaa" | "aaa" | a = b | -1 |

The algorithm simply checks equality; if different, the longer string cannot be a subsequence of the other.

---

## 5. Complexity Analysis

- **Time:** O(n) – only length comparison.
- **Space:** O(1) – constant extra space.

---

## 6. Follow-Up Questions

1. How would you handle more than two strings?
2. What if you need the actual uncommon subsequence, not just its length?
3. How does the solution change if subsequence definition is stricter (e.g., contiguous substring)?

---

## Key Takeaway

> If the strings differ, the longer one is automatically an uncommon subsequence; otherwise, no uncommon subsequence exists.