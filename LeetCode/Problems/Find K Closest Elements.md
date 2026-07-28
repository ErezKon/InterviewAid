# 658. Find K Closest Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-closest-elements](https://leetcode.com/problems/find-k-closest-elements)
**Companies:** Amazon, Apple, Atlassian, Bloomberg, Cashfree, Coupang, Doordash, Flipkart, Google, Infosys, Linkedin, Meta, Microsoft, Nvidia, Salesforce, Tcs, Tiktok, Uber, Yandex

---

## Problem Description

Given a sorted array, find the `k` closest elements to `x`. Return them sorted in ascending order.

---

## Examples

**Example 1:**
```
arr = [1,2,3,4,5]
k = 4
x = 3
Output: [1,2,3,4]
```
Explanation: The four elements closest to 3 are 1,2,3,4.

**Example 2:**
```
arr = [1,2,3,4,5]
k = 4
x = -1
Output: [1,2,3,4]
```
Explanation: All elements are greater than -1, so the first four are returned.

---

## Approach: Binary Search for Window Start — O(log(n-k) + k) ✅

```text
FUNCTION findClosestElements(arr, k, x):
    SET lo ← 0
    SET hi ← LENGTH(arr) - k
    WHILE lo < hi:
        SET mid ← (lo + hi) / 2
        // Compare distances at both ends of the window
        IF x - arr[mid] > arr[mid + k] - x:
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid
    RETURN SUBARRAY(arr, lo, lo + k - 1)
```

---

## Walkthrough

| Step | lo | hi | mid | Decision |
|------|----|----|-----|----------|
| 1 | 0 | 2 | 1 | `x - arr[1] = 2` vs `arr[1+4]-x = 5-3=2` → else → hi=1 |
| 2 | 0 | 1 | 0 | `x - arr[0] = 3-1=2` vs `arr[0+4]-x = 5-3=2` → else → hi=0 |
| End | lo=0 | → return arr[0..3] = [1,2,3,4] |

---

## Complexity Analysis

- **Time:** O(log(n‑k) + k) – binary search to locate window start, then O(k) to collect results.
- **Space:** O(1) – only constant extra variables.

---

## Follow-Up Questions

- How would you modify the solution to handle unsorted input?
- Can you solve it using a max‑heap of size k?
- How to return the result in descending order?

---

## Key Takeaway

> **Binary search for the optimal window start. Compare distances at window boundaries: `x - arr[mid]` vs `arr[mid+k] - x`. O(log(n-k) + k) total.**
