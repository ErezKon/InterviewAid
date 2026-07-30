# 1675. Minimize Deviation in Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-deviation-in-array](https://leetcode.com/problems/minimize-deviation-in-array)
**Companies:** Samsung

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

Given an array `nums`, you can:
- **Multiply** any odd number by 2
- **Divide** any even number by 2

Minimize the **deviation** (max - min) of the array.

**Constraints:**
- `2 ≤ nums.length ≤ 5 × 10⁴`
- `1 ≤ nums[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [1, 2, 3, 4]
Output: 1
Explanation: Transform to [2, 2, 3, 4] → deviation = 4-2=2. Then [2,2,3,2] → dev=1.
```

---

## Key Insight

> Normalize: double all odd numbers first (each odd number can only be doubled once). Now all numbers are even, and we can only divide. Use a **max-heap** — repeatedly halve the maximum element. Track `min` throughout. The deviation at each step is `maxHeap.top - currentMin`. Stop when the max is odd (can't divide further).

---

## Approach: Max-Heap — O(n · log(max) · log n) ✅

```
FUNCTION minimumDeviation(nums):
    // Step 1: Make all numbers even (double odds)
    heap ← MaxHeap()
    minVal ← INFINITY
    FOR num IN nums DO
        IF num IS ODD THEN num ← num * 2
        heap.PUSH(num)
        minVal ← MIN(minVal, num)
    
    result ← INFINITY
    
    // Step 2: Repeatedly halve the max
    WHILE TRUE DO
        maxVal ← heap.POP()
        result ← MIN(result, maxVal - minVal)
        
        IF maxVal IS ODD THEN BREAK   // can't divide further
        
        maxVal ← maxVal / 2
        minVal ← MIN(minVal, maxVal)
        heap.PUSH(maxVal)
    
    RETURN result
```

---

## Walkthrough

```
nums = [1, 2, 3, 4]
After doubling odds: [2, 2, 6, 4], minVal=2
Heap: [6, 4, 2, 2]

Pop 6: dev=6-2=4. 6/2=3 (odd after next). Push 3. min=MIN(2,3)=2. Heap:[4,3,2,2]
Pop 4: dev=4-2=2. 4/2=2. Push 2. min=2. Heap:[3,2,2,2]
Pop 3: dev=3-2=1. 3 is odd → STOP.

Return 1 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Max-heap + halving | **O(n · log(max) · log n)** | **O(n)** |

Each element can be halved at most log(max) times, each heap operation is O(log n).

---

## Follow-Up Questions

1. **Why double odds first?** Odd numbers can only be doubled once, but even numbers can be halved many times. Normalizing to all-even gives us a consistent "only halve" strategy.
2. **Why stop when max is odd?** An odd max can't be halved, and increasing it (doubling) would only increase deviation.
3. **Can we use a sorted set instead?** Yes — a TreeSet/SortedList gives O(log n) insertion and access to both min and max.

---

## Key Takeaway

> **Normalize then greedily shrink the range** — double all odds to establish the max possible values, then repeatedly halve the maximum to minimize the deviation. A max-heap naturally tracks the current maximum.

---
