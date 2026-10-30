# 3375. Minimum Operations to Make Array Values Equal to K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k](https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k)
**Companies:** Bloomberg, Google, Lowe, Microsoft

---

## Problem Description
You are given an integer array `nums` and an integer `k`.

An integer `h` is called **valid** if all values in the array that are **strictly greater** than `h` are *identical*.

For example, if `nums = [10, 8, 10, 8]`, a **valid** integer is `h = 9` because all `nums[i] > 9` are equal to 10, but 5 is not a **valid** integer.

You are allowed to perform the following operation on `nums`:

- Select an integer `h` that is *valid* for the **current** values in `nums`.
- For each index `i` where `nums[i] > h`, set `nums[i]` to `h`.

Return the **minimum** number of operations required to make every element in `nums` **equal** to `k`. If it is impossible to make all elements equal to `k`, return `-1`.

**Constraints:**
- `1 ≤ nums.length ≤ 100`
- `1 ≤ nums[i] ≤ 100`
- `1 ≤ k ≤ 100`

## Examples

```
Example 1:
  Input: nums = [5,2,5,4,5], k = 2
  Output: 2
  Explanation: The operations can be performed in order using valid integers 4 and then 2.
```

```
Example 2:
  Input: nums = [2,1,2], k = 2
  Output: -1
  Explanation: It is impossible to make all the values equal to 2.
```

```
Example 3:
  Input: nums = [9,7,5,3], k = 1
  Output: 4
  Explanation: The operations can be performed using valid integers in the order 7, 5, 3, and 1.
```

## Approach
The key insight is that any element larger than `k` can be turned into `k` in a single operation, regardless of its original value. Therefore, the number of required operations equals the count of **distinct** values greater than `k`. If any element is smaller than `k`, the task is impossible.

**Algorithm**
1. Scan the array to find the minimum value. If it is `< k`, return `-1`.
2. Use a hash set to collect all distinct numbers `> k`.
3. The answer is the size of this set.

**Pseudocode**
```text
FUNCTION minOperations(nums, k):
    SET minVal ← MINIMUM(nums)
    IF minVal < k:
        RETURN -1
    SET greaterSet ← EMPTY SET
    FOR each num IN nums:
        IF num > k:
            ADD num TO greaterSet
    RETURN SIZE(greaterSet)
```

## Walkthrough
Consider `nums = [3,2,2,4,5]`, `k = 2`.
| Step | num | Action | greaterSet |
|------|-----|--------|------------|
| 1 | 3 | 3 > 2 → add to set | {3} |
| 2 | 2 | 2 ≤ 2 → ignore | {3} |
| 3 | 2 | ignore | {3} |
| 4 | 4 | 4 > 2 → add | {3,4} |
| 5 | 5 | 5 > 2 → add | {3,4,5} |
After the scan, `greaterSet` size is `3`. Since no element is `< 2`, the answer is `3` operations.

## Complexity Analysis
- **Time:** `O(n)` – one pass through the array.
- **Space:** `O(m)` where `m` is the number of distinct values greater than `k` (at most `n`).

## Follow-Up Questions
1. What if each operation has a cost equal to the difference `x - k`? How would you minimize total cost?
2. How would the solution change if you could only decrease elements by 1 per operation?
3. Can you extend the approach to handle multiple target values instead of a single `k`?

## Key Takeaway
The minimum number of operations equals the count of distinct values greater than `k`; any smaller element makes the task impossible.
