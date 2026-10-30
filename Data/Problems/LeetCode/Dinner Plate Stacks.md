# 1172. Dinner Plate Stacks

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/dinner-plate-stacks](https://leetcode.com/problems/dinner-plate-stacks)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: List of Stacks + Min-Heap](#approach-list-of-stacks--min-heap)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have an infinite number of stacks arranged in a row and numbered (left to right) from `0`, each of the stacks has the same maximum capacity.

Implement the `DinnerPlates` class:

- `DinnerPlates(int capacity)` Initializes the object with the maximum capacity of the stacks `capacity`.
- `void push(int val)` Pushes the given integer `val` into the leftmost stack with a size less than `capacity`.
- `int pop()` Returns the value at the top of the rightmost non-empty stack and removes it from that stack, and returns `-1` if all the stacks are empty.
- `int popAtStack(int index)` Returns the value at the top of the stack with the given index `index` and removes it from that stack or returns `-1` if the stack with that given index is empty.

**Constraints:**
- `1 <= capacity <= 2 * 10^4`
- `1 <= val <= 2 * 10^4`
- `0 <= index <= 10^5`
- At most `2 * 10^5` calls will be made to `push`, `pop`, and `popAtStack`.

---

## Examples

**Example 1:**
```
Input
["DinnerPlates", "push", "push", "push", "push", "push", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop"]
[[2], [1], [2], [3], [4], [5], [0], [20], [21], [0], [2], [], [], [], [], []]
Output:
[null, null, null, null, null, null, 2, null, null, 20, 21, 5, 4, 3, 1, -1]
Explanation: DinnerPlates D = DinnerPlates(2);  // Initialize with capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // The stacks are now:  2  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 2.  The stacks are now:     4
                                                       1  3  5
                                                       ﹈ ﹈ ﹈
D.push(20);        // The stacks are now: 20  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.push(21);        // The stacks are now: 20  4 21
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 20.  The stacks are now:     4 21
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.popAtStack(2);   // Returns 21.  The stacks are now:     4
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.pop()            // Returns 5.  The stacks are now:      4
                                                        1  3
                                                        ﹈ ﹈
D.pop()            // Returns 4.  The stacks are now:   1  3
                                                        ﹈ ﹈
D.pop()            // Returns 3.  The stacks are now:   1
                                                        ﹈
D.pop()            // Returns 1.  There are no stacks.
D.pop()            // Returns -1.  There are still no stacks.
```

---

## Key Insight

> The challenge is efficiently finding the **leftmost non-full** stack for push and the **rightmost non-empty** stack for pop. Use a **min-heap** to track available (non-full) stack indices for push, and maintain a pointer to the rightmost non-empty stack for pop.

---

## Approach: List of Stacks + Min-Heap ✅

```
CLASS DinnerPlates:
    INIT(capacity):
        self.cap ← capacity
        self.stacks ← []              // list of stacks
        self.available ← min-heap     // indices of non-full stacks

    FUNCTION push(val):
        // Clean up stale entries (indices beyond current stacks that are empty)
        WHILE available is not empty AND available.TOP >= len(stacks) DO
            // These are valid — they'll create new stacks
            BREAK if available.TOP == len(stacks)
            HEAP_POP(available)    // stale index

        IF available is empty THEN
            HEAP_PUSH(available, len(stacks))

        idx ← available.TOP
        IF idx = len(stacks) THEN
            stacks.APPEND([])

        stacks[idx].PUSH(val)
        IF len(stacks[idx]) = cap THEN
            HEAP_POP(available)    // no longer available

    FUNCTION pop():
        // Pop from rightmost non-empty stack
        WHILE stacks is not empty AND stacks[-1] is empty DO
            stacks.POP()          // remove trailing empty stacks

        IF stacks is empty THEN RETURN -1
        RETURN popAtStack(len(stacks) - 1)

    FUNCTION popAtStack(index):
        IF index < 0 OR index >= len(stacks) OR stacks[index] is empty THEN
            RETURN -1

        val ← stacks[index].POP()
        HEAP_PUSH(available, index)    // now has room
        RETURN val
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **push** | O(log n) | Heap operations |
| **pop** | O(log n) amortized | Cleanup of trailing empties amortized |
| **popAtStack** | O(log n) | Heap push |
| **Space** | O(n) | All elements stored across stacks |

---

## Follow-Up Questions

**Q1: Why not use a simple variable for the leftmost available?**
> After `popAtStack`, gaps can appear anywhere. A single pointer can't track multiple non-full positions efficiently. A min-heap gives the leftmost in O(log n).

**Q2: How do you handle stale heap entries?**
> When popping trailing empty stacks, some heap entries may point to removed stacks. Lazily skip them during push by checking bounds.

**Q3: What about using a sorted set instead of a heap?**
> A `SortedList` or `TreeSet` works too and avoids stale entries, but has the same O(log n) complexity.

---

## Key Takeaway

> **When you need the leftmost available slot efficiently, use a min-heap of available indices. Combine with lazy cleanup of stale entries for a clean O(log n) per operation design.**
