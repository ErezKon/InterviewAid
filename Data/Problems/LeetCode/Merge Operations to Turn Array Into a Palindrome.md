# 2422. Merge Operations to Turn Array Into a Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/merge-operations-to-turn-array-into-a-palindrome](https://leetcode.com/problems/merge-operations-to-turn-array-into-a-palindrome)
**Companies:** Accolite, Adobe, Amazon, Oracle, Tiktok

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an array `nums` consisting of **positive** integers.

You can perform the following operation on the array **any** number of times:

- Choose any two **adjacent** elements and **replace** them with their **sum**.
  - For example, if `nums = [1,2,3,1]`, you can apply one operation to make it `[1,5,1]`.

Return *the **minimum** number of operations needed to turn the array into a **palindrome***.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁶`

---

## Examples

```
Example 1:
  Input: nums = [4,3,2,1,2,3,1]
  Output: 2
  Explanation: We can turn the array into a palindrome in 2 operations as follows:
  - Apply the operation on the fourth and fifth element of the array, nums becomes equal to [4,3,2,3,3,1].
  - Apply the operation on the fifth and sixth element of the array, nums becomes equal to [4,3,2,3,4].
  The array [4,3,2,3,4] is a palindrome.
  It can be shown that 2 is the minimum number of operations needed.
```

```
Example 2:
  Input: nums = [1,2,3,4]
  Output: 3
  Explanation: We do the operation 3 times in any position, we obtain the array [10] at the end which is a palindrome.
```

---

## Key Insight

> Use **two pointers** from both ends. Compare the running sums at each end. If they're equal, move both inward. If the left sum is smaller, merge the next element on the left (advance left pointer and add). If the right sum is smaller, merge on the right. Each merge = one operation.

---

## Approach: Two Pointers — O(n) ✅

```
FUNCTION minimumOperations(nums):
    lo ← 0
    hi ← LEN(nums) - 1
    ops ← 0
    left ← nums[lo]
    right ← nums[hi]

    WHILE lo < hi DO
        IF left = right THEN
            lo ← lo + 1
            hi ← hi - 1
            left ← nums[lo]
            right ← nums[hi]
        ELSE IF left < right THEN
            lo ← lo + 1
            left ← left + nums[lo]
            ops ← ops + 1
        ELSE
            hi ← hi - 1
            right ← right + nums[hi]
            ops ← ops + 1

    RETURN ops
```

---

## Walkthrough

```
nums = [4, 3, 2, 1, 2, 3, 1]

lo=0, hi=6: left=4, right=1. left > right → merge right: right=1+3=4, ops=1, hi=5
lo=0, hi=5: left=4, right=4. Equal → advance both. lo=1, hi=4, left=3, right=2
lo=1, hi=4: left=3, right=2. left > right → merge right: right=2+1=3, ops=2, hi=3
lo=1, hi=3: left=3, right=3. Equal → advance both. lo=2, hi=2 → done

Return 2 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two pointers | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **Why does this greedy work?** The smaller side must merge with its neighbor to catch up — delaying the merge only increases operations.
2. **What if the array is already a palindrome?** Zero operations — all pairs match immediately.
3. **What if elements can be negative?** The two-pointer greedy may not work; would need DP instead.
4. **Relation to other problems?** Similar to "minimum moves to make array equal" with two-pointer balancing.

---

## Key Takeaway

> **Two-pointer palindrome balancing** — compare running sums from both ends; merge the smaller side to catch up. A greedy O(n) approach that works because merging only increases sums monotonically.

---
