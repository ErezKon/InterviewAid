# 155. Min Stack

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/min-stack](https://leetcode.com/problems/min-stack)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Citadel, Flipkart, Google, Ibm, Imc, Informatica, Infosys, Intel, Intuit, Linkedin, Lucid, Lyft, Meta, Microsoft, Nike, Nvidia, Odoo, Oracle, Ozon, Palo Alto Networks, Paytm, Salesforce, Sigmoid, Snapchat, Snowflake, Tcs, Tinkoff, Tripadvisor, Uber, Uipath, Veeva, Vimeo, Walmart Labs, Yandex, Zenefits

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Two Stacks — O(1) ✅](#3-approach-1-two-stacks--o1-)
4. [Approach 2: Single Stack with Pairs — O(1)](#4-approach-2-single-stack-with-pairs--o1)
5. [Approach 3: Single Stack No Extra Space — O(1)](#5-approach-3-single-stack-no-extra-space--o1)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Design a stack that supports push, pop, top, and retrieving the minimum element in **constant time**.

Implement the `MinStack` class:
- `MinStack()` — initializes the stack object.
- `push(val)` — pushes the element `val` onto the stack.
- `pop()` — removes the element on the top of the stack.
- `top()` — gets the top element of the stack.
- `getMin()` — retrieves the minimum element in the stack.

You must implement a solution with **O(1)** time complexity for each function.

**Constraints:**
- `-2³¹ <= val <= 2³¹ - 1`
- Methods pop, top, and getMin will always be called on **non-empty** stacks.
- At most `3 × 10⁴` calls will be made.

---

## 2. Examples

```
Input:
  ["MinStack","push","push","push","getMin","pop","top","getMin"]
  [[],[-2],[0],[-3],[],[],[],[]]

Output: [null,null,null,null,-3,null,0,-2]

Explanation:
  MinStack minStack = new MinStack();
  minStack.push(-2);    // stack: [-2]
  minStack.push(0);     // stack: [-2, 0]
  minStack.push(-3);    // stack: [-2, 0, -3]
  minStack.getMin();    // return -3
  minStack.pop();       // stack: [-2, 0]
  minStack.top();       // return 0
  minStack.getMin();    // return -2
```

---

## 3. Approach 1: Two Stacks — O(1) ✅

Use a main stack and a parallel **min stack**. The min stack tracks the minimum at each level of the main stack.

```
CLASS MinStack:
    CONSTRUCTOR:
        stack = []
        minStack = []

    FUNCTION push(val):
        stack.PUSH(val)
        IF minStack is empty OR val <= minStack.TOP():
            minStack.PUSH(val)
        ELSE:
            minStack.PUSH(minStack.TOP())

    FUNCTION pop():
        stack.POP()
        minStack.POP()

    FUNCTION top():
        RETURN stack.TOP()

    FUNCTION getMin():
        RETURN minStack.TOP()
```

Each operation is O(1). Space: O(n) for the min stack.

---

## 4. Approach 2: Single Stack with Pairs — O(1)

Store `(value, currentMin)` pairs in a single stack.

```
CLASS MinStack:
    CONSTRUCTOR:
        stack = []          // stores (value, min_so_far)

    FUNCTION push(val):
        IF stack is empty:
            stack.PUSH((val, val))
        ELSE:
            currentMin = MIN(val, stack.TOP().min)
            stack.PUSH((val, currentMin))

    FUNCTION pop():
        stack.POP()

    FUNCTION top():
        RETURN stack.TOP().value

    FUNCTION getMin():
        RETURN stack.TOP().min
```

---

## 5. Approach 3: Single Stack No Extra Space — O(1)

Store the **difference** between the value and the current minimum. When the difference is negative, it means the value is a new minimum.

```
CLASS MinStack:
    CONSTRUCTOR:
        stack = []
        minVal = infinity

    FUNCTION push(val):
        IF stack is empty:
            stack.PUSH(0)
            minVal = val
        ELSE:
            diff = val - minVal
            stack.PUSH(diff)
            IF diff < 0:
                minVal = val

    FUNCTION pop():
        diff = stack.POP()
        IF diff < 0:
            // The popped element was the minimum
            // Restore previous minimum
            minVal = minVal - diff

    FUNCTION top():
        diff = stack.TOP()
        IF diff < 0:
            RETURN minVal
        ELSE:
            RETURN minVal + diff

    FUNCTION getMin():
        RETURN minVal
```

**Caveat:** Requires careful handling of integer overflow.

---

## 6. Complexity Analysis

| Approach | Time (each op) | Space |
|----------|---------------|-------|
| Two Stacks | O(1) | O(n) |
| Stack with Pairs | O(1) | O(n) |
| Difference Encoding | O(1) | O(n) but smaller constant |

---

## 7. Follow-Up Questions

### 7.1 Max Stack (LeetCode #716)?

Same concept but track maximum. Additionally supports `popMax()` — remove and return the maximum. This requires a more complex structure (doubly linked list + TreeMap or two stacks with lazy deletion).

### 7.2 What about getMin in O(1) without extra space for a queue?

Use two stacks to implement a queue (push to one, pop from the other). Each stack is a MinStack. The overall min is `MIN(stack1.getMin(), stack2.getMin())`.

### 7.3 Design a stack that also supports getMedian?

Use a stack augmented with two heaps (max-heap for lower half, min-heap for upper half). Push/pop need to rebalance the heaps. getMedian returns the top of the appropriate heap.

---

## Key Takeaway

> Min Stack teaches the principle of **augmenting a data structure** with extra state to answer queries in O(1). The two-stack approach is simplest and most interview-friendly. The difference encoding approach demonstrates how to reduce space at the cost of implementation complexity.
