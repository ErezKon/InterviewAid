# 1802. Maximum Value at a Given Index in a Bounded Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array](https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array)
**Companies:** Google, Ibm, Microsoft, Tiktok

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

Construct an array `nums` of length `n` where:
- `nums[index]` is maximized
- All elements are **positive integers** (≥ 1)
- The **sum** of all elements ≤ `maxSum`
- The **absolute difference** between adjacent elements is ≤ 1

Return the maximum possible value of `nums[index]`.

**Constraints:**
- `1 ≤ n ≤ 10⁹`
- `0 ≤ index < n`
- `1 ≤ maxSum ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  n = 4, index = 2, maxSum = 6
Output: 2
Explanation: [1, 1, 2, 1] — sum=5 ≤ 6, nums[2]=2.
```

**Example 2:**
```
Input:  n = 6, index = 1, maxSum = 10
Output: 3
Explanation: [2, 3, 2, 1, 1, 1] — sum=10 ≤ 10, nums[1]=3.
```

---

## Key Insight

> If `nums[index] = h`, the optimal array forms a **pyramid** centered at `index`, decreasing by 1 in each direction until it hits 1 (then stays at 1). We can binary search on `h` and compute the minimum sum of this pyramid in O(1) using arithmetic series.

---

## Approach: Binary Search — O(log maxSum) ✅

The helper `sumOfPyramid(h, count)` computes the minimum sum of `count` elements that start at height `h` and decrease by 1 each step (minimum value 1).

```
FUNCTION maxValue(n, index, maxSum):
    FUNCTION sumOfPyramid(h, count):
        // Sum of h, h-1, ..., max(1, h-count+1), then pad with 1s
        IF h ≥ count THEN
            RETURN h * count - count * (count - 1) / 2
        RETURN h * (h + 1) / 2 + (count - h)

    lo ← 1
    hi ← maxSum
    WHILE lo < hi DO
        mid ← (lo + hi + 1) / 2
        left ← sumOfPyramid(mid - 1, index)
        right ← sumOfPyramid(mid - 1, n - index - 1)
        IF left + right + mid ≤ maxSum THEN
            lo ← mid
        ELSE
            hi ← mid - 1
    RETURN lo
```

**Visual:**
```
If h=4 at index=3, n=8:
  index:  0  1  2  3  4  5  6  7
  value:  1  2  3 [4] 3  2  1  1
              ↑  pyramid  ↑
```

---

## Walkthrough

```
n = 6, index = 1, maxSum = 10

Binary search: lo=1, hi=10

mid=6: left=sumOfPyramid(5,1)=5, right=sumOfPyramid(5,4)=5*(6)/2+(4-5)→ 
       Actually: h=5≥4 → 5*4-4*3/2=20-6=14. Total=5+14+6=25 > 10 → hi=5

mid=3: left=sumOfPyramid(2,1)=2, right=sumOfPyramid(2,4)=2*3/2+(4-2)=3+2=5
       Total=2+5+3=10 ≤ 10 → lo=3

mid=4: left=sumOfPyramid(3,1)=3, right=sumOfPyramid(3,4)=3*4/2+(4-3)=6+1=7
       Total=3+7+4=14 > 10 → hi=3

lo=hi=3 → Return 3 ✅
Array: [2, 3, 2, 1, 1, 1], sum=10
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + O(1) sum | **O(log(maxSum))** | **O(1)** |

---

## Follow-Up Questions

1. **Why does the pyramid shape minimize sum?** The adjacency constraint forces a slope of at most 1, so the tightest packing is a triangle that drops to 1 and stays there.
2. **Why binary search on the answer?** The total sum is monotonically increasing with `h`, making it perfect for binary search.
3. **How to handle overflow?** Use 64-bit integers since `maxSum` can be 10⁹ and the sum computation involves multiplications.
4. **What if there were no adjacency constraint?** Then set `nums[index] = maxSum - (n-1)` (all other elements = 1).

---

## Key Takeaway

> **Binary search on the answer + O(1) arithmetic sum** is the pattern for "maximize a value subject to a sum constraint with monotonicity" — compute the cost of a candidate answer in constant time, then binary search for the largest feasible value.

---
