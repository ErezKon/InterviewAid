# 1381. Design a Stack With Increment Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-stack-with-increment-operation](https://leetcode.com/problems/design-a-stack-with-increment-operation)
**Companies:** Amazon, Cloudflare, Ebay, Google, Microsoft, Moloco

---

## Problem Description

Design a stack that supports increment operations on its elements.

Implement the `CustomStack` class:

- `CustomStack(int maxSize)` Initializes the object with `maxSize` which is the maximum number of elements in the stack.
- `void push(int x)` Adds `x` to the top of the stack if the stack has not reached the `maxSize`.
- `int pop()` Pops and returns the top of the stack or `-1` if the stack is empty.
- `void inc(int k, int val)` Increments the bottom `k` elements of the stack by `val`. If there are less than `k` elements in the stack, increment all the elements in the stack.

**Constraints:**
- `1 <= maxSize, x, k <= 1000`
- `0 <= val <= 100`
- At most `1000` calls will be made to each method of `increment`, `push` and `pop` each separately.

---

## Approach

```
CLASS CustomStack:
    CONSTRUCTOR(maxSize):
        stack = []
        inc = []    // lazy increment array
        self.maxSize = maxSize

    FUNCTION push(x):
        IF len(stack) < maxSize:
            stack.PUSH(x)
            inc.PUSH(0)

    FUNCTION pop():
        IF NOT stack: RETURN -1
        idx = len(stack) - 1
        val = stack.POP() + inc.POP()
        IF inc: inc[-1] += inc[idx] IF idx > 0 ELSE 0    // propagate
        RETURN val

    FUNCTION increment(k, val):
        idx = MIN(k, len(stack)) - 1
        IF idx >= 0: inc[idx] += val
```

---

## Examples

```
Example 1:
  Input:
  ["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
  [[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
  Output:
  [null,null,null,2,null,null,null,null,null,103,202,201,-1]
  Explanation:
  CustomStack stk = new CustomStack(3); // Stack is Empty []
  stk.push(1);                          // stack becomes [1]
  stk.push(2);                          // stack becomes [1, 2]
  stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
  stk.push(2);                          // stack becomes [1, 2]
  stk.push(3);                          // stack becomes [1, 2, 3]
  stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
  stk.increment(5, 100);                // stack becomes [101, 102, 103]
  stk.increment(2, 100);                // stack becomes [201, 202, 103]
  stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
  stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
  stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
  stk.pop();                            // return -1 --> Stack is empty return -1.
```

---

## Walkthrough

| Step | Operation | Stack | Inc |
|------|-----------|-------|-----|
| 1 | `push(1)` | [1] | [0]
| 2 | `push(2)` | [1,2] | [0,0]
| 3 | `pop()` | [1] | [0] (returns 2)
| 4 | `increment(2,1)` | [1] | [1]
| 5 | `pop()` | [] | [] (returns 1+1=2)

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) per push/pop/increment |
| **Space** | O(n) |

---

## Follow-Up Questions

- How would you modify the design to support `increment` on a range of indices instead of the bottom `k`?
- Can you achieve O(1) amortized time without the auxiliary `inc` array?
- How would you handle overflow of integer values?

---

## Key Takeaway

> **Lazy increment trick: store the increment only at index `k-1`. On pop, propagate the lazy value down to `inc[idx-1]`. All three operations become O(1).**