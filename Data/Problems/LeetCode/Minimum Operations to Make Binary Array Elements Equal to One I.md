# 3191. Minimum Operations to Make Binary Array Elements Equal to One I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i](https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
You are given a binary array `nums`.

You can do the following operation on the array **any** number of times (possibly zero):

- Choose **any** 3 **consecutive** elements from the array and **flip** **all** of them.

**Flipping** an element means changing its value from 0 to 1, and from 1 to 0.

Return the **minimum** number of operations required to make all elements in `nums` equal to 1. If it is impossible, return `-1`.

**Constraints:**
- `3 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 1`

## Examples

```
Example 1:
  Input: nums = [0,1,1,1,0,0]
  Output: 3
  Explanation: We can do the following operations:
  - Choose the elements at indices 0, 1 and 2. The resulting array is nums = [1,0,0,1,0,0].
  - Choose the elements at indices 1, 2 and 3. The resulting array is nums = [1,1,1,0,0,0].
  - Choose the elements at indices 3, 4 and 5. The resulting array is nums = [1,1,1,1,1,1].
```

```
Example 2:
  Input: nums = [0,1,1,1]
  Output: -1
  Explanation: It is impossible to make all elements equal to 1.
```

## Approach
The operation only affects a sliding window of size 3. A greedy left-to-right scan works: whenever we encounter a `0` at position `i` (where `i ≤ n-3`), we must flip the window starting at `i` because later operations cannot affect `nums[i]`. This ensures the earliest possible correction and yields the minimum number of flips.

**Algorithm**
1. Initialise `ops = 0`.
2. Iterate `i` from `0` to `n-3`:
   - If `nums[i] == 0`, flip `nums[i]`, `nums[i+1]`, `nums[i+2]` and increment `ops`.
3. After the loop, check the last two elements; if both are `1`, return `ops`, else `-1`.

**Pseudocode**
```text
FUNCTION minOperations(nums):
    SET ops ← 0
    SET n ← LENGTH(nums)
    FOR i ← 0 TO n - 3:
        IF nums[i] = 0:
            // flip three consecutive bits
            SET nums[i] ← 1 - nums[i]
            SET nums[i+1] ← 1 - nums[i+1]
            SET nums[i+2] ← 1 - nums[i+2]
            SET ops ← ops + 1
    IF nums[n-2] = 1 AND nums[n-1] = 1:
        RETURN ops
    ELSE:
        RETURN -1
```

## Walkthrough
Example `nums = [0,0,0,1,1]`:
| i | nums before | Action | nums after | ops |
|---|-------------|--------|------------|-----|
|0|[0,0,0,1,1]|flip at 0|[1,1,1,1,1]|1|
Loop ends. Last two are `1,1` → return `1`.

## Complexity Analysis
- **Time:** `O(n)` – single pass.
- **Space:** `O(1)` – in-place modifications.

## Follow-Up Questions
1. How would the solution change if the operation flipped exactly two consecutive bits?
2. Can you extend the algorithm to return the actual sequence of flip indices?
3. What if the target pattern for the last `k` bits is configurable?

## Key Takeaway
A left-to-right greedy scan that flips whenever a `0` is encountered yields the minimal number of three-bit flips needed to satisfy the final-two-bits condition.
