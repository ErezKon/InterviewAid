# 217. Contains Duplicate

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/contains-duplicate](https://leetcode.com/problems/contains-duplicate)
**Companies:** Accenture, Adobe, Airbnb, Amazon, Apple, Bloomberg, Capgemini, Google, Ibm, Infosys, Meta, Microsoft, Netflix, Nvidia, Oracle, Palantir, Paycom, Tcs, Visa, Yahoo, Zoho

---

## 1. Problem Description

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## 2. Approach: Hash Set — O(n) ✅

```
FUNCTION containsDuplicate(nums):
    seen = set()
    FOR num IN nums:
        IF num IN seen: RETURN true
        seen.ADD(num)
    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

```
Example 1:
  Input: nums = [1,2,3,1]
  Output: true
  Explanation: The element 1 occurs at the indices 0 and 3.
```
```
Example 2:
  Input: nums = [1,2,3,4]
  Output: false
  Explanation: All elements are distinct.
```
```
Example 3:
  Input: nums = [1,1,1,3,3,4,3,2,4,2]
  Output: true
```

---

## 4. Walkthrough

```
nums = [1,2,3,1]
seen = {}
- num=1: not in seen → add 1
- num=2: not in seen → add 2
- num=3: not in seen → add 3
- num=1: already in seen → return true
```
The algorithm stops as soon as a duplicate is detected.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Alternatives

| Approach | Time | Space |
|----------|------|-------|
| **Hash Set** | **O(n)** | **O(n)** |
| Sort first | O(n log n) | O(1) |

---

## Key Takeaway

> The simplest hash set application. Also solvable by sorting and checking adjacent elements.
