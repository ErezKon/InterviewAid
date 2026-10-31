# 659. Split Array into Consecutive Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-into-consecutive-subsequences](https://leetcode.com/problems/split-array-into-consecutive-subsequences)
**Companies:** Google, Phonepe

---

## Problem Description

You are given an integer array `nums` that is **sorted in non-decreasing order**.

Determine if it is possible to split `nums` into **one or more subsequences** such that **both** of the following conditions are true:

- Each subsequence is a **consecutive increasing sequence** (i.e. each integer is **exactly one** more than the previous integer).
- All subsequences have a length of `3` **or more**.

Return `true` *if you can split* `nums` *according to the above conditions, or* `false` *otherwise*.

A **subsequence** of an array is a new array that is formed from the original array by deleting some (can be none) of the elements without disturbing the relative positions of the remaining elements. (i.e., `[1,3,5]` is a subsequence of `[1,2,3,4,5]` while `[1,3,2]` is not).

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`
- `nums` is sorted in **non-decreasing** order.

## Examples

**Example 1:**
```
Input: nums = [1,2,3,3,4,5]
Output: true
Explanation: nums can be split into the following subsequences:
[1,2,3,3,4,5] --> 1, 2, 3
[1,2,3,3,4,5] --> 3, 4, 5
```

**Example 2:**
```
Input: nums = [1,2,3,3,4,4,5,5]
Output: true
Explanation: nums can be split into the following subsequences:
[1,2,3,3,4,4,5,5] --> 1, 2, 3, 4, 5
[1,2,3,3,4,4,5,5] --> 3, 4, 5
```

**Example 3:**
```
Input: nums = [1,2,3,4,4,5]
Output: false
Explanation: It is impossible to split nums into consecutive increasing subsequences of length 3 or more.
```

## Approach
Use a greedy strategy with two hash maps: `freq` counts remaining occurrences of each number, and `appendable` tracks how many subsequences end with a given value and thus can be extended. Iterate through `nums`; for each number, either append it to an existing subsequence or start a new one of length three using the next two numbers.

```text
FUNCTION isPossible(nums):
    SET freq ← MAP counting each number in nums
    SET appendable ← MAP default 0
    FOR num ← each element in nums:
        IF freq[num] == 0: CONTINUE
        SET freq[num] ← freq[num] - 1
        IF appendable[num] > 0:
            // extend existing subsequence ending at num-1
            SET appendable[num] ← appendable[num] - 1
            SET appendable[num + 1] ← appendable[num + 1] + 1
        ELSE IF freq[num + 1] > 0 AND freq[num + 2] > 0:
            // start new subsequence of length 3
            SET freq[num + 1] ← freq[num + 1] - 1
            SET freq[num + 2] ← freq[num + 2] - 1
            SET appendable[num + 3] ← appendable[num + 3] + 1
        ELSE:
            RETURN false
    RETURN true
```

## Walkthrough
For `nums = [1,2,3,3,4,5]`:
| Step | num | Action | freq after | appendable after |
|------|-----|--------|------------|-----------------|
| 1 | 1 | start new (needs 2,3) | {2:0,3:0,…} | {4:1} |
| 2 | 2 | used in start, freq 0 | … | … |
| 3 | 3 (first) | extend subsequence ending at 3 → now ends at 4 | … | {5:1} |
| 3 | 3 (second) | start new using 4,5 | … | {6:1} |
Result is true.

## Complexity Analysis
- **Time:** Each element processed O(1) → `O(n)`.
- **Space:** Hash maps store at most distinct numbers → `O(n)` in worst case.

## Follow-Up Questions
1. How would the algorithm change if subsequences could be of length 2?
2. Can the solution be adapted for unsorted input?
3. What if we need to output the actual subsequences, not just a boolean?

## Key Takeaway
Greedy use of frequency and pending-extension maps ensures we always extend existing sequences when possible, otherwise we must create a new length-three sequence, leading to an optimal linear-time solution.
