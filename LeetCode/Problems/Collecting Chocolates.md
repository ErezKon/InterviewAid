# 2735. Collecting Chocolates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/collecting-chocolates](https://leetcode.com/problems/collecting-chocolates)
**Companies:** Amazon, Deutsche Bank

---

## 1. Problem Description

Given `n` types of chocolates with costs `nums[i]`, and an operation that costs `x` and rotates all types by one position (each chocolate becomes the next type), find the minimum total cost to collect one of each type.

---

## 2. Key Insight

> After `k` rotations, chocolate type `i` can be bought at the minimum of `nums[i], nums[(i+1)%n], ..., nums[(i+k)%n]`. Total cost = sum of min costs for all types + `k × x`. Try all `k` from 0 to `n-1`.

---

## 3. Approach: Enumerate Rotations — O(n²) ✅

```
FUNCTION minCost(nums, x):
    n = len(nums)
    minCosts = list(nums)  // minCosts[i] = min cost for type i so far
    best = sum(nums)       // k = 0
    
    FOR k FROM 1 TO n-1:
        FOR i FROM 0 TO n-1:
            minCosts[i] = MIN(minCosts[i], nums[(i + k) % n])
        total = sum(minCosts) + k * x
        best = MIN(best, total)
    
    RETURN best
```

| Time | Space |
|------|-------|
| O(n²) | O(n) |

---

## Key Takeaway

> With n types and n possible rotations, track the running minimum cost per type across rotations. The optimal number of rotations balances rotation cost `k×x` against reduced chocolate prices.
