# 2958. Length of Longest Subarray With at Most K Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency](https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency)
**Companies:** Amazon, Citadel, Google, Makemytrip

---

## 1. Problem Description

You are given an integer array `nums` and an integer `k`.

The **frequency** of an element `x` is the number of times it occurs in an array.

An array is called **good** if the frequency of each element in this array is **less than or equal** to `k`.

Return *the length of the **longest good** subarray of* `nums`*.*

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= nums.length`

---

## 2. Approach: Sliding Window — O(n) ✅

```text
FUNCTION maxSubarrayLength(nums, k):
    // frequency map of elements in current window
    SET count ← empty map
    SET left ← 0
    SET maxLen ← 0
    FOR right ← 0 TO len(nums) - 1:
        SET count[nums[right]] ← count.get(nums[right], 0) + 1
        // shrink window while any element exceeds k
        WHILE count[nums[right]] > k:
            SET count[nums[left]] ← count[nums[left]] - 1
            SET left ← left + 1
        SET maxLen ← MAX(maxLen, right - left + 1)
    RETURN maxLen
```

---

## Examples

```
Example 1:
  Input: nums = [1,2,3,1,2,3,1,2], k = 2
  Output: 6
  Explanation: The longest possible good subarray is [1,2,3,1,2,3] since the values 1, 2, and 3 occur at most twice in this subarray.
  Note that the subarrays [2,3,1,2,3,1] and [3,1,2,3,1,2] are also good.
  It can be shown that there are no good subarrays with length more than 6.
```

```
Example 2:
  Input: nums = [1,2,1,2,1,2,1,2], k = 1
  Output: 2
  Explanation: The longest possible good subarray is [1,2] since the values 1 and 2 occur at most once in this subarray.
  Note that the subarray [2,1] is also good.
  It can be shown that there are no good subarrays with length more than 2.
```

```
Example 3:
  Input: nums = [5,5,5,5,5,5,5], k = 4
  Output: 4
  Explanation: The longest possible good subarray is [5,5,5,5] since the value 5 occurs 4 times in this subarray.
  It can be shown that there are no good subarrays with length more than 4.
```

---

## Walkthrough

Consider the first example `[1,2,1,2,1,3,3]` with `k = 2`.

| Step | left | right | window | counts | maxLen |
|------|------|-------|--------|--------|--------|
| init | 0 | - | [] | {} | 0 |
| 1 | 0 | 0 | [1] | {1:1} | 1 |
| 2 | 0 | 1 | [1,2] | {1:1,2:1} | 2 |
| 3 | 0 | 2 | [1,2,1] | {1:2,2:1} | 3 |
| 4 | 0 | 3 | [1,2,1,2] | {1:2,2:2} | 4 |
| 5 | 0 | 4 | [1,2,1,2,1] | {1:3,2:2} → shrink left until count[1] ≤ 2 → left=1, window=[2,1,2,1] | {1:2,2:2} | 5 |
| … | … | … | … | … | 5 |

The algorithm maintains the longest length seen, which is 5.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

The sliding window scans each element at most twice. The hash map stores frequencies of distinct elements.

---

## Follow-Up Questions

1. How would the solution change if the subarray must contain exactly `k` distinct numbers?
2. Can you adapt the algorithm to return the actual subarray instead of its length?
3. What if the array is streamed and you cannot store the entire frequency map?

---

## Key Takeaway

> Standard sliding window with frequency counter. Shrink left when any element exceeds frequency `k`.
