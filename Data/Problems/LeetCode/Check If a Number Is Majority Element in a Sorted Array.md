# 1150. Check If a Number Is Majority Element in a Sorted Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array](https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array)
**Companies:** Salesforce

---

## 1. Problem Description

Given a **sorted** array and a target, check if target appears more than `n/2` times.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,2,2,3,4,5], target = 2
Output: true
Explanation: 2 appears 3 times out of 7 (> 7/2).
```

**Example 2:**
```
Input: nums = [1,1,2,2,3,3], target = 1
Output: false
Explanation: 1 appears only 2 times out of 6 (not > 6/2).
```

---

## 3. Approach: Binary Search — O(log n) ✅

```text
FUNCTION isMajorityElement(nums, target):
    // Find first occurrence of target
    left ← lowerBound(nums, target)
    // Find position just after last occurrence
    right ← upperBound(nums, target)
    count ← right - left
    RETURN count > LENGTH(nums) / 2
```

Because the array is sorted, `lowerBound` and `upperBound` can be implemented with binary search in O(log n).

---

## 4. Walkthrough

For `nums = [1,2,2,2,3,4,5]`, `target = 2`:
1. `lowerBound` finds index 1 (first `2`).
2. `upperBound` finds index 4 (position after last `2`).
3. `count = 4 - 1 = 3`.
4. Length `n = 7`; `3 > 7/2` → return `true`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(log n) – two binary searches |
| Space  | O(1) – only a few pointers |

---

## 6. Follow-Up Questions

* How would you solve this in O(1) extra space without binary search?
* Can you extend the method to find any element that appears more than `⌊n/k⌋` times?
* What if the array is not sorted – which algorithm would you use?

---

## Key Takeaway

> In a sorted array, binary search for the first and last occurrence of a target gives its count in O(log n). Comparing this count to `n/2` determines majority.
