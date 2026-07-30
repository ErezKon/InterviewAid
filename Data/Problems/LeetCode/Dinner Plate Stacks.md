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

Implement `DinnerPlates` — an infinite number of stacks, each with a fixed **capacity**.

- `push(val)`: Push `val` onto the **leftmost** stack that is not full. Create a new stack if all are full.
- `pop()`: Pop from the **rightmost non-empty** stack.
- `popAtStack(index)`: Pop from the stack at `index`. If it's empty, return `-1`.

**Constraints:**
- `1 <= capacity <= 2 × 10^4`
- `1 <= val <= 2 × 10^4`
- At most `2 × 10^5` calls total.

---

## Examples

```
DinnerPlates(2)  // capacity = 2
push(1): [[1]]
push(2): [[1,2]]
push(3): [[1,2],[3]]
push(4): [[1,2],[3,4]]
push(5): [[1,2],[3,4],[5]]
popAtStack(0): returns 2  → [[1],[3,4],[5]]
push(20): [[1,20],[3,4],[5]]    // leftmost non-full is index 0
push(21): [[1,20],[3,4],[5,21]]
pop(): returns 21  → [[1,20],[3,4],[5]]
pop(): returns 5   → [[1,20],[3,4]]
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
