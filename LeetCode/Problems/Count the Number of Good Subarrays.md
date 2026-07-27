# 2537. Count the Number of Good Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-good-subarrays](https://leetcode.com/problems/count-the-number-of-good-subarrays)
**Companies:** Amazon, Google, Meta, Microsoft, Roblox, Tiktok, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A subarray is **good** if it has at least `k` pairs of equal elements `(i, j)` where `i < j`. Return the count of good subarrays.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^9`

---

## Key Insight

When adding element `x` to the window, it forms `count[x]` new pairs (one with each existing `x`). Use a sliding window: when pairs ≥ k, all right-extensions are also valid → add `n - right`. Then shrink from the left (removing element `y` removes `count[y] - 1` pairs).

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION countGood(nums, k):
    count = Counter()
    pairs = 0
    left = 0
    result = 0

    FOR right ← 0 TO n - 1:
        pairs += count[nums[right]]
        count[nums[right]] += 1

        WHILE pairs >= k:
            result += n - right    // all extensions are valid
            count[nums[left]] -= 1
            pairs -= count[nums[left]]
            left += 1

    RETURN result
```

---

## Walkthrough

**Input:** `nums = [1,1,1,1,1], k = 10`

```
right=0: count[1]=0→1, pairs=0
right=1: pairs+=1→1, count[1]=2
right=2: pairs+=2→3, count[1]=3
right=3: pairs+=3→6, count[1]=4
right=4: pairs+=4→10 ≥ 10
  → result += 5-4 = 1, shrink: count[1]=3, pairs -= 3 → 7 < 10

Result: 1 (only the full array has ≥ 10 pairs)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — each element enters/leaves once |
| **Space** | O(n) — frequency counter |

---

## Key Takeaway

> **Counting equal-element pairs in a sliding window: adding element x creates `count[x]` new pairs, removing x destroys `count[x]-1` pairs. When threshold is met, count all right-extensions.**
