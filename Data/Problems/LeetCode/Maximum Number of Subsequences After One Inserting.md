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

You are given a string `s` consisting of uppercase English letters.

You are allowed to insert **at most one** uppercase English letter at **any** position (including the beginning or end) of the string.

Return the **maximum** number of `"LCT"` subsequences that can be formed in the resulting string after **at most one insertion**.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of uppercase English letters.

---

## Examples

```
Example 1:
  Input: s = "LMCT"
  Output: 2
  Explanation: We can insert a "L" at the beginning of the string s to make "LLMCT", which has 2 subsequences,
    at indices [0, 3, 4] and [1, 3, 4].
```

```
Example 2:
  Input: s = "LCCT"
  Output: 4
  Explanation: We can insert a "L" at the beginning of the string s to make "LLCCT", which has 4 subsequences,
    at indices [0, 2, 4], [0, 3, 4], [1, 2, 4] and [1, 3, 4].
```

```
Example 3:
  Input: s = "L"
  Output: 0
  Explanation: Since it is not possible to obtain the subsequence "LCT" by inserting a single letter, the result is 0.
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
