# Stack Design Patterns

Related: #155 Min Stack, #232 Queue using Stacks, #225 Stack using Queues, #895 Max Freq Stack

---

## Problem Description
Design a stack data structure that supports the standard operations `push`, `pop`, and `top`, along with an additional operation `getMin` that returns the minimum element in the stack in **O(1)** time. Extend this design to also support `getMax` for the maximum element, and optionally `getMedian` for the median value.

## Examples
**Example 1:**
```text
push(3)
push(5)
getMin() → 3
push(2)
push(1)
getMin() → 1
pop() → 1
getMin() → 2
```

**Example 2 (Max Extension):**
```text
push(7)
push(2)
getMax() → 7
push(9)
getMax() → 9
pop() → 9
getMax() → 7
```

## Approach
**Auxiliary Stacks** – Maintain a primary stack for values and secondary stacks that track the current minimum (and maximum) at each depth. When pushing, also push the new min/max based on comparison with the previous top of the auxiliary stacks.

```text
CLASS MinMaxStack:
    valueStack ← EMPTY STACK          // stores actual values
    minStack   ← EMPTY STACK          // stores current minimum at each level
    maxStack   ← EMPTY STACK          // stores current maximum at each level

    FUNCTION push(val):
        PUSH val INTO valueStack
        IF minStack IS EMPTY OR val ≤ TOP(minStack):
            PUSH val INTO minStack
        ELSE:
            PUSH TOP(minStack) INTO minStack   // repeat previous min
        IF maxStack IS EMPTY OR val ≥ TOP(maxStack):
            PUSH val INTO maxStack
        ELSE:
            PUSH TOP(maxStack) INTO maxStack   // repeat previous max

    FUNCTION pop():
        POP FROM valueStack
        POP FROM minStack
        POP FROM maxStack

    FUNCTION top():
        RETURN TOP(valueStack)

    FUNCTION getMin():
        RETURN TOP(minStack)

    FUNCTION getMax():
        RETURN TOP(maxStack)
```

## Walkthrough
Push sequence `3, 5, 2, 1`:
| Operation | valueStack | minStack | maxStack |
|-----------|------------|----------|----------|
| push 3   | 3          | 3        | 3 |
| push 5   | 3,5        | 3,3      | 3,5 |
| push 2   | 3,5,2      | 3,3,2    | 3,5,5 |
| push 1   | 3,5,2,1    | 3,3,2,1  | 3,5,5,5 |
`getMin()` reads top of `minStack` → 1. After `pop()`, stacks shrink and new top of `minStack` becomes 2.

## Complexity Analysis
- **Time:** `O(1)` for each operation (`push`, `pop`, `top`, `getMin`, `getMax`).
- **Space:** `O(n)` for storing auxiliary stacks alongside the main stack.

## Follow‑Up Questions
1. How would you modify the design to support `getMedian` in `O(log n)` time?
2. Can you implement the same functionality using a single stack with encoded values?
3. What changes are needed if the stack must also support a `peekMax` operation that returns the maximum without removal?

## Key Takeaway
Using parallel auxiliary stacks to mirror the primary stack preserves the current minimum and maximum at each depth, enabling constant‑time queries.
