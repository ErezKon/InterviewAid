# Stack Design Patterns

Related: #155 Min Stack, #232 Queue using Stacks, #225 Stack using Queues, #895 Max Freq Stack

---

## Problem Description
Design a stack data structure that supports the standard operations `push`, `pop`, and `top`, along with an additional operation `getMin` that returns the minimum element in the stack in **O(1)** time. Extend this design to also support `getMax` for the maximum element, and optionally `getMedian` for the median value.

Implement the `MinMaxStack` class:

- `MinMaxStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `int pop()` removes and returns the element on the top of the stack.
- `int top()` returns the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.
- `int getMax()` retrieves the maximum element in the stack.

Every operation (except the optional `getMedian`) must run in `O(1)` time.

**Constraints:**
- `-2^31 <= val <= 2^31 - 1`
- `pop`, `top`, `getMin` and `getMax` are always called on **non-empty** stacks.
- At most `3 * 10^4` calls in total will be made to `push`, `pop`, `top`, `getMin` and `getMax`.

> *Note: constraints and examples are derived, not from an official LeetCode source.*

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

Explanation: minStack tracks [3,3,2,1]; after popping 1 the minimum
reverts to the previous level's min, 2.
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

Explanation: maxStack tracks [7,7,9]; popping 9 restores the max 7.
```

**Example 3 (Duplicates):**
```text
push(4)
push(4)
push(6)
getMin() → 4
getMax() → 6
pop() → 6
pop() → 4
getMin() → 4
top() → 4

Explanation: Duplicate minimums are stored at every level, so popping one
copy of 4 still leaves 4 as the minimum.
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

## Follow-Up Questions
1. How would you modify the design to support `getMedian` in `O(log n)` time?
2. Can you implement the same functionality using a single stack with encoded values?
3. What changes are needed if the stack must also support a `peekMax` operation that returns the maximum without removal?

## Key Takeaway
Using parallel auxiliary stacks to mirror the primary stack preserves the current minimum and maximum at each depth, enabling constant-time queries.
