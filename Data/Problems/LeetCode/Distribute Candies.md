# 575. Distribute Candies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-candies](https://leetcode.com/problems/distribute-candies)
**Companies:** Bloomberg, Google, Liveramp

---

## Problem Description

Alice has `n` candies (n is even). She can eat `n/2` of them. Each candy has a type in `candyType[i]`. Return the **maximum number of different types** she can eat.

---

## Key Insight

> She can eat at most `n/2` candies. The max variety = `min(unique types, n/2)`.

---

## Approach: Set + Min ✅

```text
FUNCTION distributeCandies(candyType):
    // Build a set of distinct candy types
    SET distinct ← SET(candyType)
    // Alice can eat at most n/2 candies
    SET limit ← len(candyType) / 2
    RETURN MIN(limit, len(distinct))
```

---

## Examples

| candyType | Expected Output |
|-----------|-----------------|
| `[1,1,2,2,3,3]` | `3` |
| `[1,1,1,1,2,2]` | `2` |
| `[1,2,3,4,5,6]` | `3` |

---

## Walkthrough

**Example 1:** `candyType = [1,1,2,2,3,3]`

| Step | Action | Distinct Types | Limit (n/2) | Result |
|------|--------|----------------|------------|--------|
| 1 | Build set | `{1,2,3}` (size 3) | `6/2 = 3` | `min(3,3) = 3` |

Alice can eat three different types.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Build set |
| **Space** | O(n) | Set storage |

---

## Follow-Up Questions

1. How would you modify the solution if Alice could eat any number of candies up to `k` instead of `n/2`?
2. What if the candy types are given as a stream? Can you solve it with O(1) extra space?
3. How does the solution change if the input size is extremely large and cannot fit in memory?

---

## Key Takeaway

> **Maximum variety with a budget constraint = min(distinct items, budget). One line with a set.**