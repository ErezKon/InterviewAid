# 2561. Rearranging Fruits

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/rearranging-fruits](https://leetcode.com/problems/rearranging-fruits)
**Companies:** Amazon, Atlassian, Bloomberg, Google, Meta, Microsoft, Oracle, Tiktok, Uber

---

## Problem Description
You have two fruit baskets containing `n` fruits each. You are given two **0-indexed** integer arrays `basket1` and `basket2` representing the cost of fruit in each basket. You want to make both baskets **equal**. To do so, you can use the following operation as many times as you want:

- Choose two indices `i` and `j`, and swap the `iᵗʰ` fruit of `basket1` with the `jᵗʰ` fruit of `basket2`.
- The cost of the swap is `min(basket1[i], basket2[j])`.

Two baskets are considered equal if sorting them according to the fruit cost makes them exactly the same baskets.

Return *the minimum cost to make both the baskets equal or* `-1` *if impossible.*

**Constraints:**

- `basket1.length == basket2.length`
- `1 <= basket1.length <= 10⁵`
- `1 <= basket1[i], basket2[i] <= 10⁹`

## Examples

```
Example 1:
  Input: basket1 = [4,2,2,2], basket2 = [1,4,1,2]
  Output: 1
  Explanation: Swap index 1 of basket1 with index 0 of basket2, which has cost 1. Now basket1 = [4,1,2,2] and basket2 = [2,4,1,2]. Rearranging both the arrays makes them equal.
```

```
Example 2:
  Input: basket1 = [2,3,4,1], basket2 = [3,2,5,1]
  Output: -1
  Explanation: It can be shown that it is impossible to make both the baskets equal.
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
Example 1: `basket1 = [4,2,2,2]`, `basket2 = [1,4,1,2]`.
1. `diff` = {4: 1-1 = 0, 2: 3-1 = 2, 1: 0-2 = -2}. All counts even → feasible.
2. `toSwap` = one `2` (surplus in basket1) + one `1` (surplus in basket2) → sorted `[1,2]`.
3. `minVal = 1`. Only `LENGTH(toSwap)/2 = 1` swap is needed.
4. i=0: direct = 1, viaMin = 2 → add 1.
5. Total cost = **1** (swap a `2` from basket1 with a `1` from basket2).

Example 2: `diff[4] = 1` and `diff[5] = -1` are odd → return **-1**.

## Complexity Analysis
- **Time:** O(n log n) due to sorting the surplus list, where n is the total number of fruits.
- **Space:** O(n) for the frequency map and surplus list.

## Follow-Up Questions
1. How would the solution change if swapping cost were `max(x, y)` instead of `min(x, y)`?
2. Can the algorithm be adapted to handle more than two baskets simultaneously?
3. What is the impact on complexity if the fruit values are bounded (e.g., 1 ≤ value ≤ 1000)?

## Key Takeaway
Balancing frequency differences with a greedy pairing of the smallest surplus values, optionally routing through the global minimum, yields the minimum swap cost.
