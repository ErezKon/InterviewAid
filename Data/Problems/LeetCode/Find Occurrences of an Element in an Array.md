# 3159. Find Occurrences of an Element in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-occurrences-of-an-element-in-an-array](https://leetcode.com/problems/find-occurrences-of-an-element-in-an-array)
**Companies:** Amazon, Ibm, Jpmorgan

---

## Problem Description
You are given an integer array `nums`, an integer array `queries`, and an integer `x`.

For each `queries[i]`, you need to find the index of the `queries[i]`-th occurrence of `x` in the `nums` array. If there are fewer than `queries[i]` occurrences of `x`, the answer should be `-1` for that query.

Return an integer array `answer` containing the answers to all queries.

> Note: the answer is the **0-based** index (the old description and Approach below used 1-based positions).

**Constraints:**
- `1 <= nums.length, queries.length <= 10^5`
- `1 <= queries[i] <= 10^5`
- `1 <= nums[i], x <= 10^4`

## Examples
```
Example 1:
  Input: nums = [1,3,1,7], queries = [1,3,2,4], x = 1
  Output: [0,-1,2,-1]
  Explanation:
  - For the 1st query, the first occurrence of 1 is at index 0.
  - For the 2nd query, there are only two occurrences of 1 in nums, so the answer is -1.
  - For the 3rd query, the second occurrence of 1 is at index 2.
  - For the 4th query, there are only two occurrences of 1 in nums, so the answer is -1.
```

```
Example 2:
  Input: nums = [1,2,3], queries = [10], x = 5
  Output: [-1]
  Explanation: For the 1st query, 5 doesn't exist in nums, so the answer is -1.
```

## Approach
Pre-process the array to store all indices where `nums[i] == x` in a list `positions`. Then answer each query in O(1) by checking if `q` ≤ length of `positions`.

```text
FUNCTION findOccurrences(nums, queries, x):
    // Build list of 1-based positions of x
    SET positions ← []
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] == x:
            APPEND (i + 1) TO positions
    // Resolve each query
    SET result ← []
    FOR q IN queries:
        IF q ≤ LENGTH(positions):
            APPEND positions[q - 1] TO result
        ELSE:
            APPEND -1 TO result
    RETURN result
```

## Walkthrough
For `nums = [5,1,2,1,3,1]`, `x = 1`:
- Scan builds `positions = [2,4,6]`.
- Query `1` → `positions[0] = 2`.
- Query `2` → `positions[1] = 4`.
- Query `3` → `positions[2] = 6`.
- Query `4` → out of range → `-1`.
Result `[2,4,6,-1]`.

## Complexity Analysis
- **Time:** O(n + q) where `n` is length of `nums` and `q` number of queries.
- **Space:** O(k) for `k` occurrences of `x` (worst-case O(n)).

## Follow-Up Questions
1. How would you handle multiple different target values `x` in the same batch of queries?
2. Can you answer online queries where `nums` is updated dynamically?
3. What if queries ask for the value at the `q`-th occurrence instead of its position?

## Key Takeaway
Pre-computing the positions of the target value enables constant-time query answers, turning a potentially O(n·q) problem into linear preprocessing plus O(1) per query.
