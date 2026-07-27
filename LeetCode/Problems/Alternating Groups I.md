# 3206. Alternating Groups I

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Samsara
---

## Problem Description
Given an array `colors` representing colors arranged in a circle, a position `i` is considered *alternating* if its color differs from both its immediate left and right neighbors (with wrap‑around at the ends). Return the number of alternating positions in the array.

## Examples
**Example 1**
```
Input: colors = [1,2,1,2]
Output: 4
Explanation: Every position has a different color from its two neighbors.
```

**Example 2**
```
Input: colors = [3,3,3]
Output: 0
Explanation: No position differs from both neighbors.
```

## Approach
The problem can be solved by a single pass over the array, checking each element against its two neighbors using modular arithmetic for the circular wrap‑around.

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

## Follow‑Up Questions
1. How would you modify the solution if the array were not circular?
2. Can you compute the result in a streaming fashion where colors arrive one by one?
3. What if you needed to return the indices of alternating positions instead of the count?

## Key Takeaway
A single linear scan with modular indexing is sufficient to count positions that differ from both neighbors in a circular array.
