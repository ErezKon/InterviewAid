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

Given `uniqueCnt1` and `uniqueCnt2` (number of elements needed for two arrays), and `divisor1` and `divisor2` (arr1 elements must NOT be divisible by divisor1, arr2 by divisor2), minimize the **maximum** element across both arrays. Elements can't be shared.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `divisor1 = 2`, `divisor2 = 3`, `uniqueCnt1 = 1`, `uniqueCnt2 = 1` | `2` | The smallest numbers not divisible by 2 and 3 are 1 and 2. The maximum is 2. |
| `divisor1 = 4`, `divisor2 = 5`, `uniqueCnt1 = 2`, `uniqueCnt2 = 2` | `7` | Numbers not divisible by 4: {1,2,3,5,6,7,...}; not divisible by 5: {1,2,3,4,6,7,...}. The minimal max value that provides at least 2 numbers for each array is 7.

---

## Key Insight

> **Binary search on the answer `m`.** Among `[1..m]`, count available numbers:
> - For arr1 only: not divisible by d1 = `m - m/d1`
> - For arr2 only: not divisible by d2 = `m - m/d2`
> - For either: not divisible by both = `m - m/lcm(d1,d2)`
> - Use inclusion‑exclusion to check if enough numbers exist for both arrays.

---

## Approach: Binary Search + Inclusion‑Exclusion ✅

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
| 1 | 5 | 5‑⌊5/4⌋=4 | 5‑⌊5/5⌋=4 | 5‑⌊5/20⌋=5 | Yes, but we can try lower |
| 2 | 3 | 3‑⌊3/4⌋=3 | 3‑⌊3/5⌋=3 | 3‑⌊3/20⌋=3 | Not enough for both arrays (need 4 total) |
| 3 | 4 | 4‑⌊4/4⌋=3 | 4‑⌊4/5⌋=4 | 4‑⌊4/20⌋=4 | Still insufficient |
| 4 | 7 | 7‑⌊7/4⌋=5 | 7‑⌊7/5⌋=6 | 7‑⌊7/20⌋=7 | Feasible → answer `7`

The binary search converges to the smallest `mid` that satisfies all three counts.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + Inclusion‑Exclusion | **O(log (2 × 10⁹))** | **O(1)** |

---

## Follow-Up Questions

- How would the solution adapt if the arrays could share numbers?
- What if the divisibility constraints were replaced by a generic predicate function?
- Can you extend the approach to minimize the **sum** of the selected numbers instead of the maximum?

---

## Key Takeaway

> **Binary search + inclusion‑exclusion on divisibility** — count available numbers for each constraint using floor division and LCM. A clean mathematical binary search.

---