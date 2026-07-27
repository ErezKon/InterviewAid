# 3628. Maximum Number of Subsequences After One Inserting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-subsequences-after-one-inserting](https://leetcode.com/problems/maximum-number-of-subsequences-after-one-inserting)
**Companies:** De Shaw

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `text` and a string `pattern` of length 2, insert **exactly one** character (either `pattern[0]` or `pattern[1]`) anywhere in `text` to maximize the number of subsequences equal to `pattern`.

**Constraints:**
- `1 <= text.length <= 10^5`
- `pattern.length = 2`

---

## Examples

**Example 1:**
```
Input:  text = "abdcdbc", pattern = "ac"
Output: 4
Explanation: Insert 'a' at the beginning → "aabdcdbc". Subsequences "ac": 4.
```

---

## Key Insight

> Count existing pattern subsequences. Then try two options:
> 1. Insert `pattern[0]` at the **beginning** — it pairs with every `pattern[1]` in the text.
> 2. Insert `pattern[1]` at the **end** — every `pattern[0]` in the text pairs with it.
> Take the maximum.

---

## Approach

```
FUNCTION maximumSubsequenceCount(text, pattern)
    a, b ← pattern[0], pattern[1]
    countB ← count of b in text
    countA ← count of a in text

    // Existing subsequences
    existing ← 0
    seenA ← 0
    FOR each char c IN text DO
        IF c = b THEN existing ← existing + seenA
        IF c = a THEN seenA ← seenA + 1

    // Option 1: insert a at start → adds countB
    // Option 2: insert b at end → adds countA
    RETURN existing + MAX(countA, countB)
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — counters |

---

## Follow-Up Questions

1. **What if pattern had length > 2?**
   Much harder — would need DP to count subsequences optimally.

2. **Why insert at start or end?**
   Inserting `a` at start maximizes pairings (pairs with all `b`s). Inserting `b` at end pairs with all `a`s.

---

## Key Takeaway

> **Greedy boundary insertion** — inserting the first pattern character at the start or the second at the end always maximizes the added subsequences. O(n) single-pass solution.
