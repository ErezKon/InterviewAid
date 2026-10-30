# 335. Self Crossing

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/self-crossing](https://leetcode.com/problems/self-crossing)

**Companies:** Bloomberg, Zomato
---

## Problem Description

You are given an array of integers `distance`.

You start at the point `(0, 0)` on an **X-Y plane,** and you move `distance[0]` meters to the north, then `distance[1]` meters to the west, `distance[2]` meters to the south, `distance[3]` meters to the east, and so on. In other words, after each move, your direction changes counter-clockwise.

Return `true` *if your path crosses itself or *`false`* if it does not*.

**Constraints:**
- `1 <= distance.length <= 10^5`
- `1 <= distance[i] <= 10^5`

---

## Approach

Three crossing cases to check at each step `i`:
1. **Crosses line 3 back:** `x[i] >= x[i-2]` and `x[i-1] <= x[i-3]`
2. **Crosses line 4 back:** `x[i-1] == x[i-3]` and `x[i] + x[i-4] >= x[i-2]`
3. **Crosses line 5 back:** `x[i-1] <= x[i-3]` and `x[i-1] + x[i-5] >= x[i-3]` and `x[i-2] > x[i-4]` and `x[i] + x[i-4] >= x[i-2]`

```text
FUNCTION isSelfCrossing(distance):
    FOR i ← 3 TO n-1:
        IF case1 OR case2 OR case3: RETURN true
    RETURN false
```

---

## Examples

**Example 1:**
```
Input: distance = [2,1,1,2]
Output: true
Explanation: The path crosses itself at the point (0, 1).
```

**Example 2:**
```
Input: distance = [1,2,3,4]
Output: false
Explanation: The path does not cross itself at any point.
```

**Example 3:**
```
Input: distance = [1,1,1,2,1]
Output: true
Explanation: The path crosses itself at the point (0, 0).
```

---

## Walkthrough

| Step | Direction | Distance | Position (x,y) | Check Crossing |
|------|-----------|----------|----------------|----------------|
| 1 | North | 2 | (0,2) | — |
| 2 | West  | 1 | (-1,2) | — |
| 3 | South | 1 | (-1,1) | Compare with step 1 → no crossing |
| 4 | East  | 2 | (1,1) | `x[3]=2 >= x[1]=2` and `x[2]=1 <= x[0]=0` → crossing detected |

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Geometric crossing detection reduces to checking 3 algebraic conditions. Each step can only cross one of the 3 most recent parallel segments.
