# 3354. Make Array Elements Equal to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-array-elements-equal-to-zero](https://leetcode.com/problems/make-array-elements-equal-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Count valid starting positions (zeros) from which a cursor can make all elements zero by moving left/right and decrementing.

---

## 2. Approach: Prefix Sum Balance — O(n) ✅

```
FUNCTION countValidSelections(nums):
    total = SUM(nums)
    count = 0; leftSum = 0

    FOR i, num IN enumerate(nums):
        IF num == 0:
            IF leftSum == total - leftSum: count += 2
            ELSE IF ABS(leftSum - (total - leftSum)) == 1: count += 1
        leftSum += num

    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> At each zero position, compare left sum vs right sum. If equal, both directions work (+2). If differ by 1, only one direction works (+1).
