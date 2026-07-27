# 962. Maximum Width Ramp

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-width-ramp](https://leetcode.com/problems/maximum-width-ramp)
**Companies:** Accenture, Amazon, Bloomberg, De Shaw, Google, Microsoft, Tiktok, Zepto

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

A **ramp** in array `nums` is a pair `(i, j)` where `i < j` and `nums[i] ≤ nums[j]`. The **width** of the ramp is `j - i`. Return the **maximum width** of a ramp in `nums`, or `0` if none exists.

**Constraints:**
- `2 ≤ nums.length ≤ 5 × 10⁴`
- `0 ≤ nums[i] ≤ 5 × 10⁴`

---

## Examples

**Example 1:**
```
Input:  nums = [6, 0, 8, 2, 1, 5]
Output: 4
Explanation: Ramp (1, 5): nums[1]=0 ≤ nums[5]=5, width = 5-1 = 4.
```

**Example 2:**
```
Input:  nums = [9, 8, 1, 0, 1, 9, 4, 0, 4, 1]
Output: 7
Explanation: Ramp (2, 9): nums[2]=1 ≤ nums[9]=1, width = 7.
```

---

## Key Insight

> Build a **monotonically decreasing stack** of indices (potential left endpoints). Then scan from the **right** — for each `j`, pop stack entries where `nums[stack.top] ≤ nums[j]`, since that pair forms a valid ramp and no future `j` (further left) could make a wider one with that same `i`.

---

## Approach: Monotonic Stack — O(n) ✅

```
FUNCTION maxWidthRamp(nums):
    n ← LEN(nums)
    
    // Phase 1: Build decreasing stack of indices (potential left endpoints)
    stack ← []
    FOR i ← 0 TO n - 1 DO
        IF stack IS EMPTY OR nums[stack.TOP] > nums[i] THEN
            stack.PUSH(i)

    // Phase 2: Scan from right, pop when valid ramp found
    maxWidth ← 0
    FOR j ← n - 1 DOWN TO 0 DO
        WHILE stack NOT EMPTY AND nums[stack.TOP] ≤ nums[j] DO
            maxWidth ← MAX(maxWidth, j - stack.POP())

    RETURN maxWidth
```

---

## Walkthrough

```
nums = [6, 0, 8, 2, 1, 5]

Phase 1 — Build decreasing stack:
  i=0: stack=[], push 0.  stack=[0]  (val 6)
  i=1: nums[0]=6 > nums[1]=0, push 1. stack=[0,1]  (vals 6,0)
  i=2: nums[1]=0 < 8, skip
  i=3: nums[1]=0 < 2, skip
  i=4: nums[1]=0 < 1, skip
  i=5: nums[1]=0 < 5, skip
  Final stack = [0, 1]  (indices with values 6, 0)

Phase 2 — Scan right to left:
  j=5 (val=5): nums[1]=0 ≤ 5 → pop 1, width=5-1=4, maxWidth=4
               nums[0]=6 > 5 → stop
  j=4 (val=1): stack=[0], nums[0]=6 > 1 → skip
  j=3 (val=2): nums[0]=6 > 2 → skip
  j=2 (val=8): nums[0]=6 ≤ 8 → pop 0, width=2-0=2, maxWidth=4
  
Return 4 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Monotonic stack (two passes) | **O(n)** | **O(n)** |
| Sort indices by value | O(n log n) | O(n) |
| Brute force | O(n²) | O(1) |

---

## Follow-Up Questions

1. **Why only push to the stack when the value is strictly decreasing?** Any index `i` with `nums[i] ≥ nums[earlier_in_stack]` can never be a better left endpoint — the earlier index gives a wider ramp.
2. **Why scan right-to-left in phase 2?** We want the widest ramp, so starting from the rightmost `j` ensures the first valid pair for each stack entry is the widest possible.
3. **Why pop (not peek)?** Once we find a ramp `(i, j)`, no future `j' < j` can do better with this `i`, so we safely discard it.

---

## Key Takeaway

> **Monotonic stack with reverse scan** solves "maximum width ramp" in O(n) — build potential left endpoints in a decreasing stack, then greedily match from the right.

---
