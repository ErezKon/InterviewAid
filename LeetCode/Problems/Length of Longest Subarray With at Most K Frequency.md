# 2958. Length of Longest Subarray With at Most K Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency](https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency)
**Companies:** Amazon, Citadel, Google, Makemytrip

---

## 1. Problem Description

Find the longest subarray where no element appears more than `k` times.

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

| nums | k | Output |
|------|---|--------|
| [1,2,1,2,1,3,3] | 2 | 5 |
| [4,4,4,4] | 1 | 1 |

*Explanation*: In the first example the longest valid subarray is `[1,2,1,2,1]` where each number appears at most twice.

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
