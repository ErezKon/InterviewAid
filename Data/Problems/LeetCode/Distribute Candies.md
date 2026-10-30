# 575. Distribute Candies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-candies](https://leetcode.com/problems/distribute-candies)
**Companies:** Bloomberg, Google, Liveramp

---

## Problem Description

Alice has `n` candies, where the `i`-th candy is of type `candyType[i]`. Alice noticed that she started to gain weight, so she visited a doctor.

The doctor advised Alice to only eat `n / 2` of the candies she has (`n` is always even). Alice likes her candies very much, and she wants to eat the maximum number of different types of candies while still following the doctor's advice.

Given the integer array `candyType` of length `n`, return *the **maximum** number of different types of candies she can eat if she only eats* `n / 2` *of them*.

**Constraints:**
- `n == candyType.length`
- `2 <= n <= 10^4`
- `n` is even.
- `-10^5 <= candyType[i] <= 10^5`

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

```
Example 1:
  Input: candyType = [1,1,2,2,3,3]
  Output: 3
  Explanation: Alice can only eat 6 / 2 = 3 candies. Since there are only 3 types, she can eat one of each type.
```

```
Example 2:
  Input: candyType = [1,1,2,3]
  Output: 2
  Explanation: Alice can only eat 4 / 2 = 2 candies. Whether she eats types [1,2], [1,3], or [2,3], she still can only eat 2 different types.
```

```
Example 3:
  Input: candyType = [6,6,6,6]
  Output: 1
  Explanation: Alice can only eat 4 / 2 = 2 candies. Even though she can eat 2 candies, she only has 1 type.
```

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