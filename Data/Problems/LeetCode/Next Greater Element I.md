# 496. Next Greater Element I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/next-greater-element-i](https://leetcode.com/problems/next-greater-element-i)
**Companies:** Accenture, Agoda, Amazon, Barclays, Bloomberg, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Morgan Stanley, Oracle, Swiggy, Tcs, Tiktok, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Monotonic Stack + Hash Map — O(m+n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

The **next greater element** of some element `x` in an array is the **first greater** element that is **to the right** of `x` in the same array.

You are given two **distinct 0-indexed** integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`.

For each `0 <= i < nums1.length`, find the index `j` such that `nums1[i] == nums2[j]` and determine the **next greater element** of `nums2[j]` in `nums2`. If there is no next greater element, then the answer for this query is `-1`.

Return *an array* `ans` *of length* `nums1.length` *such that* `ans[i]` *is the **next greater element** as described above.*

**Constraints:**

- `1 <= nums1.length <= nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 10^4`
- All integers in `nums1` and `nums2` are **unique**.
- All the integers of `nums1` also appear in `nums2`.

**Follow up:** Could you find an `O(nums1.length + nums2.length)` solution?

---

## 2. Examples

```
Example 1:
  Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
  Output: [-1,3,-1]
  Explanation: The next greater element for each value of nums1 is as follows:
  - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
  - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
  - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
```

```
Example 2:
  Input: nums1 = [2,4], nums2 = [1,2,3,4]
  Output: [3,-1]
  Explanation: The next greater element for each value of nums1 is as follows:
  - 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
  - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
```

---

## 3. Key Insight

> Build a next-greater map for all elements in `nums2` using a monotonic decreasing stack. Then look up each element of `nums1` in the map.

---

## 4. Approach: Monotonic Stack + Hash Map — O(m+n)

```text
FUNCTION nextGreaterElement(nums1, nums2):
    // Build map of next greater for each element in nums2
    SET stack ← []
    SET nextGreater ← {}
    FOR num IN nums2:
        WHILE stack NOT EMPTY AND stack.TOP() < num:
            SET prev ← stack.POP()
            SET nextGreater[prev] ← num
        stack.PUSH(num)
    // Remaining elements have no greater element
    WHILE stack NOT EMPTY:
        SET prev ← stack.POP()
        SET nextGreater[prev] ← -1
    // Resolve queries for nums1
    SET result ← []
    FOR x IN nums1:
        APPEND nextGreater.get(x, -1) TO result
    RETURN result
```

---

## 5. Walkthrough

Consider `nums1 = [4,1,2]`, `nums2 = [1,3,4,2]`.

| Step | Stack | nextGreater map |
|------|-------|-----------------|
| Process 1 | [1] | {} |
| Process 3 | [] | {1 → 3} (pop 1) then push 3 → [3] |
| Process 4 | [] | {1 → 3, 3 → 4} (pop 3) then push 4 → [4] |
| Process 2 | [4,2] | {1 → 3, 3 → 4} (no pop because 4 > 2) |
| End | [4,2] | Set remaining to -1 → {4 → -1, 2 → -1}

Lookup:
- 4 → -1
- 1 → 3
- 2 → -1
Result `[-1,3,-1]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m + n) where m = len(nums1), n = len(nums2) |
| **Space** | O(n) for the stack and map |

---

## 7. Follow-Up Questions

1. How would you modify the algorithm to handle duplicate values in `nums2`?
2. Can you solve the problem using only a hash map without a stack?
3. What changes are needed if the query array is not a subset of `nums2`?

---

## 8. Key Takeaway

> **Monotonic decreasing stack builds next-greater map in O(n).** Each element is pushed and popped at most once. The canonical pattern for "next greater element" queries.
