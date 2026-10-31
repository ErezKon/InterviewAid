# 2780. Minimum Index of a Valid Split

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-index-of-a-valid-split](https://leetcode.com/problems/minimum-index-of-a-valid-split)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

An element `x` of an integer array `arr` of length `m` is **dominant** if **more than half** the elements of `arr` have a value of `x`.

You are given a **0-indexed** integer array `nums` of length `n` with one **dominant** element.

You can split `nums` at an index `i` into two arrays `nums[0, ..., i]` and `nums[i + 1, ..., n - 1]`, but the split is only **valid** if:

- `0 <= i < n - 1`
- `nums[0, ..., i]`, and `nums[i + 1, ..., n - 1]` have the same dominant element.

Here, `nums[i, ..., j]` denotes the subarray of `nums` starting at index `i` and ending at index `j`, both ends being inclusive. Particularly, if `j < i` then `nums[i, ..., j]` denotes an empty subarray.

Return *the **minimum** index of a **valid split***. If no valid split exists, return `-1`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `nums` has exactly one dominant element.

## Approach: Boyer-Moore Majority Vote + Prefix Scan — O(n) ✅

```text
FUNCTION findValidSplit(nums):
    // 1. Find candidate dominant element using Boyer-Moore
    SET candidate ← None
    SET count ← 0
    FOR x IN nums:
        IF count = 0:
            SET candidate ← x; SET count ← 1
        ELSE IF x = candidate:
            SET count ← count + 1
        ELSE:
            SET count ← count - 1
    // 2. Verify candidate is truly dominant
    SET total ← 0
    FOR x IN nums:
        IF x = candidate: SET total ← total + 1
    IF total * 2 ≤ LENGTH(nums):
        RETURN -1  // no dominant element overall
    // 3. Scan to find earliest split where candidate stays dominant on both sides
    SET leftCount ← 0
    FOR i ← 0 TO LENGTH(nums) - 2:
        IF nums[i] = candidate: SET leftCount ← leftCount + 1
        SET leftSize ← i + 1
        SET rightSize ← LENGTH(nums) - leftSize
        IF leftCount * 2 > leftSize AND (total - leftCount) * 2 > rightSize:
            RETURN i
    RETURN -1
```

## Examples

**Example 1:**
```
Input: nums = [1,2,2,2]
Output: 2
Explanation: We can split the array at index 2 to obtain arrays [1,2,2] and [2].
In array [1,2,2], element 2 is dominant since it occurs twice in the array and 2 * 2 > 3.
In array [2], element 2 is dominant since it occurs once in the array and 1 * 2 > 1.
Both [1,2,2] and [2] have the same dominant element as nums, so this is a valid split.
It can be shown that index 2 is the minimum index of a valid split.
```

**Example 2:**
```
Input: nums = [2,1,3,1,1,1,7,1,2,1]
Output: 4
Explanation: We can split the array at index 4 to obtain arrays [2,1,3,1,1] and [1,7,1,2,1].
In array [2,1,3,1,1], element 1 is dominant since it occurs thrice in the array and 3 * 2 > 5.
In array [1,7,1,2,1], element 1 is dominant since it occurs thrice in the array and 3 * 2 > 5.
Both [2,1,3,1,1] and [1,7,1,2,1] have the same dominant element as nums, so this is a valid split.
It can be shown that index 4 is the minimum index of a valid split.
```

**Example 3:**
```
Input: nums = [3,3,3,3,7,2,2]
Output: -1
Explanation: It can be shown that there is no valid split.
```

## Walkthrough

1. **Find candidate** – Boyer-Moore cancels out non-dominant values, leaving 2 as candidate.
2. **Count total occurrences** – 2 appears 5 times, satisfying `5*2 > 7`.
3. **Prefix scan** – iterate indices:
   - i=0: leftCount=0 (1 is not 2) → left not dominant.
   - i=1: leftCount=1 → left 1/2 not dominant.
   - i=2: leftCount=2 → left 2/3 not dominant.
   - i=3: leftCount=3 → left 3/4 dominant, rightCount=2 → right 2/3 dominant → return 3.

## Complexity Analysis

- **Time:** O(n) – one pass for majority vote, one pass to count, one pass for prefix scan.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions

1. How would the solution change if there could be multiple dominant elements?
2. Can the algorithm be extended to find all valid split indices, not just the smallest?
3. What if the array is streamed and you cannot store it entirely in memory?

## Key Takeaway

> The overall dominant element must also dominate each half; using Boyer-Moore to find the candidate and a single prefix scan yields an O(n) solution.
