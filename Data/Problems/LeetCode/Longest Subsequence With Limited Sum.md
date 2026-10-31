# 2389. Longest Subsequence With Limited Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-subsequence-with-limited-sum](https://leetcode.com/problems/longest-subsequence-with-limited-sum)
**Companies:** Amazon, Google, Meta, Uber

---

## 1. Problem Description

You are given an integer array `nums` of length `n`, and an integer array `queries` of length `m`.

Return *an array *`answer`* of length *`m`* where *`answer[i]`* is the **maximum** size of a **subsequence** that you can take from *`nums`* such that the **sum** of its elements is less than or equal to *`queries[i]`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `n == nums.length`
- `m == queries.length`
- `1 <= n, m <= 1000`
- `1 <= nums[i], queries[i] <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: nums = [4,5,2,1], queries = [3,10,21]
Output: [2,3,4]
Explanation: We answer the queries as follows:
- The subsequence [2,1] has a sum less than or equal to 3. It can be proven that 2 is the maximum size of such a subsequence, so answer[0] = 2.
- The subsequence [4,5,1] has a sum less than or equal to 10. It can be proven that 3 is the maximum size of such a subsequence, so answer[1] = 3.
- The subsequence [4,5,2,1] has a sum less than or equal to 21. It can be proven that 4 is the maximum size of such a subsequence, so answer[2] = 4.
```

**Example 2:**
```
Input: nums = [2,3,4,5], queries = [1]
Output: [0]
Explanation: The empty subsequence is the only subsequence that has a sum less than or equal to 1, so answer[0] = 0.
```

---

## 3. Approach: Sort + Prefix Sum + Binary Search — O(n log n) ✅

```text
FUNCTION answerQueries(nums, queries):
    // sort numbers to consider smallest first
    SORT nums
    // build prefix sums where prefix[i] = sum of first i numbers
    SET prefix ← [0]
    FOR num IN nums:
        SET prefix.ADD(prefix[-1] + num)
    // answer each query via binary search on prefix sums
    RETURN [bisect_right(prefix, q) - 1 FOR q IN queries]
```

| Time | Space |
|------|-------|
| O(n log n + q log n) | O(n) |

---

## 4. Walkthrough

| Step | Sorted nums | Prefix sums | Query | Binary search result | Answer |
|------|-------------|-------------|-------|----------------------|--------|
| 1 | [1,2,4,5] | [0,1,3,7,12] | 3 | index = 2 → count = 1 | 1 |
| 2 | same | same | 10 | index = 4 → count = 3 | 3 |
| 3 | same | same | 21 | index = 5 → count = 4 | 4 |

---

## 5. Complexity Analysis

- Sorting: O(n log n)
- Building prefix array: O(n)
- Each query binary search: O(log n)
- Overall: O(n log n + q log n) time, O(n) extra space.

---

## 6. Follow-Up Questions

- How would you handle updates to `nums` (insertions/deletions) efficiently?
- Can you answer queries online without sorting each time?
- What if queries ask for the maximum sum ≤ target instead of count?

---

## 7. Key Takeaway

> Greedy: take smallest elements first to maximize count. Sort, prefix sum, then binary search for each query.
