# 3206. Alternating Groups I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/alternating-groups-i](https://leetcode.com/problems/alternating-groups-i)

**Companies:** Amazon, Google, Samsara
---

## Problem Description
There is a circle of red and blue tiles. You are given an array of integers `colors`. The color of tile `i` is represented by `colors[i]`:

- `colors[i] == 0` means that tile `i` is **red**.
- `colors[i] == 1` means that tile `i` is **blue**.

Every 3 contiguous tiles in the circle with **alternating** colors (the middle tile has a different color from its **left** and **right** tiles) is called an **alternating** group.

Return the number of **alternating** groups.

**Note** that since `colors` represents a **circle**, the **first** and the **last** tiles are considered to be next to each other.

**Constraints:**
- `3 <= colors.length <= 100`
- `0 <= colors[i] <= 1`

## Examples
```
Example 1:
  Input: colors = [1,1,1]
  Output: 0
  Explanation: All tiles have the same color, so no tile differs from both of its neighbors.
```
```
Example 2:
  Input: colors = [0,1,0,0,1]
  Output: 3
  Explanation: The alternating groups (as index triples, circular) are:
  (4,0,1) -> [1,0,1], (0,1,2) -> [0,1,0], (3,4,0) -> [0,1,0].
```

## Approach
The problem can be solved by a single pass over the array, checking each element against its two neighbors using modular arithmetic for the circular wrap-around.

```text
FUNCTION numberOfAlternatingGroups(colors):
    n ← LENGTH(colors)
    count ← 0
    FOR i ← 0 TO n-1:
        left ← colors[(i-1) MOD n]
        right ← colors[(i+1) MOD n]
        IF colors[i] != left AND colors[i] != right:
            count ← count + 1
    RETURN count
```

## Walkthrough
| Index | Color | Left Neighbor | Right Neighbor | Alternating? |
|-------|-------|---------------|----------------|--------------|
| 0     | 1     | colors[3]=2   | colors[1]=2    | Yes |
| 1     | 2     | 1             | 1              | Yes |
| 2     | 1     | 2             | 2              | Yes |
| 3     | 2     | 1             | 1              | Yes |
The count accumulates to 4.

## Complexity Analysis
*Time*: O(n) – one pass over the array.
*Space*: O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you modify the solution if the array were not circular?
2. Can you compute the result in a streaming fashion where colors arrive one by one?
3. What if you needed to return the indices of alternating positions instead of the count?

## Key Takeaway
A single linear scan with modular indexing is sufficient to count positions that differ from both neighbors in a circular array.
