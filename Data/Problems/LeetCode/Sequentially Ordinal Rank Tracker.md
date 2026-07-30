# 2102. Sequentially Ordinal Rank Tracker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sequentially-ordinal-rank-tracker](https://leetcode.com/problems/sequentially-ordinal-rank-tracker)
**Companies:** Amazon
---

## Problem Description

Design a data structure that supports two operations:
1. `add(name, score)`: Insert a new entry with the given `name` (string) and `score` (integer).
2. `get()`: Return the name of the i‑th best entry, where i is the number of times `get()` has been called so far (starting at 1). Ranking is by descending `score`; ties are broken by ascending alphabetical order of `name`.

---

## Examples

**Example 1:**
```
tracker = SORTracker()
tracker.add("alice", 5)
tracker.add("bob", 3)
tracker.add("carol", 5)
tracker.get() → "alice"   // alice and carol have same score, alice comes first alphabetically
tracker.get() → "carol"
tracker.get() → "bob"
```

**Example 2:**
```
tracker = SORTracker()
tracker.add("dave", 10)
tracker.get() → "dave"
tracker.add("eve", 9)
tracker.get() → "eve"
```

---

## Approach

Maintain a sorted container of all entries ordered by `(-score, name)`. Keep a cursor `i` that tracks how many `get()` calls have occurred; each `get()` returns the element at index `i` and increments `i`.

```text
CLASS SORTracker:
    FUNCTION __init__():
        SET data ← SortedList ordered by (negative score, name)
        SET i ← 0

    FUNCTION add(name, score):
        APPEND ( -score , name ) TO data

    FUNCTION get():
        SET entry ← data[i]
        SET i ← i + 1
        RETURN entry[1]   // name component
```

---

## Walkthrough

Consider the sequence of operations:
| Operation | data after operation | i | Returned |
|-----------|----------------------|---|----------|
| add("alice",5) | [(-5, "alice")] | 0 | — |
| add("bob",3)   | [(-5,"alice"), (-3,"bob")] | 0 | — |
| add("carol",5) | [(-5,"alice"), (-5,"carol"), (-3,"bob")] | 0 | — |
| get()           | same | 1 | "alice" |
| get()           | same | 2 | "carol" |
| get()           | same | 3 | "bob" |
The sorted order guarantees correct ranking, and the cursor ensures each call returns the next best entry.

---

## Complexity Analysis

- **Time:** `add` – O(log n) for insertion into the sorted list; `get` – O(1) to access by index.
- **Space:** O(n) to store all inserted entries.

---

## Follow-Up Questions

1. How would you implement the structure without a built‑in sorted list, using two heaps?
2. Can you support deletions of entries while preserving the ranking?
3. How would you modify the design to handle real‑time score updates for existing names?

---

## Key Takeaway

A sorted container combined with a simple cursor provides an elegant O(log n) insertion and O(1) retrieval solution for rank‑tracking problems.
