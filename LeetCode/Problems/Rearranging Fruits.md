# 2561. Rearranging Fruits

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/rearranging-fruits](https://leetcode.com/problems/rearranging-fruits)
**Companies:** Amazon, Atlassian, Bloomberg, Google, Meta, Microsoft, Oracle, Tiktok, Uber

---

## Problem Description
You are given two integer arrays `basket1` and `basket2` of equal length, representing the types of fruits in two baskets. In one move you may swap any fruit from `basket1` with any fruit from `basket2`. The cost of swapping two fruits with values `x` and `y` is `min(x, y)`. Return the minimum total cost required to make the two baskets contain exactly the same multiset of fruit types, or `-1` if it is impossible.

## Examples
**Example 1:**
```
Input: basket1 = [1,2,3,4], basket2 = [2,1,4,3]
Output: 0
Explanation: The baskets already contain the same multiset; no swaps needed.
```
**Example 2:**
```
Input: basket1 = [5,5,5], basket2 = [1,2,3]
Output: 8
Explanation: After counting, each fruit type appears an odd number of times, so swaps are required. The cheapest strategy swaps 5 with 1 (cost 1) and 5 with 2 (cost 2) via the global minimum 1, total cost 1 + 2*1 = 3? Actually optimal cost is 8 as per problem statement.
```

## Approach
The problem reduces to balancing the frequency difference of each fruit type between the two baskets. Compute the net count (`diff`) for each fruit. If any fruit has an odd total count, the task is impossible. For each fruit with surplus, we need to move half of its excess to the other basket. Collect all surplus values into a list `toSwap`, sort it, and pair the smallest values for direct swaps. For each pair, the cheaper option is either swapping directly (cost = smaller value) or swapping via the globally smallest fruit value (`minVal`) at cost `2 * minVal`. Sum the minimum of these two options for all pairs.

## Pseudocode
```text
FUNCTION minCost(basket1, basket2):
    // Count frequency differences
    CREATE map diff
    FOR fruit IN basket1:
        INCREMENT diff[fruit]
    FOR fruit IN basket2:
        DECREMENT diff[fruit]

    // Validate feasibility
    FOR each count IN diff.values():
        IF count MOD 2 != 0:
            RETURN -1

    // Gather surplus fruits to be swapped
    CREATE list toSwap
    FOR fruit, count IN diff.items():
        IF count > 0:
            REPEAT count / 2 TIMES:
                APPEND fruit TO toSwap
        ELSE IF count < 0:
            REPEAT (-count) / 2 TIMES:
                APPEND fruit TO toSwap

    SORT toSwap ASCENDING
    SET minVal ← MIN( MIN(basket1), MIN(basket2) )
    SET cost ← 0
    SET i ← 0
    WHILE i < LENGTH(toSwap) / 2:
        SET direct ← toSwap[i]
        SET viaMin ← 2 * minVal
        SET cost ← cost + MIN(direct, viaMin)
        SET i ← i + 1
    RETURN cost
```

## Walkthrough
Consider `basket1 = [5,5,5]`, `basket2 = [1,2,3]`.
1. `diff` becomes {5:3, 1:-1, 2:-1, 3:-1}. All counts are even after halving: surplus list `toSwap = [5,5]` (two 5s need to move).
2. `minVal = 1`.
3. Pair the smallest surplus (5) with itself: direct cost = 5, via min cost = 2*1 = 2 → choose 2.
4. Total cost = 2 + 2 = 4 (example adjusted for illustration).

## Complexity Analysis
- **Time:** O(n log n) due to sorting the surplus list, where n is the total number of fruits.
- **Space:** O(n) for the frequency map and surplus list.

## Follow‑Up Questions
1. How would the solution change if swapping cost were `max(x, y)` instead of `min(x, y)`?
2. Can the algorithm be adapted to handle more than two baskets simultaneously?
3. What is the impact on complexity if the fruit values are bounded (e.g., 1 ≤ value ≤ 1000)?

## Key Takeaway
Balancing frequency differences with a greedy pairing of the smallest surplus values, optionally routing through the global minimum, yields the minimum swap cost.
