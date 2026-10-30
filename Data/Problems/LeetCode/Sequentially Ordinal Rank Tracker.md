# 2102. Sequentially Ordinal Rank Tracker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sequentially-ordinal-rank-tracker](https://leetcode.com/problems/sequentially-ordinal-rank-tracker)
**Companies:** Amazon
---

## Problem Description

A scenic location is represented by its `name` and attractiveness `score`, where `name` is a **unique** string among all locations and `score` is an integer. Locations can be ranked from the best to the worst. The **higher** the score, the better the location. If the scores of two locations are equal, then the location with the **lexicographically smaller** name is better.

You are building a system that tracks the ranking of locations with the system initially starting with no locations. It supports:

- **Adding** scenic locations, **one at a time**.
- **Querying** the `i^th` **best** location of **all locations already added**, where `i` is the number of times the system has been queried (including the current query).
  - For example, when the system is queried for the `4^th` time, it returns the `4^th` best location of all locations already added.

Note that the test data are generated so that **at any time**, the number of queries **does not exceed** the number of locations added to the system.

Implement the `SORTracker` class:

- `SORTracker()` Initializes the tracker system.
- `void add(string name, int score)` Adds a scenic location with `name` and `score` to the system.
- `string get()` Queries and returns the `i^th` best location, where `i` is the number of times this method has been invoked (including this invocation).

**Constraints:**

- `name` consists of lowercase English letters, and is unique among all locations.
- `1 <= name.length <= 10`
- `1 <= score <= 10^5`
- At any time, the number of calls to `get` does not exceed the number of calls to `add`.
- At most `4 * 10^4` calls **in total** will be made to `add` and `get`.

---

## Examples

```
Example 1:
  Input:
  ["SORTracker", "add", "add", "get", "add", "get", "add", "get", "add", "get", "add", "get", "get"]
  [[], ["bradford", 2], ["branford", 3], [], ["alps", 2], [], ["orland", 2], [], ["orlando", 3], [], ["alpine", 2], [], []]
  Output:
  [null, null, null, "branford", null, "alps", null, "bradford", null, "bradford", null, "bradford", "orland"]
  Explanation:
  SORTracker tracker = new SORTracker(); // Initialize the tracker system.
  tracker.add("bradford", 2); // Add location with name="bradford" and score=2 to the system.
  tracker.add("branford", 3); // Add location with name="branford" and score=3 to the system.
  tracker.get();              // The sorted locations, from best to worst, are: branford, bradford.
                              // Note that branford precedes bradford due to its higher score (3 > 2).
                              // This is the 1st time get() is called, so return the best location: "branford".
  tracker.add("alps", 2);     // Add location with name="alps" and score=2 to the system.
  tracker.get();              // Sorted locations: branford, alps, bradford.
                              // Note that alps precedes bradford even though they have the same score (2).
                              // This is because "alps" is lexicographically smaller than "bradford".
                              // Return the 2nd best location "alps", as it is the 2nd time get() is called.
  tracker.add("orland", 2);   // Add location with name="orland" and score=2 to the system.
  tracker.get();              // Sorted locations: branford, alps, bradford, orland.
                              // Return "bradford", as it is the 3rd time get() is called.
  tracker.add("orlando", 3);  // Add location with name="orlando" and score=3 to the system.
  tracker.get();              // Sorted locations: branford, orlando, alps, bradford, orland.
                              // Return "bradford".
  tracker.add("alpine", 2);   // Add location with name="alpine" and score=2 to the system.
  tracker.get();              // Sorted locations: branford, orlando, alpine, alps, bradford, orland.
                              // Return "bradford".
  tracker.get();              // Sorted locations: branford, orlando, alpine, alps, bradford, orland.
                              // Return "orland".
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
