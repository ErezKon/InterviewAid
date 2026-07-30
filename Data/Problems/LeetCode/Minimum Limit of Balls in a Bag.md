# 1760. Minimum Limit of Balls in a Bag

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Intuit, Meta, Microsoft, Porter

---

## Problem Description

Given an array `nums` where each element represents the number of balls in a bag, you may perform at most `maxOperations` operations. In one operation you can pick a bag with `x` balls and split it into two bags with `⌊x/2⌋` and `⌈x/2⌉` balls (or any split that sums to `x`). After all operations, the **maximum** number of balls in any bag should be as small as possible. Return that minimum possible maximum bag size.

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [9,7,5]`, `maxOperations = 2` | `5` | Split `9` into `5` and `4` (1 operation), split `7` into `4` and `3` (2nd operation). Bags become `[5,4,5,4,3]`; maximum is `5`.
| `nums = [2,4,8,2]`, `maxOperations = 4` | `3` | Split `8` into `3,3,2` using 3 operations, split one `4` into `2,2` using 1 operation. Final bags `[2,2,3,3,2,2,2]`; max = `3`.
| `nums = [1,1,1]`, `maxOperations = 0` | `1` | No operations allowed; maximum bag size is already `1`.

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
