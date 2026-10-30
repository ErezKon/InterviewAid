# 1436. Destination City

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/destination-city](https://leetcode.com/problems/destination-city)
**Companies:** Amazon, Meta, Yandex, Yelp

---

## Problem Description

You are given the array `paths`, where `paths[i] = [cityA_i, cityB_i]` means there exists a direct path going from `cityA_i` to `cityB_i`. *Return the destination city, that is, the city without any path outgoing to another city.*

It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.

**Constraints:**
- `1 <= paths.length <= 100`
- `paths[i].length == 2`
- `1 <= cityA_i.length, cityB_i.length <= 10`
- `cityA_i != cityB_i`
- All strings consist of lowercase and uppercase English letters and the space character.

---

## Examples

```
Example 1:
  Input: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
  Output: "Sao Paulo"
  Explanation: Starting at "London" city you will reach "Sao Paulo" city which is the destination city. Your trip consist of: "London" -> "New York" -> "Lima" -> "Sao Paulo".
```

```
Example 2:
  Input: paths = [["B","C"],["D","B"],["C","A"]]
  Output: "A"
  Explanation: All possible trips are:
  "D" -> "B" -> "C" -> "A".
  "B" -> "C" -> "A".
  "C" -> "A".
  "A".
  Clearly the destination city is "A".
```

```
Example 3:
  Input: paths = [["A","Z"]]
  Output: "Z"
```

---

## Approach

```
FUNCTION destCity(paths):
    SET sources ← SET()
    FOR each p IN paths:
        ADD p[0] TO sources
    FOR each p IN paths:
        IF p[1] NOT IN sources:
            RETURN p[1]
```

---

## Walkthrough

**Step‑by‑step for the first example:**

1. Build `sources = {"London", "New York"}`.
2. Iterate paths again:
   - `("London","New York")`: destination "New York" is in `sources` → continue.
   - `("New York","Lima")`: destination "Lima" not in `sources` → return "Lima".

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – one pass to collect sources, another to find the destination |
| **Space** | O(n) – storing the set of source cities |

---

## Follow-Up Questions

1. How would you solve this if the input were a huge stream of paths that cannot fit in memory?
2. Can you modify the algorithm to return the entire itinerary order from start to destination?

---

## Key Takeaway

> **Set of sources, then find any destination not in the set. The destination city has no outgoing edge — it only appears as `p[1]`, never as `p[0]`.**
