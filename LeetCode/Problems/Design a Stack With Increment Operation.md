# 1381. Design a Stack With Increment Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-stack-with-increment-operation](https://leetcode.com/problems/design-a-stack-with-increment-operation)
**Companies:** Amazon, Cloudflare, Ebay, Google, Microsoft, Moloco

---

## Problem Description

Design a stack with `push`, `pop`, and `increment(k, val)` that adds `val` to the bottom `k` elements. All operations in O(1).

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

**Example 1:**
```
Operations: ["CustomStack","push","push","pop","increment","pop","pop"]
Arguments: [[3],[1],[2],[],[2,1],[],[]]
Output: [null,null,null,2, null,3,-1]
Explanation:
CustomStack cs = new CustomStack(3); // maxSize = 3
cs.push(1); // stack = [1]
cs.push(2); // stack = [1,2]
cs.pop(); // returns 2, stack = [1]
cs.increment(2,1); // stack becomes [2]
cs.pop(); // returns 2
cs.pop(); // returns -1, stack empty
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