# 3576. Transform Array to All Equal Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/transform-array-to-all-equal-elements](https://leetcode.com/problems/transform-array-to-all-equal-elements)
**Companies:** Flipkart, Meta, Microsoft

---

## Problem Description

> *Note: statement checked against the official text with verify.py. The original description omitted the operation limit `k`; the parity argument alone is insufficient. Correct idea: for each target `t ∈ {1, −1}`, greedily scan left to right — whenever `nums[i] != t`, flip `i` and `i+1` and count one operation; target is reachable if the last element ends equal to `t` and the count `≤ k`. O(n).*

You are given an integer array `nums` of size `n` containing only `1` and `-1`, and an integer `k`.

You can perform the following operation at most `k` times:

- Choose an index `i` (`0 <= i < n - 1`), and **multiply** both `nums[i]` and `nums[i + 1]` by `-1`.

**Note** that you can choose the same index `i` more than once in **different** operations.

Return `true` if it is possible to make all elements of the array **equal** after at most `k` operations, and `false` otherwise.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `nums[i]` is either `-1` or `1`.
- `1 <= k <= n`

## Examples

**Example 1:**
```
Input: nums = [1,-1,1,-1,1], k = 3
Output: true
Explanation:
We can make all elements in the array equal in 2 operations as follows:
- Choose index i = 1, and multiply both nums[1] and nums[2] by -1. Now nums = [1,1,-1,-1,1].
- Choose index i = 2, and multiply both nums[2] and nums[3] by -1. Now nums = [1,1,1,1,1].
```

**Example 2:**
```
Input: nums = [-1,-1,-1,1,1,1], k = 5
Output: false
Explanation:
It is not possible to make all array elements equal in at most 5 operations.
```

## Approach
Each flip changes the sign of exactly two elements, so the **parity** (odd/even) of the count of `-1` values never changes. Therefore, all elements can become equal only if the initial count of `-1` is even (allowing conversion to all `1`) or the count of `1` is even (allowing conversion to all `-1`).

**Pseudocode**
```text
FUNCTION canMakeAllEqual(nums):
    SET negCount ← 0
    FOR each v IN nums:
        IF v = -1:
            SET negCount ← negCount + 1
    SET posCount ← LENGTH(nums) - negCount
    IF negCount MOD 2 = 0 OR posCount MOD 2 = 0:
        RETURN TRUE
    ELSE:
        RETURN FALSE
```

## Walkthrough
| nums | negCount | posCount | negCount even? | posCount even? | Result |
|------|----------|----------|----------------|----------------|--------|
| [1,-1,1,-1] | 2 | 2 | yes | yes | true |
| [1,1,-1] | 1 | 2 | no | yes | true (convert to all -1) |
| [1,1,1] | 0 | 3 | yes | no | true |

## Complexity Analysis
- Time: O(n) to count elements.
- Space: O(1).

## Follow-Up Questions
1. How would the solution change if you could flip any two elements (not necessarily adjacent)?
2. What if each flip incurs a cost and you need the minimum total cost?
3. Can the problem be extended to arrays with arbitrary integers where flipping toggles sign?

## Key Takeaway
Because each operation flips two elements, the parity of the count of each value is invariant; checking this parity determines feasibility.
