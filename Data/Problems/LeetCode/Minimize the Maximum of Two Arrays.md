# 2513. Minimize the Maximum of Two Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-maximum-of-two-arrays](https://leetcode.com/problems/minimize-the-maximum-of-two-arrays)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

We have two arrays `arr1` and `arr2` which are initially empty. You need to add positive integers to them such that they satisfy all the following conditions:

- `arr1` contains `uniqueCnt1` **distinct** positive integers, each of which is **not divisible** by `divisor1`.
- `arr2` contains `uniqueCnt2` **distinct** positive integers, each of which is **not divisible** by `divisor2`.
- **No** integer is present in both `arr1` and `arr2`.

Given `divisor1`, `divisor2`, `uniqueCnt1`, and `uniqueCnt2`, return *the **minimum possible maximum** integer that can be present in either array*.

**Constraints:**
- `2 ≤ divisor1, divisor2 ≤ 10⁵`
- `1 ≤ uniqueCnt1, uniqueCnt2 < 10⁹`
- `2 ≤ uniqueCnt1 + uniqueCnt2 ≤ 10⁹`

---

## Examples

```
Example 1:
  Input: divisor1 = 2, divisor2 = 7, uniqueCnt1 = 1, uniqueCnt2 = 3
  Output: 4
  Explanation:
  We can distribute the first 4 natural numbers into arr1 and arr2.
  arr1 = [1] and arr2 = [2,3,4].
  We can see that both arrays satisfy all the conditions.
  Since the maximum value is 4, we return it.
```

```
Example 2:
  Input: divisor1 = 3, divisor2 = 5, uniqueCnt1 = 2, uniqueCnt2 = 1
  Output: 3
  Explanation:
  Here arr1 = [1,2], and arr2 = [3] satisfy all conditions.
  Since the maximum value is 3, we return it.
```

```
Example 3:
  Input: divisor1 = 2, divisor2 = 4, uniqueCnt1 = 8, uniqueCnt2 = 2
  Output: 15
  Explanation:
  Here, the final possible arrays can be arr1 = [1,3,5,7,9,11,13,15], and arr2 = [2,6].
  It can be shown that it is not possible to obtain a lower maximum satisfying all conditions.
```

---

## Key Insight

> **Binary search on the answer `m`.** Among `[1..m]`, count available numbers:
> - For arr1 only: not divisible by d1 = `m - m/d1`
> - For arr2 only: not divisible by d2 = `m - m/d2`
> - For either: not divisible by both = `m - m/lcm(d1,d2)`
> - Use inclusion-exclusion to check if enough numbers exist for both arrays.

---

## Approach: Binary Search + Inclusion-Exclusion ✅

```text
FUNCTION minimizeSet(divisor1, divisor2, uniqueCnt1, uniqueCnt2):
    lcm ← LCM(divisor1, divisor2)
    lo ← 1
    hi ← 2 × 10⁹
    
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        // Numbers not divisible by d1
        forArr1 ← mid - mid / divisor1
        // Numbers not divisible by d2
        forArr2 ← mid - mid / divisor2
        // Numbers not divisible by either divisor
        forBoth ← mid - mid / lcm
        
        IF forArr1 ≥ uniqueCnt1 AND forArr2 ≥ uniqueCnt2 AND forBoth ≥ uniqueCnt1 + uniqueCnt2 THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    
    RETURN lo
```

---

## Walkthrough

Take the second example: `divisor1 = 4`, `divisor2 = 5`, `uniqueCnt1 = 2`, `uniqueCnt2 = 2`.

| Step | `mid` | `forArr1` | `forArr2` | `forBoth` | Feasible? |
|------|------|-----------|-----------|-----------|----------|
| 1 | 5 | 5-⌊5/4⌋=4 | 5-⌊5/5⌋=4 | 5-⌊5/20⌋=5 | Yes, but we can try lower |
| 2 | 3 | 3-⌊3/4⌋=3 | 3-⌊3/5⌋=3 | 3-⌊3/20⌋=3 | Not enough for both arrays (need 4 total) |
| 3 | 4 | 4-⌊4/4⌋=3 | 4-⌊4/5⌋=4 | 4-⌊4/20⌋=4 | Still insufficient |
| 4 | 7 | 7-⌊7/4⌋=5 | 7-⌊7/5⌋=6 | 7-⌊7/20⌋=7 | Feasible → answer `7`

The binary search converges to the smallest `mid` that satisfies all three counts.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + Inclusion-Exclusion | **O(log (2 × 10⁹))** | **O(1)** |

---

## Follow-Up Questions

- How would the solution adapt if the arrays could share numbers?
- What if the divisibility constraints were replaced by a generic predicate function?
- Can you extend the approach to minimize the **sum** of the selected numbers instead of the maximum?

---

## Key Takeaway

> **Binary search + inclusion-exclusion on divisibility** — count available numbers for each constraint using floor division and LCM. A clean mathematical binary search.

---