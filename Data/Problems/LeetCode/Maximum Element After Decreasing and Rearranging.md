# 1846. Maximum Element After Decreasing and Rearranging

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging](https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Greedy — O(n log n)](#approach-sort--greedy--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an array of positive integers `arr`. Perform some operations (possibly none) on `arr` so that it satisfies these conditions:

- The value of the **first** element in `arr` must be `1`.
- The absolute difference between any 2 adjacent elements must be **less than or equal to **`1`. In other words, `abs(arr[i] - arr[i - 1]) <= 1` for each `i` where `1 <= i < arr.length` (**0-indexed**). `abs(x)` is the absolute value of `x`.

There are 2 types of operations that you can perform any number of times:

- **Decrease** the value of any element of `arr` to a **smaller positive integer**.
- **Rearrange** the elements of `arr` to be in any order.

Return *the **maximum** possible value of an element in *`arr`* after performing the operations to satisfy the conditions*.

**Constraints:**
- `1 <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^9`

---

## Key Insight

> Sort the array. Walk through: each element can be at most `prev + 1`. Greedily set each to `min(arr[i], prev + 1)`. The final value is the answer.

---

## Approach: Sort + Greedy — O(n log n) ✅

```text
FUNCTION maximumElementAfterDecrementingAndRearranging(arr):
    SORT arr
    SET arr[0] ← 1
    FOR i ← 1 TO LEN(arr) - 1:
        SET arr[i] ← MIN(arr[i], arr[i-1] + 1)
    RETURN arr[LEN(arr) - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + greedy | **O(n log n)** | O(1) |

---

## Examples

**Example 1:**
```
Input: arr = [2,2,1,2,1]
Output: 2
Explanation: We can satisfy the conditions by rearranging arr so it becomes [1,2,2,2,1].
The largest element in arr is 2.
```

**Example 2:**
```
Input: arr = [100,1,1000]
Output: 3
Explanation: One possible way to satisfy the conditions is by doing the following:
1. Rearrange arr so it becomes [1,100,1000].
2. Decrease the value of the second element to 2.
3. Decrease the value of the third element to 3.
Now arr = [1,2,3], which satisfies the conditions.
The largest element in arr is 3.
```

**Example 3:**
```
Input: arr = [1,2,3,4,5]
Output: 5
Explanation: The array already satisfies the conditions, and the largest element is 5.
```

---

## Walkthrough

Consider `arr = [3,2,5,1,7]`.

1. **Sort** → `[1,2,3,5,7]`.
2. **Initialize** first element to `1`.
3. **i=1**: `min(2, 1+1)=2` → array `[1,2,3,5,7]`.
4. **i=2**: `min(3, 2+1)=3` → unchanged.
5. **i=3**: `min(5, 3+1)=4` → array `[1,2,3,4,7]`.
6. **i=4**: `min(7, 4+1)=5` → final array `[1,2,3,4,5]`.
7. Return last element `5`.

---

## Follow-Up Questions

- How would the solution change if the first element could be any value?
- Can you solve the problem in O(n) time without sorting?
- What if the adjacency constraint was `|a[i] - a[i-1]| ≤ k` for a given `k`?

---

## Key Takeaway

> **Sort and greedily cap each element to prev + 1.** This maximizes the achievable final value under the adjacency constraint.
