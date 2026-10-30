# 521. Longest Uncommon Subsequence I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-uncommon-subsequence-i](https://leetcode.com/problems/longest-uncommon-subsequence-i)
**Companies:** Google, Meta

---

## 1. Problem Description

Given two strings `a` and `b`, return *the length of the **longest uncommon subsequence** between *`a` *and* `b`. *If no such uncommon subsequence exists, return* `-1`*.*

An **uncommon subsequence** between two strings is a string that is a **subsequence of exactly one of them**.

**Constraints:**
- `1 <= a.length, b.length <= 100`
- `a` and `b` consist of lower-case English letters.

---

## 2. Examples

**Example 1:**
```
Input: a = "aba", b = "cdc"
Output: 3
Explanation: One longest uncommon subsequence is "aba" because "aba" is a subsequence of "aba" but not "cdc".
Note that "cdc" is also a longest uncommon subsequence.
```

**Example 2:**
```
Input: a = "aaa", b = "bbb"
Output: 3
Explanation: The longest uncommon subsequences are "aaa" and "bbb".
```

**Example 3:**
```
Input: a = "aaa", b = "aaa"
Output: -1
Explanation: Every subsequence of string a is also a subsequence of string b. Similarly, every subsequence of string b is also a subsequence of string a. So the answer would be -1.
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