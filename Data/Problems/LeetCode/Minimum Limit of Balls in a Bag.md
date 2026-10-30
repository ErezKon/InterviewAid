# 1760. Minimum Limit of Balls in a Bag

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Intuit, Meta, Microsoft, Porter

---

## Problem Description

You are given an integer array `nums` where the `i^th` bag contains `nums[i]` balls. You are also given an integer `maxOperations`.

You can perform the following operation at most `maxOperations` times:

- Take any bag of balls and divide it into two new bags with a **positive **number of balls.

- For example, a bag of `5` balls can become two new bags of `1` and `4` balls, or two new bags of `2` and `3` balls.

Your penalty is the **maximum** number of balls in a bag. You want to **minimize** your penalty after the operations.

Return *the minimum possible penalty after performing the operations*.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= maxOperations, nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [9], maxOperations = 2
Output: 3
Explanation: - Divide the bag with 9 balls into two bags of sizes 6 and 3. [9] -> [6,3].
- Divide the bag with 6 balls into two bags of sizes 3 and 3. [6,3] -> [3,3,3].
The bag with the most number of balls has 3 balls, so your penalty is 3 and you should return 3.
```

**Example 2:**
```
Input: nums = [2,4,8,2], maxOperations = 4
Output: 2
Explanation: - Divide the bag with 8 balls into two bags of sizes 4 and 4. [2,4,8,2] -> [2,4,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,4,4,4,2] -> [2,2,2,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,4,4,2] -> [2,2,2,2,2,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,2,2,4,2] -> [2,2,2,2,2,2,2,2].
The bag with the most number of balls has 2 balls, so your penalty is 2, and you should return 2.
```

## Approach

**Binary Search on Answer — O(n log max)** ✅

```text
FUNCTION minimumSize(nums, maxOperations):
    lo ← 1
    hi ← MAX(nums)
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        // Compute required operations to make every bag ≤ mid
        ops ← 0
        FOR num IN nums:
            // Each bag of size num needs (num-1)//mid splits
            ops ← ops + (num - 1) / mid
        IF ops ≤ maxOperations:
            hi ← mid          // feasible, try smaller max size
        ELSE:
            lo ← mid + 1      // not feasible, increase lower bound
    RETURN lo
```

## Walkthrough

Consider `nums = [9,7,5]`, `maxOperations = 2`:

1. `lo=1`, `hi=9`. `mid=5`. Compute ops: `(9-1)//5 = 1`, `(7-1)//5 = 1`, `(5-1)//5 = 0` → `ops=2` ≤ `maxOperations`. Feasible, set `hi=5`.
2. `lo=1`, `hi=5`. `mid=3`. Ops: `(9-1)//3 = 2`, `(7-1)//3 = 2`, `(5-1)//3 = 1` → `ops=5` > `maxOperations`. Not feasible, set `lo=4`.
3. `lo=4`, `hi=5`. `mid=4`. Ops: `(9-1)//4 = 2`, `(7-1)//4 = 1`, `(5-1)//4 = 1` → `ops=4` > `maxOperations`. Not feasible, set `lo=5`.
4. Loop ends (`lo==hi==5`). Minimum possible maximum bag size is `5`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n log M) | O(1) |

`M` is the maximum initial bag size.

## Follow-Up Questions

* How would the solution change if you could also merge two bags in one operation?
* Can you adapt the algorithm to return the exact distribution of bag sizes after the optimal splits?
* What if the split operation must produce two *equal* halves (or differ by at most one)?

## Key Takeaway

> Binary search on the answer works because the feasibility predicate (can we achieve a given max size within `k` splits?) is monotonic.
