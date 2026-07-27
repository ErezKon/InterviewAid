
# 739. Daily Temperatures

**Difficulty:** 🟡 Medium
**Acceptance:** 68.7%
**LeetCode:** [https://leetcode.com/problems/daily-temperatures](https://leetcode.com/problems/daily-temperatures)
**Companies:** Accenture, Agoda, Airwallex, Amazon, Anduril, Bloomberg, Browserstack, Goldman Sachs, Google, Grab, Hashedin, Infosys, Intuit, Josh Technology, Meta, Microsoft, Morgan Stanley, Nvidia, Okta, Oracle, Sap, Servicenow, Swiggy, Tcs, Tekion, Tiktok, Verizon, Visa, Walmart Labs, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight: Monotonic Stack](#3-key-insight-monotonic-stack)
4. [Solution — O(n) ✅](#4-solution--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an array of integers `temperatures`, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day with a warmer temperature, set `answer[i] = 0`.

---

## 2. Examples

```
Example 1:
  Input:  [73, 74, 75, 71, 69, 72, 76, 73]
  Output: [1,  1,  4,  2,  1,  1,  0,  0]

Example 2:
  Input:  [30, 40, 50, 60]
  Output: [1, 1, 1, 0]

Example 3:
  Input:  [30, 60, 90]
  Output: [1, 1, 0]
```

---

## 3. Key Insight: Monotonic Stack

Maintain a **decreasing** stack of indices. When a warmer temperature is found, pop all cooler days from the stack and record the waiting time.

```
Stack stores indices of days waiting for a warmer day.
When temps[i] > temps[stack.top()]:
  → the day at stack.top() found its answer: i - stack.top()
```

---

## 4. Solution — O(n) ✅

```
FUNCTION dailyTemperatures(temperatures):
    n = LENGTH(temperatures)
    answer = ARRAY of n zeros
    stack  = []                      // stores indices (decreasing temp order)

    FOR i ← 0 TO n - 1:

        WHILE stack IS NOT EMPTY AND temperatures[i] > temperatures[stack.PEEK()]:
            prevDay = stack.POP()
            answer[prevDay] = i - prevDay

        stack.PUSH(i)

    RETURN answer
```

Days remaining in the stack at the end have no warmer future day — their answer stays 0.

---

## 5. Walkthrough

```
temps = [73, 74, 75, 71, 69, 72, 76, 73]

i=0: temp=73, stack=[]         → push 0    stack=[0]
i=1: temp=74 > 73              → pop 0, answer[0]=1-0=1
     stack=[], push 1           stack=[1]
i=2: temp=75 > 74              → pop 1, answer[1]=2-1=1
     stack=[], push 2           stack=[2]
i=3: temp=71 < 75              → push 3    stack=[2,3]
i=4: temp=69 < 71              → push 4    stack=[2,3,4]
i=5: temp=72 > 69              → pop 4, answer[4]=5-4=1
     temp=72 > 71              → pop 3, answer[3]=5-3=2
     temp=72 < 75              → push 5    stack=[2,5]
i=6: temp=76 > 72              → pop 5, answer[5]=6-5=1
     temp=76 > 75              → pop 2, answer[2]=6-2=4
     stack=[], push 6           stack=[6]
i=7: temp=73 < 76              → push 7    stack=[6,7]

Remaining stack [6,7] → answer[6]=0, answer[7]=0

answer = [1, 1, 4, 2, 1, 1, 0, 0] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each index is pushed and popped at most once |
| **Space** | O(n) — stack size |

---

## 7. Follow-Up Questions

### 7.1 Next Greater Element I (LeetCode #496)

Given two arrays, for each element in `nums1`, find the next greater element in `nums2`.

```
FUNCTION nextGreaterElement(nums1, nums2):
    map = {}
    stack = []

    FOR each num IN nums2:
        WHILE stack AND num > stack.PEEK():
            map[stack.POP()] = num
        stack.PUSH(num)

    RETURN [map.GET(num, -1) for num in nums1]
```

### 7.2 Next Greater Element II — Circular (LeetCode #503)

Iterate through the array twice (simulating circular) using `i % n`:

```
FUNCTION nextGreaterElements(nums):
    n = LENGTH(nums)
    result = ARRAY of n, all -1
    stack = []

    FOR i ← 0 TO 2*n - 1:
        WHILE stack AND nums[i % n] > nums[stack.PEEK()]:
            result[stack.POP()] = nums[i % n]
        IF i < n:
            stack.PUSH(i)

    RETURN result
```

### 7.3 Stock Span Problem (LeetCode #901)

Find how many consecutive previous days had price ≤ today. Use a decreasing stack storing `(price, span)`.

### 7.4 Largest Rectangle in Histogram (LeetCode #84)

Use a monotonic increasing stack to find the nearest shorter bars on both sides:

```
FUNCTION largestRectangleArea(heights):
    stack = []
    maxArea = 0

    FOR i ← 0 TO LENGTH(heights):
        h = heights[i] IF i < LENGTH(heights) ELSE 0

        WHILE stack AND h < heights[stack.PEEK()]:
            height = heights[stack.POP()]
            width = i IF stack IS EMPTY ELSE i - stack.PEEK() - 1
            maxArea = MAX(maxArea, height * width)

        stack.PUSH(i)

    RETURN maxArea
```

---

## Monotonic Stack Problem Family

| Problem | Stack Type | What We Find |
|---------|-----------|--------------|
| **Daily Temperatures** (#739) | Decreasing | Next warmer day |
| **Next Greater Element** (#496) | Decreasing | Next greater element |
| **Stock Span** (#901) | Decreasing | Consecutive ≤ days |
| **Largest Rectangle** (#84) | Increasing | Nearest shorter bars |
| **Trapping Rain Water** (#42) | Decreasing | Water between bars |

---

## Key Takeaway

> The **monotonic stack** pattern solves "next greater/smaller element" problems in O(n). The stack maintains a monotonic order (increasing or decreasing). When a new element violates the order, we pop and process — the popped element has found its "answer." Each element is pushed and popped at most once, giving O(n) total.
