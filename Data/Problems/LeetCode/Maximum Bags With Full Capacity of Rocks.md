# 2279. Maximum Bags With Full Capacity of Rocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks](https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given arrays `capacity` and `rocks` (current rocks in each bag) and an integer `additionalRocks` to distribute, maximize the number of bags that reach full capacity after adding rocks.

---

## Examples

**Example 1:**
```
capacity = [4,3,5]
rocks = [2,2,4]
additionalRocks = 2
```
**Output:** `2`
**Explanation:** Remaining capacities are `[2,1,1]`. Sort → `[1,1,2]`. Use 1 rock for the second bag (remaining 1), 1 rock for the third bag (remaining 0). Two bags become full.

**Example 2:**
```
capacity = [2,2,3,4]
rocks = [1,2,2,2]
additionalRocks = 3
```
**Output:** `3`
**Explanation:** Remaining capacities `[1,0,1,2]` → sorted `[0,1,1,2]`. Fill the first three bags using 0+1+1 rocks. Three bags are full.

---

## Approach

> **Greedy Sort** – Fill bags that need the fewest rocks first.

```
FUNCTION maximumBags(capacity, rocks, additionalRocks):
    // Compute how many more rocks each bag needs
    remaining ← []
    FOR i ← 0 TO LENGTH(capacity) - 1:
        SET need ← capacity[i] - rocks[i]
        APPEND need TO remaining
    // Sort so the easiest bags are first
    SORT remaining ASCENDING
    SET count ← 0
    FOR need IN remaining:
        IF additionalRocks >= need:
            additionalRocks ← additionalRocks - need
            count ← count + 1
        ELSE:
            BREAK
    RETURN count
```

---

## Walkthrough

| Step | remaining (sorted) | additionalRocks | Action | count |
|------|--------------------|----------------|--------|-------|
| 1 | `[1,1,2]` | 2 | Fill first bag (need 1) → rocks left 1, count 1 |
| 2 | `[1,2]` | 1 | Fill second bag (need 1) → rocks left 0, count 2 |
| 3 | `[2]` | 0 | Cannot fill third bag (need 2) → stop |

Result: `2` bags are full.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy Sort | **O(n log n)** (sorting) | O(n) (remaining array) |

---

## Follow-Up Questions

- How would the solution change if each bag could only receive rocks up to a maximum limit per operation?
- Can you adapt the algorithm to return the list of bag indices that become full?
- What if `additionalRocks` is extremely large; can you achieve O(n) time without sorting?

---

## Key Takeaway

> **Fill the easiest-to-complete bags first.** Sort by remaining capacity ascending and greedily allocate rocks to maximize the number of full bags.
