# 895. Maximum Frequency Stack

**Difficulty:** 🔴 Hard
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-stack](https://leetcode.com/problems/maximum-frequency-stack)
**Companies:** Amazon, Apple, Bloomberg, Expedia, Flipkart, Glovo, Google, Meta, Microsoft, Nutanix, Salesforce, Uber

---

## Problem Description

Design a stack-like data structure that supports `push(val)` and `pop()`. `push(val)` inserts an integer onto the stack. `pop()` removes and returns the most frequent element in the stack; if multiple elements share the highest frequency, the element closest to the top of the stack is removed and returned.

---

## Examples

**Example 1:**
```
Input: push(5), push(7), push(5), push(7), push(4), push(5)
pop() → 5   // 5 is the most frequent
pop() → 7   // 5 and 7 both have frequency 2, but 7 is closest to the top
pop() → 5
```

**Example 2:**
```
Input: push(1), push(2), push(3), pop()
Output: 3   // All have frequency 1, return the most recent
```

---

## Approach

**Algorithm:** Frequency Map + Stack per Frequency (O(1) operations).

Maintain:
- `freq[val]` – current frequency of each value.
- `group[freq]` – a stack of values that have this exact frequency, preserving insertion order.
- `maxFreq` – the highest frequency present.

`push(val)`: increment its frequency, update `maxFreq`, and push onto the corresponding frequency stack.

`pop()`: pop from `group[maxFreq]`, decrement the value's frequency, and if that stack becomes empty, decrement `maxFreq`.

---

## Walkthrough

Consider the sequence `push(5), push(7), push(5), push(7), push(4), push(5)`.

1. After first `push(5)`: `freq[5]=1`, `group[1]=[5]`, `maxFreq=1`.
2. `push(7)`: `freq[7]=1`, `group[1]=[5,7]`.
3. `push(5)`: `freq[5]=2`, `group[2]=[5]`, `maxFreq=2`.
4. `push(7)`: `freq[7]=2`, `group[2]=[5,7]`.
5. `push(4)`: `freq[4]=1`, `group[1]=[5,7,4]`.
6. `push(5)`: `freq[5]=3`, `group[3]=[5]`, `maxFreq=3`.

`pop()`: remove from `group[3]` → returns `5`. Decrement `freq[5]` to 2, `group[3]` empty so `maxFreq=2`.

Next `pop()`: `group[2]` currently `[5,7]`; pop returns `7` (most recent). Update frequencies accordingly.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Frequency Map + Stacks | **O(1)** per operation | O(n) for storing frequencies and stacks |

---

## Follow-Up Questions

1. How would you modify the design to support `peek()` of the most frequent element without removing it?
2. Can the structure be extended to support a `popMin()` operation that removes the least frequent element?
3. What changes are needed if the stack must also support `incrementAll(val)` that adds `val` to every element?

---

## Key Takeaway

> Using a hash map for frequencies together with a stack per frequency level yields constant‑time `push` and `pop` while automatically handling tie‑breaking by recency.
