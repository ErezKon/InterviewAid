# 1534. Count Good Triplets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-good-triplets](https://leetcode.com/problems/count-good-triplets)
**Companies:** Amazon, Bloomberg, Google, Meta, Turvo

---

## Problem Description

Given an array of integers `arr`, and three integers `a`, `b` and `c`. You need to find the number of good triplets.

A triplet `(arr[i], arr[j], arr[k])` is **good** if the following conditions are true:

- `0 <= i < j < k < arr.length`
- `|arr[i] - arr[j]| <= a`
- `|arr[j] - arr[k]| <= b`
- `|arr[i] - arr[k]| <= c`

Where `|x|` denotes the absolute value of `x`.

Return* the number of good triplets*.

**Constraints:**
- `3 <= arr.length <= 100`
- `0 <= arr[i] <= 1000`
- `0 <= a, b, c <= 1000`

## Examples

**Example 1:**
```
Input: arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
Output: 4
Explanation: There are 4 good triplets: [(3,0,1), (3,0,1), (3,1,1), (0,1,1)].
```

**Example 2:**
```
Input: arr = [1,1,2,2,3], a = 0, b = 0, c = 1
Output: 0
Explanation: No triplet satisfies all conditions.
```

## Approach
The constraints are small enough for a straightforward triple-nested loop. For each `i`, iterate `j > i` and early-continue if the first condition fails. Then iterate `k > j` and check the remaining two conditions. This avoids unnecessary work when the first condition is violated.

```text
FUNCTION countGoodTriplets(arr, a, b, c):
    SET n ← LENGTH(arr)
    SET count ← 0
    FOR i ← 0 TO n - 3:
        FOR j ← i + 1 TO n - 2:
            IF ABS(arr[i] - arr[j]) > a:
                CONTINUE
            FOR k ← j + 1 TO n - 1:
                IF ABS(arr[j] - arr[k]) ≤ b AND ABS(arr[i] - arr[k]) ≤ c:
                    SET count ← count + 1
    RETURN count
```

## Walkthrough
Consider the first example `arr = [3,0,1,1,9,7]` with `a=7, b=2, c=3`.
| i | j | k | Condition 1 | Condition 2 | Condition 3 | Count increment |
|---|---|---|-------------|-------------|-------------|----------------|
|0|2|3|`|3-1|=2 ≤7`|`|1-1|=0 ≤2`|`|3-1|=2 ≤3`|Yes (+1)|
|0|2|4|`|3-9|=6 ≤7`|`|1-9|=8 >2`|—|No|
|0|3|4|…|…|…|No|
|2|3|4|`|1-1|=0 ≤7`|`|1-9|=8 >2`|—|No|
The loop finds the four valid triplets listed in the output.

## Complexity Analysis
- **Time:** O(n³) in the worst case, where `n` is the length of `arr`.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you improve the runtime if `n` were up to 10⁵?
2. Can the problem be solved using prefix sums or binary indexed trees?
3. How would the solution change if the array were sorted first?

## Key Takeaway
A simple triple-nested loop with early pruning efficiently solves the problem for the given constraints.
