# 747. Largest Number At Least Twice of Others

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-number-at-least-twice-of-others](https://leetcode.com/problems/largest-number-at-least-twice-of-others)
**Companies:** Bloomberg, Google, Microsoft, Zoho

---

## 1. Problem Description

Return the index of the largest element if it's at least twice as large as every other element. Otherwise return -1.

---

## 2. Approach: Single Pass — O(n) ✅

```
FUNCTION dominantIndex(nums):
    maxIdx = argmax(nums)
    FOR i, num IN enumerate(nums):
        IF i != maxIdx AND nums[maxIdx] < 2 * num:
            RETURN -1
    RETURN maxIdx
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Find the max, then verify it's ≥ 2× every other element. Equivalently, just check against the second largest.
