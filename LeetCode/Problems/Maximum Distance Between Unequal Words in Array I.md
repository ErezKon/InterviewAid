# 3696. Maximum Distance Between Unequal Words in Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-distance-between-unequal-words-in-array-i](https://leetcode.com/problems/maximum-distance-between-unequal-words-in-array-i)
**Companies:** Walmart Labs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Two Pointers — O(n)](#approach-two-pointers--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of words, find the maximum distance `j - i` such that `words[i] != words[j]`.

---

## Key Insight

> The max distance is between the first and last elements — check if they're different. If equal, try first vs second-to-last, or second vs last. Effectively, check from both ends inward.

---

## Approach: Two Pointers — O(n) ✅

```
FUNCTION maxDistance(words):
    i, j = 0, len(words) - 1
    WHILE i < j:
        IF words[i] != words[j]: RETURN j - i
        i += 1; j -= 1
    RETURN 0
```

Alternatively, just check `words[0] != words[n-1]`, then try `words[0]` vs `words[n-2]` etc.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two pointers | **O(n)** | O(1) |

---

## Key Takeaway

> **Max distance between unequal elements: check endpoints first, then move inward.** The answer is almost always `n - 1`.
