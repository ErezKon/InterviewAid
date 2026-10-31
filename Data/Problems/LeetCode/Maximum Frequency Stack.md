# 895. Maximum Frequency Stack

**Difficulty:** 🔴 Hard
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-stack](https://leetcode.com/problems/maximum-frequency-stack)
**Companies:** Amazon, Apple, Bloomberg, Expedia, Flipkart, Glovo, Google, Meta, Microsoft, Nutanix, Salesforce, Uber

---

## Problem Description

Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the `FreqStack` class:

- `FreqStack()` constructs an empty frequency stack.
- `void push(int val)` pushes an integer `val` onto the top of the stack.
- `int pop()` removes and returns the most frequent element in the stack.

- If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.

**Constraints:**
- `0 <= val <= 10^9`
- At most `2 * 10^4` calls will be made to `push` and `pop`.
- It is guaranteed that there will be at least one element in the stack before calling `pop`.

---

## Examples

**Example 1:**
```
Input
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
Output:
[null, null, null, null, null, null, null, 5, 7, 5, 4]
Explanation:
FreqStack freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5]
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
freqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
freqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].
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

> Using a hash map for frequencies together with a stack per frequency level yields constant-time `push` and `pop` while automatically handling tie-breaking by recency.
