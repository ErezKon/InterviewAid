# 1944. Number of Visible People in a Queue

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-visible-people-in-a-queue](https://leetcode.com/problems/number-of-visible-people-in-a-queue)
**Companies:** Amazon, Bloomberg, Citi, Doordash, Expedia, Google, Linkedin, Meesho, Meta, Microsoft, Nvidia, Oracle, Rippling, Salesforce, Servicenow, Tiktok, Waymo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There are `n` people standing in a queue, and they numbered from `0` to `n - 1` in **left to right** order. You are given an array `heights` of **distinct** integers where `heights[i]` represents the height of the `i^th` person.

A person can **see** another person to their right in the queue if everybody in between is **shorter** than both of them. More formally, the `i^th` person can see the `j^th` person if `i < j` and `min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ..., heights[j-1])`.

Return *an array *`answer`* of length *`n`* where *`answer[i]`* is the **number of people** the *`i^th`* person can **see** to their right in the queue*.

**Constraints:**
- `n == heights.length`
- `1 <= n <= 10^5`
- `1 <= heights[i] <= 10^5`
- All the values of `heights` are **unique**.

---

## 2. Examples

**Example 1:**
```
Input: heights = [10,6,8,5,11,9]
Output: [3,1,2,1,1,0]
Explanation: Person 0 can see person 1, 2, and 4.
Person 1 can see person 2.
Person 2 can see person 3 and 4.
Person 3 can see person 4.
Person 4 can see person 5.
Person 5 can see no one since nobody is to the right of them.
```

**Example 2:**
```
Input: heights = [5,1,2,3,10]
Output: [4,1,1,1,0]
```

---

## 3. Approach

**Monotonic Decreasing Stack (right-to-left)**

Traverse the array from the end. Maintain a stack that stores heights in decreasing order. For the current height, pop all smaller heights – those are visible. If the stack is not empty after popping, the top element is the first taller person and is also visible. Record the count, then push the current height onto the stack.

```text
FUNCTION canSeePersonsCount(heights):
    n ← LENGTH(heights)
    result ← ARRAY OF ZEROES WITH SIZE n
    stack ← []
    FOR i ← n - 1 DOWNTO 0:
        count ← 0
        WHILE stack NOT EMPTY AND stack.TOP() < heights[i]:
            stack.POP()
            count ← count + 1
        IF stack NOT EMPTY:
            count ← count + 1
        result[i] ← count
        stack.PUSH(heights[i])
    RETURN result
```

---

## 4. Walkthrough

We walk through **Example 1** (`heights = [10,6,8,5,11,9]`).

| i | height | stack before | popped | count after pop | stack after push |
|---|--------|--------------|--------|----------------|------------------|
|5|9|[]| – |0|[9]|
|4|11|[9]|pop 9 (count=1)|1 (stack empty) → no blocker|[11]|
|3|5|[11]| – |0+1 (blocker 11) =1|[11,5]|
|2|8|[11,5]|pop 5 (count=1)|1+1 (blocker 11)=2|[11,8]|
|1|6|[11,8]| – |0+1 (blocker 8)=1|[11,8,6]|
|0|10|[11,8,6]|pop 6 (c=1), pop 8 (c=2)|2+1 (blocker 11)=3|[11,10]|

Resulting array: `[3,1,2,1,1,0]`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) – each height is pushed and popped at most once |
| **Space** | O(n) – stack stores at most n heights |

---

## 6. Follow-Up Questions

1. How would the solution change if people could also see to their left?
2. Can you adapt the algorithm to return the actual indices of visible people instead of just the count?
3. What if the queue is circular?

---

## 7. Key Takeaway

> **Monotonic stack** efficiently captures visibility: pop all shorter people (they are visible) and, if any taller person remains, it is also visible. Each element is processed once → O(n) time.
