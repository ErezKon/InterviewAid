# 2832. Maximal Range That Each Element Is Maximum in It

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximal-range-that-each-element-is-maximum-in-it](https://leetcode.com/problems/maximal-range-that-each-element-is-maximum-in-it)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Monotonic Stack — O(n)](#approach-monotonic-stack--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 0-indexed array `nums` of **distinct** integers, for each element `nums[i]`, find the length of the maximal contiguous subarray in which `nums[i]` is the maximum element. Return an array `ans` where `ans[i]` is that length.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁵`
- All elements are distinct.

---

## Examples

**Example 1:**
```
Input:  nums = [1, 5, 4, 3, 6]
Output: [1, 4, 3, 2, 5]
Explanation:
  nums[0]=1: max in [1] only → 1
  nums[1]=5: max in [1,5,4,3] → 4
  nums[2]=4: max in [5,4,3] — no, [4,3] and [5,4,3]? Actually [4,3] → 2... 
  Need left/right boundaries via next greater element.
```

---

## Key Insight

> For each element, find the **nearest greater element on the left** (`left[i]`) and on the **right** (`right[i]`). The maximal range where `nums[i]` is maximum spans from `left[i]+1` to `right[i]-1`, giving length `right[i] - left[i] - 1`. This is exactly the classic **next greater element** problem solved with a monotonic stack.

---

## Approach: Monotonic Stack — O(n) ✅

```
FUNCTION maximalRange(nums):
    n = len(nums)
    left = [-1] * n       // index of nearest greater to the left
    right = [n] * n        // index of nearest greater to the right

    // Find nearest greater on left
    stack = []
    FOR i ← 0 TO n - 1:
        WHILE stack is not empty AND nums[stack[-1]] < nums[i]:
            stack.POP()
        left[i] = stack[-1] IF stack ELSE -1
        stack.PUSH(i)

    // Find nearest greater on right
    stack = []
    FOR i ← n - 1 DOWNTO 0:
        WHILE stack is not empty AND nums[stack[-1]] < nums[i]:
            stack.POP()
        right[i] = stack[-1] IF stack ELSE n
        stack.PUSH(i)

    RETURN [right[i] - left[i] - 1 FOR i IN 0..n-1]
```

---

## Walkthrough

```
nums = [1, 5, 4, 3, 6]
```

**Left boundaries (nearest greater on left):**
- i=0: stack=[] → left[0]=-1, push 0
- i=1: pop 0 (1<5), stack=[] → left[1]=-1, push 1
- i=2: 5≥4 → left[2]=1, push 2
- i=3: 4≥3 → left[3]=2, push 3
- i=4: pop all (all < 6) → left[4]=-1, push 4

**Right boundaries (nearest greater on right):**
- i=4: stack=[] → right[4]=5, push 4
- i=3: 6>3 → right[3]=4, push 3
- i=2: pop 3, 6>4 → right[2]=4, push 2
- i=1: pop 2, 6>5 → right[1]=4, push 1
- i=0: 5>1 → right[0]=1, push 0

| i | left | right | range = right-left-1 |
|---|------|-------|---------------------|
| 0 | -1   | 1     | 1                   |
| 1 | -1   | 4     | 4                   |
| 2 | 1    | 4     | 2                   |
| 3 | 2    | 4     | 1                   |
| 4 | -1   | 5     | 5                   |

**Result:** [1, 4, 2, 1, 5] ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Monotonic Stack | **O(n)** | O(n) |

Each element is pushed/popped at most once per stack pass.

---

## Follow-Up Questions

**Q1: What if elements are not distinct?**
Define a tie-breaking rule (e.g., use `≤` vs `<` in comparisons). The boundary definition changes slightly to handle equal elements.

**Q2: How does this relate to "Largest Rectangle in Histogram"?**
Same core technique — find the span where each bar is the minimum/maximum using next greater/smaller element stacks.

**Q3: Can you do it in a single pass?**
Yes — use one monotonic stack pass where, when popping an element, you know both its left and right boundaries simultaneously.

---

## Key Takeaway

> **The "maximal range where an element is the max" reduces to finding left and right nearest greater elements via a monotonic stack.** This O(n) technique is the foundation for histogram, trapping water, and stock span problems.
