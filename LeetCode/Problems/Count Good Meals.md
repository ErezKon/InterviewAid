# 1711. Count Good Meals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-good-meals](https://leetcode.com/problems/count-good-meals)
**Companies:** Amazon, Robinhood, Swiggy

---

## Problem Description
Given an array `deliciousness` where each element represents the deliciousness value of a meal, count the number of **good meal pairs**. A pair `(i, j)` is good if `i < j` and `deliciousness[i] + deliciousness[j]` is a power of two. Return the count modulo `10^9 + 7`.

## Examples
**Example 1:**
```
Input: deliciousness = [1,3,5,7,9]
Output: 4
Explanation: The good pairs are (1,3), (1,7), (3,5), (5,7).
```
**Example 2:**
```
Input: deliciousness = [1,1,1,3]
Output: 6
Explanation: All six possible pairs sum to 2 or 4, both powers of two.
```

## Approach
The key insight is that any power of two can be represented as `2^p` for `p` in `[0, 21]` because the maximum possible sum is `2 * 10^5`. For each element `d`, we look for previously seen values `target = 2^p - d`. A hash map stores frequencies of seen values, allowing O(1) lookup.

### Pseudocode
```text
FUNCTION countGoodMeals(deliciousness):
    MOD ← 1_000_000_007
    freq ← EMPTY MAP
    result ← 0
    FOR d IN deliciousness:
        FOR p FROM 0 TO 21:
            target ← (1 << p) - d
            IF target IN freq:
                result ← (result + freq[target]) MOD MOD
        freq[d] ← freq.get(d, 0) + 1
    RETURN result
```

## Walkthrough
Consider `deliciousness = [1,3,5]`.
| Step | d | freq before | Pairs added | freq after |
|------|---|-------------|-------------|------------|
| 1 | 1 | {} | 0 | {1:1} |
| 2 | 3 | {1:1} | target for 2^2=4 → 1 exists → +1 | {1:1,3:1} |
| 3 | 5 | {1:1,3:1} | target for 2^3=8 → 3 exists → +1 | {1:1,3:1,5:1} |
Result = 2 good pairs.

## Complexity Analysis
- **Time:** O(n * log C) where `C` is the maximum possible sum (≈21 iterations per element).
- **Space:** O(n) for the frequency map.

## Follow-Up Questions
1. How would the solution change if the array could contain negative values?
2. Can you extend the approach to count triples whose sum is a power of two?
3. What if the modulo constraint is removed—how would you handle potential overflow?

## Key Takeaway
Using a hash map to store frequencies of previously seen values lets us count good pairs in linear time by checking against all relevant powers of two.
