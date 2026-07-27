# 3676. Count Bowl Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-bowl-subarrays](https://leetcode.com/problems/count-bowl-subarrays)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given an array `nums`, count subarrays that form a "bowl" shape — the array first strictly decreases then strictly increases (like a valley/bowl).

---

## 2. Key Insight

> A bowl subarray has a minimum point where the direction changes from decreasing to increasing. For each potential valley point, extend left (decreasing) and right (increasing) and count valid subarrays.

---

## 3. Approach: Two-Pointer / Counting — O(n) ✅

```
FUNCTION countBowlSubarrays(nums):
    n = len(nums)
    // Precompute: decLeft[i] = length of strictly decreasing run ending at i
    // incRight[i] = length of strictly increasing run starting at i
    decLeft = [1] * n
    incRight = [1] * n
    
    FOR i FROM 1 TO n-1:
        IF nums[i] < nums[i-1]: decLeft[i] = decLeft[i-1] + 1
    FOR i FROM n-2 DOWN TO 0:
        IF nums[i] < nums[i+1]: incRight[i] = incRight[i-1] + 1
    
    count = 0
    FOR i FROM 1 TO n-2:
        IF decLeft[i] > 1 AND incRight[i] > 1:  // valid valley
            count += (decLeft[i] - 1) * (incRight[i] - 1)
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Bowl (valley) subarrays: precompute decreasing run lengths from the left and increasing run lengths from the right. At each valley point, the count is the product of extensions.
