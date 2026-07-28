# 2389. Longest Subsequence With Limited Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-subsequence-with-limited-sum](https://leetcode.com/problems/longest-subsequence-with-limited-sum)
**Companies:** Amazon, Google, Meta, Uber

---

## 1. Problem Description

For each query, find the maximum number of elements from `nums` whose sum ≤ query value.

---

## 2. Examples

**Example 1:**
```
nums = [4,5,2,1]
queries = [3,10,21]
output = [1,3,4]
```
*Explanation:* After sorting `nums` → [1,2,4,5], prefix sums are [1,3,7,12]. For query 3, the largest index with prefix ≤3 is 1 (count = 1). For 10 → index = 3 (count = 3). For 21 → all 4 elements fit.

**Example 2:**
```
nums = [2,2,2]
queries = [1,2,3]
output = [0,1,1]
```
*Explanation:* No element fits query 1. For queries 2 and 3, only one element (value 2) can be taken.

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
| 1 | [1,2,4,5] | [0,1,3,7,12] | 3 | index = 2 → count = 1 | 1 |
| 2 | same | same | 10 | index = 4 → count = 3 | 3 |
| 3 | same | same | 21 | index = 5 → count = 4 | 4 |

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
