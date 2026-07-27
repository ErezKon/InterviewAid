# 658. Find K Closest Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-closest-elements](https://leetcode.com/problems/find-k-closest-elements)
**Companies:** Amazon, Apple, Atlassian, Bloomberg, Cashfree, Coupang, Doordash, Flipkart, Google, Infosys, Linkedin, Meta, Microsoft, Nvidia, Salesforce, Tcs, Tiktok, Uber, Yandex

---

## Approach: Binary Search for Window Start — O(log(n-k) + k) ✅

```
FUNCTION findClosestElements(arr, k, x):
    lo = 0
    hi = len(arr) - k

    WHILE lo < hi:
        mid = (lo + hi) / 2
        // Compare distances at both ends of the window
        IF x - arr[mid] > arr[mid + k] - x:
            lo = mid + 1
        ELSE:
            hi = mid

    RETURN arr[lo..lo+k-1]
```

---

## Problem Description

Given a sorted array, find the `k` closest elements to `x`. Return them sorted in ascending order.

---

## Key Takeaway

> **Binary search for the optimal window start. Compare distances at window boundaries: `x - arr[mid]` vs `arr[mid+k] - x`. O(log(n-k) + k) total.**

| Time | Space |
|------|-------|
| O(log(n-k) + k) | O(1) |
