# 2605. Form Smallest Number From Two Digit Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/form-smallest-number-from-two-digit-arrays](https://leetcode.com/problems/form-smallest-number-from-two-digit-arrays)
**Companies:** Tinkoff

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Set Intersection — O(1) ✅](#3-approach-set-intersection--o1-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given two arrays of digits, form the smallest number that contains at least one digit from each array.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 9`
- Each element is a digit `0-9`

---

## 2. Examples

| nums1 | nums2 | Output |
|-------|-------|--------|
| [4,1,3] | [5,7] | 14 |
| [0,5,6] | [0,1] | 0 |
| [2,8] | [3,9] | 23 |

*Explanation:* In the first example, the smallest common digit is `1`, so the answer is `1`. In the second example, `0` appears in both arrays, yielding `0`. In the third example, there is no common digit; the smallest two‑digit number formed by the minima `2` and `3` is `23`.

---

## 3. Approach: Set Intersection — O(1) ✅

```text
FUNCTION minNumber(nums1, nums2):
    common ← SET(nums1) ∩ SET(nums2)
    IF common IS NOT EMPTY THEN
        RETURN MIN(common)
    // No common digit: combine smallest from each
    a ← MIN(nums1)
    b ← MIN(nums2)
    RETURN MIN(a * 10 + b, b * 10 + a)
```

---

## 4. Walkthrough

Consider `nums1 = [4,1,3]` and `nums2 = [5,7]`:
1. Build sets: `{1,3,4}` and `{5,7}`.
2. Intersection is empty.
3. Minimum of `nums1` is `1`; minimum of `nums2` is `5`.
4. Form two candidates: `1*10+5 = 15` and `5*10+1 = 51`.
5. Return the smaller, `15`.

If the arrays were `[0,5,6]` and `[0,1]`:
1. Intersection contains `0`.
2. Return `0` directly.

---

## 5. Complexity Analysis

- **Time:** O(n + m) to build the two sets, where `n` and `m` are the lengths of the arrays (≤9).
- **Space:** O(1) extra space because the digit domain is limited to 10 values.

---

## 6. Follow-Up Questions

- How would the solution change if the arrays could contain numbers larger than a single digit?
- Can you extend the approach to return the smallest *k*-digit number meeting the same condition?
- What if the arrays are extremely large (millions of elements)?

---

## 7. Key Takeaway

> Use a hash set to detect a common digit instantly; otherwise, combine the smallest digits from each array to form the minimal two‑digit number.
