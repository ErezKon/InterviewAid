# 3192. Minimum Operations to Make Binary Array Elements Equal to One II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-ii](https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-ii)
**Companies:** Uber

---

## Problem Description
You are given a binary array `nums`.

You can do the following operation on the array **any** number of times (possibly zero):

- Choose **any** index `i` from the array and **flip** **all** the elements from index `i` to the end of the array.

**Flipping** an element means changing its value from 0 to 1, and from 1 to 0.

Return the **minimum** number of operations required to make all elements in `nums` equal to 1.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 1`

## Examples

```
Example 1:
  Input: nums = [0,1,1,0,1]
  Output: 4
  Explanation: We can do the following operations:
  - Choose the index i = 1. The resulting array will be nums = [0,0,0,1,0].
  - Choose the index i = 0. The resulting array will be nums = [1,1,1,0,1].
  - Choose the index i = 4. The resulting array will be nums = [1,1,1,0,0].
  - Choose the index i = 3. The resulting array will be nums = [1,1,1,1,1].
```

```
Example 2:
  Input: nums = [1,0,0,0]
  Output: 1
  Explanation: We can do the following operation:
  - Choose the index i = 1. The resulting array will be nums = [1,1,1,1].
```

## Approach
Flipping two adjacent bits toggles their parity together. Observe that the parity (odd/even) of the total number of `0`s changes by either `0` or `2` after each operation, so the parity of the count of `0`s is invariant. Therefore, if the initial number of `0`s is odd, reaching all `1`s is impossible.

When the count of `0`s is even, a greedy left-to-right scan works: whenever we see a `0` at position `i` (and `i < n-1`), we flip the pair `(i, i+1)`. This eliminates the `0` at `i` and may create or remove a `0` at `i+1`, which will be handled later in the scan.

**Algorithm**
1. Count zeros. If odd → return `-1`.
2. Initialise `ops = 0`.
3. Iterate `i` from `0` to `n-2`:
   - If `nums[i] == 0`, flip `i` and `i+1`, increment `ops`.
4. After the loop, all elements are `1`; return `ops`.

**Pseudocode**
```text
FUNCTION minOperations(nums):
    SET zeroCount ← 0
    FOR each v IN nums:
        IF v = 0:
            SET zeroCount ← zeroCount + 1
    IF zeroCount MOD 2 = 1:
        RETURN -1
    SET ops ← 0
    SET n ← LENGTH(nums)
    FOR i ← 0 TO n - 2:
        IF nums[i] = 0:
            // flip two consecutive bits
            SET nums[i] ← 1 - nums[i]
            SET nums[i+1] ← 1 - nums[i+1]
            SET ops ← ops + 1
    RETURN ops
```

## Walkthrough
Example `nums = [0,1,0,1]`:
| i | nums before | Action | nums after | ops |
|---|-------------|--------|------------|-----|
|0|[0,1,0,1]|flip at 0|[1,0,0,1]|1|
|1|[1,0,0,1]|flip at 1|[1,1,1,1]|2|
Loop ends – all `1`s, return `2`.

## Complexity Analysis
- **Time:** `O(n)` – single pass.
- **Space:** `O(1)` – in-place modifications.

## Follow-Up Questions
1. How would the solution change if the operation flipped three consecutive bits instead of two?
2. Can you compute the minimum number of operations without modifying the input array?
3. What if the target value is `0` instead of `1`?

## Key Takeaway
If the number of zeros is even, a simple left-to-right greedy flip of each leading zero yields the minimal operations; an odd zero count makes the goal impossible.
